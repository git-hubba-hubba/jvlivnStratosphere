import {useId} from 'react';
import {demoComplete, reviewedTopics} from '../courses/introProgress';
export default function Subject({obj,progress,onStart}) {
  const syllabusId=useId();
  const count=progress?.passed?.length||0;
  const reviewed=reviewedTopics(obj,progress).length;
  const complete=demoComplete(obj,progress);
  return <article className="subMatter dc-catalog-card">
    <div className="subMtop"><img src={obj.img} alt="" className="subImg"/><div className="subName">{obj.subName}</div></div>
    <div className="dc-meta"><span>Free demo</span><span>{obj.syllabusDesc.length} concepts + {obj.demo.lessons.length} applied lessons</span><span>{obj.demo.category}</span></div>
    <p className="subdesc">{obj.subDesc}</p><div className="dc-card-project"><small>YOU’LL PRACTICE</small><strong>{obj.demo.project}</strong></div>
    <div className="dc-card-progress"><progress value={count+reviewed} max={obj.demo.lessons.length+obj.syllabusDesc.length} aria-label={`${obj.subName} progress`}/><small>{reviewed}/{obj.syllabusDesc.length} concepts · {count}/{obj.demo.lessons.length} lessons</small></div>
    <div className="btnCafe"><button className="dc-primary" onClick={onStart}>{complete?'Review demo':count||reviewed?'Continue demo':'Start free demo'} →</button><span className="dc-muted">Earn up to 60 XP</span></div>
    <details className="dc-syllabus" id={syllabusId}><summary>Explore the full course outline</summary><ol>{obj.syllabusDesc.map((topic,index)=><li key={topic}><button type="button" onClick={()=>onStart(index)}>{topic} <span aria-hidden="true">↗</span></button></li>)}</ol><p>Every topic above has a free concept introduction, example, reflection, and linked study guide inside the demo.</p></details>
  </article>;
}
