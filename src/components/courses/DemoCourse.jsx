import {useRef, useState} from 'react';
import DemoLab from './DemoLab';
import {checkedOn} from './demoContent';

function KnowledgeCheck({lesson,passed,onPass}) {
  const [choice,setChoice]=useState(null);
  const [feedback,setFeedback]=useState(null);
  return <form className="dc-check" onSubmit={event=>{event.preventDefault();const correct=choice===lesson.answer;setFeedback(correct);if(correct)onPass();}}><span className="dc-eyebrow">CHECK YOUR UNDERSTANDING · +20 XP ONCE</span><fieldset><legend>{lesson.question}</legend>{lesson.options.map((option,index)=><label key={option} className={choice===index?'selected':''}><input type="radio" name="answer" checked={choice===index} onChange={()=>{setChoice(index);setFeedback(null);}}/>{option}</label>)}</fieldset><button className="dc-primary" disabled={choice===null} type="submit">{passed?'Check again':'Check answer'}</button>{feedback!==null&&<p className={feedback?'dc-correct':'dc-incorrect'} role="status">{feedback?'✓ Correct. ':'Not quite. '}{feedback?lesson.explanation:'Review the example and try another answer.'}</p>}{passed&&<small className="dc-muted">✓ Lesson complete. XP is awarded only on the first correct check.</small>}</form>;
}
export default function DemoCourse({course,progress,save,onBack}) {
  const [view,setView]=useState('lesson');
  const heading=useRef(null);
  const index=progress.lesson||0;
  const lesson=course.demo.lessons[index];
  const passed=progress.passed||[];
  const navigateLesson=next=>{save(p=>({...p,lesson:next}));setView('lesson');requestAnimationFrame(()=>heading.current?.focus({preventScroll:true}));};
  return <section className="dc-workspace" aria-label={`${course.subName} demo course`}>
    <button className="dc-back" onClick={onBack}>← All demo courses</button>
    <header className="dc-course-heading"><img src={course.img} alt=""/><div><span className="dc-eyebrow">FREE DEMO · {course.demo.category.toUpperCase()}</span><h2>{course.subName}</h2><p>{course.demo.project}</p></div><span className="dc-completion">{passed.length}/3 lessons complete</span></header>
    <div className="dc-workspace-grid"><aside className="dc-outline"><span className="dc-eyebrow">YOUR LEARNING PATH</span>{course.demo.lessons.map((item,i)=><button key={item.title} aria-current={view==='lesson'&&index===i?'step':undefined} onClick={()=>navigateLesson(i)}><span>{passed.includes(i)?'✓':String(i+1).padStart(2,'0')}</span>{item.title}</button>)}<button aria-current={view==='practice'?'page':undefined} onClick={()=>setView('practice')}>⌘ Try the demo lab</button><button aria-current={view==='sources'?'page':undefined} onClick={()=>setView('sources')}>↗ Free source material</button><progress value={passed.length} max="3" aria-label="Demo course completion"/><small>Progress, notes, and practice drafts save in this browser.</small></aside>
      <div className="dc-content">{view==='lesson'&&<><span className="dc-eyebrow">LESSON {index+1} OF 3 · ABOUT 5 MINUTES</span><h3 ref={heading} tabIndex={-1}>{lesson.title}</h3><p>{lesson.body}</p><pre className="dc-example"><code>{lesson.example}</code></pre><KnowledgeCheck key={index} lesson={lesson} passed={passed.includes(index)} onPass={()=>save(p=>({...p,passed:[...new Set([...(p.passed||[]),index])]}))}/><label className="dc-notes-label">Your notes<textarea placeholder="Explain the concept in your own words, or note a question to revisit…" value={progress.notes?.[index]||''} onChange={event=>save(p=>({...p,notes:{...p.notes,[index]:event.target.value}}))}/></label><div className="dc-lesson-actions"><button disabled={index===0} onClick={()=>navigateLesson(index-1)}>← Previous</button><button className="dc-primary" disabled={!passed.includes(index)} onClick={()=>index<2?navigateLesson(index+1):setView('practice')}>{index<2?'Next lesson →':'Try the demo lab →'}</button></div>{passed.length===3&&<p className="dc-success" role="status">✓ Demo course complete. You’ve earned 60 XP across these three checks. Put the concepts into practice in the demo lab.</p>}<div className="dc-reading"><strong>Go deeper with free reading</strong><a target="_blank" rel="noreferrer" href={course.demo.sources[Math.min(index,course.demo.sources.length-1)].url}>{course.demo.sources[Math.min(index,course.demo.sources.length-1)].label} ↗</a></div></>}
        {view==='practice'&&<DemoLab key={course.id} course={course} draft={progress.lab||{}} onChange={lab=>save(p=>({...p,lab}))}/>}
        {view==='sources'&&<><span className="dc-eyebrow">CONTINUE LEARNING</span><h3>Free sources, checked {checkedOn}</h3><p>These original JVLIVN mini lessons introduce ideas from the references below. Read the full source for additional context and current implementation details.</p><ul className="dc-source-list">{course.demo.sources.map(item=><li key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.label} ↗</a></li>)}</ul><p className="dc-muted">The reading is publicly accessible. External lab hosting, cloud resources, or commercial tools can require accounts or incur charges. All demos on this page run in your browser without paid services.</p></>}
      </div>
    </div>
  </section>;
}
