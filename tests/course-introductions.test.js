import {after, before, test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import concepts, {introSources} from '../src/components/courses/introConcepts.js';
import demos from '../src/components/courses/demoContent.js';
import {demoComplete, normalizeDemoProgress, reviewedTopics} from '../src/components/courses/introProgress.js';

let server;
let catalog;
let Introduction;
let DemoCourse;
before(async () => {
  server = await createServer({server: {middlewareMode: true, hmr: false, ws: false}, appType: 'custom'});
  catalog = (await server.ssrLoadModule('/src/components/courses/catalog.js')).default;
  Introduction = (await server.ssrLoadModule('/src/components/courses/Introduction.jsx')).default;
  DemoCourse = (await server.ssrLoadModule('/src/components/courses/DemoCourse.jsx')).default;
});
after(async () => { await server?.close(); });
const courseData = course => ({...course, demo: {...demos[course.id], concepts: course.syllabusDesc.map(title => concepts[course.id].find(item => item.title === title))}});

test('all 80 outline topics have distinct introductions and valid source references', () => {
  assert.equal(catalog.length, 10);
  assert.deepEqual(Object.keys(concepts).sort(), catalog.map(course => course.id).sort());
  let total = 0;
  for (const course of catalog) {
    assert.deepEqual(concepts[course.id].map(item => item.title), course.syllabusDesc);
    for (const concept of concepts[course.id]) {
      for (const field of ['what', 'why', 'example', 'prompt', 'answer', 'explanation', 'learningTip']) assert.ok(concept[field]?.trim(), `${course.id}: ${concept.title} lacks ${field}`);
      assert.ok(concept.sourceIds.length > 0);
      for (const id of concept.sourceIds) {
        assert.ok(introSources[id]?.label, `Missing source: ${id}`);
        assert.equal(new URL(introSources[id].url).protocol, 'https:');
      }
      total++;
    }
  }
  assert.equal(total, 80);
});

test('every concept renders its explanation, importance, example, reflection, and source links', () => {
  for (const course of catalog) for (const [index, concept] of concepts[course.id].entries()) {
    const html = renderToStaticMarkup(createElement(Introduction, {concept, index, total: 8, reviewed: false, response: '', onResponse() {}, onReview() {}, onPrevious() {}, onNext() {}}));
    for (const heading of ['What is it?', 'Why does it matter?', 'A first example', 'Put it into practice', 'Think it through']) assert.ok(html.includes(heading));
    for (const field of ['explanation', 'learningTip']) {
      const escaped = renderToStaticMarkup(createElement('p', null, concept[field]));
      assert.ok(html.includes(escaped), `${concept.title} does not display ${field}`);
    }
    assert.ok(html.includes('Show explanation'));
    assert.ok(html.includes('Mark reviewed &amp; continue'));
    for (const id of concept.sourceIds) assert.ok(html.includes(introSources[id].url));
  }
});

test('each free demo starts in its introduction and exposes every outline topic in the learning path', () => {
  for (const entry of catalog) {
    const course = courseData(entry);
    const html = renderToStaticMarkup(createElement(DemoCourse, {course, progress: normalizeDemoProgress(course), save() {}, onBack() {}}));
    assert.ok(html.includes('INTRODUCTORY CONCEPT 1 OF 8'));
    assert.ok(html.includes('APPLIED LESSONS'));
    for (const concept of course.demo.concepts) {
      const escaped = concept.title.replaceAll('&', '&amp;');
      assert.ok(html.includes(escaped), `${course.id} missing navigation: ${concept.title}`);
    }
  }
});

test('legacy quiz progress, notes, and lab drafts survive adding concept progress', () => {
  const course = courseData(catalog[0]);
  const legacy = {passed: [0, 1, 2], lesson: 2, notes: {0: 'Keep this note'}, lab: {city: 'Chicago'}};
  const normalized = normalizeDemoProgress(course, legacy);
  for (const field of ['passed', 'lesson', 'notes', 'lab']) assert.deepEqual(normalized[field], legacy[field]);
  assert.deepEqual(normalized.reviewedConcepts, []);
  assert.equal(demoComplete(course, normalized), false);
  const completed = {...normalized, reviewedConcepts: [...course.syllabusDesc]};
  assert.equal(demoComplete(course, completed), true);
  assert.equal(demoComplete(course, {...completed, passed: [0, 1]}), false);
});

test('saved progress rejects out-of-range lessons and unknown concepts without losing valid work', () => {
  const course = courseData(catalog[1]);
  const topic = course.syllabusDesc[0];
  const saved = normalizeDemoProgress(course, {passed: [0, 0, -1, 90, '1'], lesson: 90, concept: 80, reviewedConcepts: [topic, topic, 'unknown'], conceptNotes: {[topic]: 'My explanation'}});
  assert.deepEqual(saved.passed, [0]);
  assert.equal(saved.lesson, 0);
  assert.equal(saved.concept, 0);
  assert.deepEqual(reviewedTopics(course, saved), [topic]);
  assert.equal(saved.conceptNotes[topic], 'My explanation');
  assert.equal(demoComplete(course, saved), false);
  assert.doesNotThrow(() => normalizeDemoProgress(course, null));
});
