import {useState} from 'react';
import {introCheckedOn, introSources} from './introConcepts';

export default function Introduction({concept, index, total, reviewed, response, onResponse, onReview, onPrevious, onNext}) {
  const [showAnswer, setShowAnswer] = useState(false);
  function navigate(action) {
    action();
    requestAnimationFrame(() => document.querySelector('.dc-concept-heading, .dc-content > h3')?.focus({preventScroll: true}));
  }
  return <article className="dc-concept">
    <span className="dc-eyebrow">INTRODUCTORY CONCEPT {index + 1} OF {total} · FREE</span>
    <h3 className="dc-concept-heading" tabIndex={-1}>{concept.title}</h3>
    <h4>What is it?</h4><p>{concept.what}</p>
    <p>{concept.explanation}</p>
    <h4>Why does it matter?</h4><p>{concept.why}</p>
    <h4>A first example</h4><pre><code>{concept.example}</code></pre>
    <h4>Put it into practice</h4><p>{concept.learningTip}</p>
    <div className="dc-concept-reflection">
      <h4>Think it through</h4>
      <label>{concept.prompt}<textarea value={response} onChange={event => onResponse(event.target.value)} placeholder="Write your reasoning before comparing it with the explanation…" /></label>
      <button aria-expanded={showAnswer} onClick={() => setShowAnswer(value => !value)}>{showAnswer ? 'Hide explanation' : 'Show explanation'}</button>
      {showAnswer && <p role="status">{concept.answer}</p>}
      <small className="dc-muted">This reflection is for practice; your response is saved, not automatically graded.</small>
    </div>
    <div className="dc-reading"><strong>Free study guide{concept.sourceIds.length > 1 ? 's' : ''}</strong>
      {concept.sourceIds.map(id => <a key={id} href={introSources[id].url} target="_blank" rel="noreferrer">{introSources[id].label} ↗</a>)}
      <small className="dc-muted">Original introductory summary based on the linked reading. Examples and reflections are illustrative teaching exercises. Sources checked {introCheckedOn}.</small>
    </div>
    <div className="dc-lesson-actions">
      <button disabled={index === 0} onClick={() => navigate(onPrevious)}>← Previous concept</button>
      <button className="dc-primary" onClick={() => { onReview(); navigate(onNext); }}>{reviewed ? 'Continue' : 'Mark reviewed & continue'} →</button>
    </div>
    {reviewed && <p className="dc-muted">✓ You marked this concept reviewed.</p>}
  </article>;
}
