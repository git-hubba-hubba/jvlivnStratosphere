import {learningStorage} from '../account/learningStorage';
import { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { recordLearning } from '../gamification/store';
import { AchievementCollection } from '../gamification/Rewards';
import topics from './curriculum';
import challenges from './challenges';
import glossary from '../dataDump/itTerms';
import CodeLab from './CodeLab';
import './learning.css';

const extraTerms = [
  ['Sliding Window', 'An algorithmic pattern that maintains a contiguous range and moves its boundaries to avoid repeating work.', 'algorithms', 'Explain how you would find the longest substring without repeating characters.'],
  ['Two Pointers', 'A technique that moves two indices through a sequence to find pairs, partition data, or compare elements efficiently.', 'algorithms', 'When can two pointers replace a nested loop?'],
  ['Idempotency', 'An operation is idempotent when repeating it has the same intended effect as performing it once.', 'architecture', 'How would you prevent duplicate payments when clients retry a request?'],
  ['Race Condition', 'A bug where the result depends on the timing or ordering of concurrent operations accessing shared state.', 'operating-systems', 'How would you make a shared counter safe under concurrency?'],
  ['CAP Theorem', 'During a network partition, a distributed system cannot guarantee both linearizable consistency and availability for every request.', 'architecture', 'What trade-off must a distributed database make during a network partition?'],
  ['STAR Method', 'A structure for behavioral answers: Situation, Task, Action, and Result. Describe your own contribution and measurable outcome.', 'interview', 'Tell me about a disagreement you resolved on a team.'],
  ['Event Loop', 'The runtime mechanism that schedules asynchronous callbacks when the call stack is clear. In JavaScript, microtasks are processed before the next task.', 'javascript', 'In what order do synchronous code, Promise callbacks, and timers execute?'],
  ['Closure', 'A function together with access to its surrounding lexical scope, even after the surrounding function has returned.', 'javascript', 'How can a closure preserve private state between function calls?'],
  ['Cache Invalidation', 'The process of removing or updating cached data when the underlying data changes, balancing freshness against performance.', 'architecture', 'How would you keep cached product prices fresh?'],
  ['SQL Injection', 'A vulnerability in which untrusted input changes the structure of a database query. Parameterized queries keep values separate from SQL syntax.', 'security', 'Why are parameterized queries safer than string concatenation?'],
];
const promptByCategory = {
  testing: 'How would you test this in a real project? Include an edge case and explain your choice.',
  architecture: 'Where would you use this in a system design? Explain a trade-off and a failure mode.',
  javascript: 'Explain this concept, then demonstrate it with a short JavaScript example.',
  'computer-science': 'Explain how this works, its complexity, and when you would use it.',
};
const terms = [...new Map([...extraTerms.map(([term, definition, category, prompt]) => ({term, definition, category, prompt})), ...glossary].map(item => [item.term.toLowerCase(), item])).values()].map(item => ({...item, prompt: extraTerms.find(term => term[0].toLowerCase() === item.term.toLowerCase())?.[3] || promptByCategory[item.category] || `Explain ${item.term} in your own words. Give a practical example and discuss a limitation.`})).sort((a,b) => a.term.localeCompare(b.term));
const categories = [...new Set(terms.map(item => item.category))].sort();
const totalLessons = topics.reduce((sum, topic) => sum + topic.addtlVideos.length, 0);
const initial = {completed: [], solved: [], reviewed: [], drafts: {}, notes: {}, topic: 0, lesson: 0};
function readProgress() {
  try {
    const stored = JSON.parse(learningStorage.getItem('jvl-learning-v1'));
    if (!stored || typeof stored !== 'object') return initial;
    return {...initial, completed: Array.isArray(stored.completed) ? stored.completed.filter(id => typeof id === 'string') : [], solved: Array.isArray(stored.solved) ? stored.solved.filter(id => challenges.some(c => c.id === id)) : [], reviewed: Array.isArray(stored.reviewed) ? stored.reviewed.filter(term => terms.some(t => t.term === term)) : [], drafts: stored.drafts && typeof stored.drafts === 'object' ? stored.drafts : {}, notes: stored.notes && typeof stored.notes === 'object' ? stored.notes : {}, topic: Number.isInteger(stored.topic) && topics[stored.topic] ? stored.topic : 0, lesson: stored.lesson === 1 ? 1 : 0};
  } catch { return initial; }
}
export default function LearningDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const tab = ['overview', 'courses', 'sandbox', 'glossary', 'progress'].includes(requestedTab) ? requestedTab : 'overview';
  const setTab = value => setSearchParams(previous => { const next = new URLSearchParams(previous); next.set('tab', value); return next; });
  const [progress, setProgress] = useState(readProgress);
  const progressRef = useRef(progress);
  const [storageError, setStorageError] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [letter, setLetter] = useState('all');
  const [onlyReview, setOnlyReview] = useState(false);
  const [page, setPage] = useState(1);
  const save = useCallback((transform) => {
    const next = transform(progressRef.current);
    progressRef.current = next;
    setProgress(next);
    try { learningStorage.setItem('jvl-learning-v1', JSON.stringify(next)); } catch { setStorageError(true); }
    recordLearning(next);
  }, []);
  const onSolve = useCallback(id => save(p => ({...p, solved: [...new Set([...p.solved, id])]})), [save]);
  const topic = topics[progress.topic];
  const lesson = topic.addtlVideos[progress.lesson];
  const lessonKey = `${progress.topic}-${progress.lesson}`;
  const percentage = Math.round(progress.completed.length / totalLessons * 100);
  const filtered = terms.filter(item => (category === 'all' || item.category === category) && (letter === 'all' || item.term.toUpperCase().startsWith(letter)) && (!onlyReview || !progress.reviewed.includes(item.term)) && `${item.term} ${item.definition} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  const visiblePage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 12)));
  const changeFilter = setter => event => { setter(event.target.value); setPage(1); };
  function openLesson(t, l = 0) { save(p => ({...p, topic: t, lesson: l})); setTab('courses'); }
  function continueLearning() {
    for (let t = 0; t < topics.length; t++) for (let l = 0; l < topics[t].addtlVideos.length; l++) if (!progress.completed.includes(`${t}-${l}`)) { openLesson(t,l); return; }
    openLesson(0);
  }
  const toggle = (field, value) => save(p => ({...p, [field]: p[field].includes(value) ? p[field].filter(item => item !== value) : [...p[field], value]}));
  return <main className="lc-dashboard">
    <header className="lc-header"><div><span className="lc-eyebrow">JVLIVN / LEARNING SPACE</span><h1>Your next chapter starts here.</h1><p>Build the knowledge. Practice the code. Walk into your next interview ready.</p></div><button className="lc-primary" onClick={continueLearning}>Continue learning ↗</button></header>
    <nav className="lc-tabs" aria-label="Learning resources">{[['overview','◈','Overview'],['courses','▶','My courses'],['sandbox','⌘','Code sandbox'],['glossary','Aa','Tech glossary'],['progress','↗','My progress']].map(([id, icon, label]) => <button key={id} aria-current={tab === id ? 'page' : undefined} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}><span aria-hidden="true">{icon}</span>{label}</button>)}</nav>
    {storageError && <p role="alert" className="lc-notice">Browser storage is unavailable or full. You can keep learning, but these changes may not persist after reloading.</p>}
    <div className="lc-stats"><div><strong>{percentage}%</strong><span>Learning path complete</span></div><div><strong>{progress.completed.length}<small> / {totalLessons}</small></strong><span>Lessons completed</span></div><div><strong>{progress.solved.length}<small> / {challenges.length}</small></strong><span>Challenges solved</span></div><div><strong>{progress.reviewed.length}<small> / {terms.length}</small></strong><span>Terms reviewed</span></div></div>
    {tab === 'overview' && <><section className="lc-hero"><div><span className="lc-eyebrow">YOUR INTERVIEW PREP PATH</span><h2>From fundamentals<br/>to your next offer.</h2><p>A guided curriculum in algorithms, systems, and the skills that turn knowledge into interview confidence.</p><div className="lc-actions"><button className="lc-primary" onClick={continueLearning}>{progress.completed.length ? 'Resume learning' : 'Start learning'} →</button><button onClick={() => setTab('sandbox')}>Try a coding challenge</button></div><small>{topics.length} modules · {totalLessons} video lessons · Self-paced</small></div><div className="lc-hero-art" aria-hidden="true"><span>{'{ }'}</span><p>LEARN → BUILD → GROW</p><div>const future = await you.build();</div></div></section><div className="lc-section-heading"><div><span className="lc-eyebrow">ONE CONCEPT AT A TIME</span><h2>Explore your curriculum</h2></div><button onClick={() => setTab('courses')}>View all lessons →</button></div><div className="lc-course-grid">{topics.map((item, i) => { const done = item.addtlVideos.filter((_,l) => progress.completed.includes(`${i}-${l}`)).length; return <article className="lc-course" key={item.topicTitle}><div className={`lc-course-art tone-${i%4}`}><span>{['O(n)','[ ]','↳','⌘'][i%4]}</span><small>MODULE {String(i+1).padStart(2,'0')}</small></div><div className="lc-course-body"><span className="lc-eyebrow">{i < 6 ? 'ALGORITHMS & DATA STRUCTURES' : 'ENGINEERING & INTERVIEW SKILLS'}</span><h3>{item.topicTitle}</h3><p>{item.topicDescription.split('. ')[0]}.</p><div className="lc-row"><small>{item.addtlVideos.length} lessons</small><small>{done}/{item.addtlVideos.length} complete</small></div><progress value={done} max={item.addtlVideos.length} aria-label={`${item.topicTitle} completion`} /><button onClick={() => openLesson(i)}>{done === item.addtlVideos.length ? 'Review module' : done ? 'Continue module' : 'Explore module'} →</button></div></article>; })}</div></>}
    {tab === 'courses' && <div className="lc-course-layout"><aside className="lc-panel lc-curriculum"><span className="lc-eyebrow">COURSE CONTENT</span><h2>Interview essentials</h2>{topics.map((item,t) => <details open={t === progress.topic} key={item.topicTitle}><summary>{String(t+1).padStart(2,'0')} · {item.topicTitle}</summary>{item.addtlVideos.map((video,l) => <button key={video.url} className={lessonKey === `${t}-${l}` ? 'active' : ''} onClick={() => openLesson(t,l)}>{progress.completed.includes(`${t}-${l}`) ? '✓' : '▷'} {video.label}</button>)}</details>)}</aside><section className="lc-panel lc-lesson"><span className="lc-eyebrow">MODULE {progress.topic + 1} / LESSON {progress.lesson + 1}</span><h2>{topic.topicTitle}</h2><iframe className="lc-video" key={lesson.url} src={lesson.url} title={lesson.label} allow="encrypted-media; picture-in-picture" allowFullScreen /><div className="lc-row"><h3>{lesson.label}</h3><a href={lesson.url.replace('/embed/','/watch?v=')} target="_blank" rel="noreferrer">Open on YouTube ↗</a></div><div className="lc-actions"><button className="lc-primary" onClick={() => toggle('completed',lessonKey)}>{progress.completed.includes(lessonKey) ? '✓ Completed · Undo' : 'Mark lesson complete'}</button><button disabled={progress.topic === topics.length-1 && progress.lesson === topic.addtlVideos.length-1} onClick={() => progress.lesson + 1 < topic.addtlVideos.length ? openLesson(progress.topic,progress.lesson+1) : openLesson(progress.topic+1)}>Next lesson →</button></div><h3>What you’ll learn</h3><p>{topic.topicDescription}</p><label htmlFor="lesson-notes"><strong>Your study notes</strong></label><textarea id="lesson-notes" className="lc-notes" placeholder="Capture takeaways, complexity trade-offs, or questions to revisit…" value={progress.notes[lessonKey] || ''} onChange={event => save(p => ({...p, notes: {...p.notes, [lessonKey]: event.target.value}}))} /><small className="lc-muted">Notes and completion are saved on this device. Mark lessons complete when you’re ready.</small><div className="lc-actions"><button onClick={() => setTab('sandbox')}>Practice in the sandbox →</button><button onClick={() => setTab('glossary')}>Review technical terms →</button></div></section></div>}
    {tab === 'sandbox' && <CodeLab saved={progress.drafts} update={(id,code) => save(p => ({...p, drafts: {...p.drafts, [id]:code}}))} solved={progress.solved} onSolve={onSolve} />}
    {tab === 'glossary' && <section className="lc-panel"><span className="lc-eyebrow">THE INTERVIEW TOOLKIT</span><h2>Understand the language of tech.</h2><p>{terms.length} terms across algorithms, databases, architecture, security, and more. Each includes a prompt to practice explaining it aloud.</p><div className="lc-filters"><label>Search terms<input type="search" placeholder="Try: recursion, API, database…" value={query} onChange={changeFilter(setQuery)} /></label><label>Topic<select value={category} onChange={changeFilter(setCategory)}><option value="all">All topics</option>{categories.map(c => <option key={c} value={c}>{c.replaceAll('-',' ')}</option>)}</select></label><label className="lc-check"><input type="checkbox" checked={onlyReview} onChange={e => { setOnlyReview(e.target.checked); setPage(1); }} /> To review only</label></div><div className="lc-alphabet" aria-label="Filter by first letter">{['all',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(l => <button className={letter === l ? 'active' : ''} aria-pressed={letter === l} key={l} onClick={() => { setLetter(l); setPage(1); }}>{l === 'all' ? 'All' : l}</button>)}</div><p className="lc-muted">{filtered.length} matching terms</p><div className="lc-term-grid">{filtered.slice((visiblePage-1)*12,visiblePage*12).map(item => <article className="lc-term" key={item.term}><span className="lc-tag">{item.category?.replaceAll('-',' ')}</span><h3>{item.term}</h3><p>{item.definition}</p><div className="lc-prompt"><strong>INTERVIEW PRACTICE</strong><p>{item.prompt}</p></div><button aria-pressed={progress.reviewed.includes(item.term)} onClick={() => toggle('reviewed',item.term)}>{progress.reviewed.includes(item.term) ? '✓ Reviewed · Undo' : 'Mark as reviewed'}</button></article>)}</div>{!filtered.length && <div className="lc-empty"><h3>No terms match these filters.</h3><button onClick={() => { setQuery(''); setCategory('all'); setLetter('all'); setOnlyReview(false); setPage(1); }}>Clear filters</button></div>}<div className="lc-actions lc-pagination"><button disabled={visiblePage === 1} onClick={() => setPage(visiblePage-1)}>← Previous</button><span>Page {visiblePage} of {Math.max(1,Math.ceil(filtered.length/12))}</span><button disabled={visiblePage*12 >= filtered.length} onClick={() => setPage(visiblePage+1)}>Next →</button></div></section>}
    {tab === 'progress' && <section className="lc-panel"><span className="lc-eyebrow">YOUR LEARNING RECORD</span><h2>Small steps. Real progress.</h2><p>Your progress is saved in this browser. Complete lessons, pass coding tests, and review terms to move forward.</p><div className="lc-progress-list">{topics.map((item,i) => { const done = item.addtlVideos.filter((_,l) => progress.completed.includes(`${i}-${l}`)).length; return <div key={item.topicTitle}><div><h3>{item.topicTitle}</h3><span>{done} of {item.addtlVideos.length} lessons complete</span></div><progress value={done} max={item.addtlVideos.length} aria-label={item.topicTitle} /><button onClick={() => openLesson(i)}>{done === item.addtlVideos.length ? 'Review' : 'Study'} →</button></div>; })}</div><h3 className="gm-progress-heading">Your earned achievements</h3><p className="lc-muted">Every milestone counts. Feature an unlocked badge to display it across the site.</p><AchievementCollection onPractice={setTab} /><h3 className="gm-progress-heading">Coding milestones</h3><div className="lc-actions">{challenges.map(c => <span className="lc-tag" key={c.id}>{progress.solved.includes(c.id) ? '✓' : '○'} {c.title}</span>)}</div><button className="lc-primary" onClick={() => setTab('sandbox')}>Keep practicing →</button></section>}
    <footer className="lc-footer">Built for curious minds. One lesson closer to what’s next.</footer>
  </main>;
}
