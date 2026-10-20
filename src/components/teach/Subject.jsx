import {useId} from 'react';
export default function Subject({obj,progress,onStart}) {
  const syllabusId=useId();
  const count=progress?.passed?.length||0;
  return <article className="subMatter dc-catalog-card">
    <div className="subMtop"><img src={obj.img} alt="" className="subImg"/><div className="subName">{obj.subName}</div></div>
    <div className="dc-meta"><span>Free demo</span><span>3 lessons · ~15 min</span><span>{obj.demo.category}</span></div>
    <p className="subdesc">{obj.subDesc}</p><div className="dc-card-project"><small>YOU’LL PRACTICE</small><strong>{obj.demo.project}</strong></div>
    <div className="dc-card-progress"><progress value={count} max="3" aria-label={`${obj.subName} progress`}/><small>{count}/3 lessons complete</small></div>
    <div className="btnCafe"><button className="dc-primary" onClick={onStart}>{count===3?'Review demo':count?'Continue demo':'Start free demo'} →</button><span className="dc-muted">Earn up to 60 XP</span></div>
    <details className="dc-syllabus" id={syllabusId}><summary>Explore the full course outline</summary><ol>{obj.syllabusDesc.map(topic=><li key={topic}>{topic}</li>)}</ol><p>The free demo introduces three core lessons; this outline shows the broader course topics.</p></details>
  </article>;
}
