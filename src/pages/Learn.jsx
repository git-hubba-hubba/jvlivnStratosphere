import {learningStorage} from '../components/account/learningStorage';
import {useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Subject from '../components/teach/Subject';
import catalog from '../components/courses/catalog';
import demoContent from '../components/courses/demoContent';
import DemoCourse from '../components/courses/DemoCourse';
import introConcepts, {introCheckedOn} from '../components/courses/introConcepts';
import {demoComplete, normalizeDemoProgress} from '../components/courses/introProgress';
import {recordLearning} from '../components/gamification/store';
import '../components/courses/courses.css';

const courses=catalog.map(course=>({...course,demo:{...demoContent[course.id],concepts:course.syllabusDesc.map(title=>introConcepts[course.id].find(concept=>concept.title===title))}}));
const key='jvl-demo-courses-v1';
function readSaved(){
  try{
    const data=JSON.parse(learningStorage.getItem(key))||{};
    return Object.fromEntries(courses.map(course=>[course.id,normalizeDemoProgress(course,data[course.id])]));
  }catch{return {};}
}
export default function Learn(){
  const [params,setParams]=useSearchParams();
  const [query,setQuery]=useState('');const [category,setCategory]=useState('All');
  const [saved,setSaved]=useState(readSaved);const state=useRef(saved);const [storageError,setStorageError]=useState(false);
  const selected=courses.find(course=>course.id===params.get('course'));
  function save(id,transform){
    const next={...state.current,[id]:transform(state.current[id]||{passed:[],lesson:0,notes:{},lab:{}})};
    state.current=next;setSaved(next);
    try{learningStorage.setItem(key,JSON.stringify(next));}catch{setStorageError(true);}
    recordLearning({demos:Object.entries(next).flatMap(([course,value])=>(value.passed||[]).map(lesson=>`${course}:${lesson}`))});
  }
  const filtered=courses.filter(course=>(category==='All'||course.demo.category===category)&&`${course.subName} ${course.subDesc} ${course.demo.project} ${course.syllabusDesc.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  const completed=courses.filter(course=>demoComplete(course,saved[course.id])).length;
  return <main className="dc-learn">
    {storageError&&<p className="dc-storage-error" role="alert">Browser storage is unavailable or full. Your changes may not persist after reloading.</p>}
    {selected?<DemoCourse key={selected.id} course={selected} progress={saved[selected.id]||{passed:[],lesson:0}} save={transform=>save(selected.id,transform)} onBack={()=>setParams(previous=>{const next=new URLSearchParams(previous);next.delete('course');return next;})}/>:<>
      <header className="dc-intro"><span className="dc-eyebrow">EXPLORE · PRACTICE · BUILD</span><h1>A little curiosity. A new skill.</h1><p>Try a free course in every topic. Explore an introduction to every course outline topic, test your understanding in three applied lessons, and try an interactive demo lab.</p><div className="dc-summary"><span>10 free demo courses</span><span>{courses.reduce((total,course)=>total+course.syllabusDesc.length,0)} concept introductions + 30 applied lessons</span><span>{completed}/10 demos completed</span></div><small>Introduction sources checked {introCheckedOn}. No enrollment needed for these demos.</small></header>
      <div className="dc-catalog-controls"><label>Find your next skill<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses, concepts, or projects…"/></label><div className="dc-category-filters" aria-label="Filter courses by topic">{['All','Development','Security','Cloud','Career'].map(value=><button key={value} aria-pressed={category===value} onClick={()=>setCategory(value)}>{value}</button>)}</div></div><p className="dc-result-count" role="status">{filtered.length} demo courses</p>
      <div className="courseCata">{filtered.map(course=><Subject key={course.id} obj={course} progress={saved[course.id]} onStart={conceptIndex=>{const resume=(saved[course.id]?.passed||[]);const firstConcept=Number.isInteger(conceptIndex)?conceptIndex:course.syllabusDesc.findIndex(title=>!saved[course.id]?.reviewedConcepts?.includes(title));if(firstConcept!==-1)save(course.id,p=>({...p,concept:firstConcept}));const firstIncomplete=course.demo.lessons.findIndex((_,index)=>!resume.includes(index));if(firstIncomplete!==-1)save(course.id,p=>({...p,lesson:firstIncomplete}));setParams({course:course.id});window.scrollTo({top:document.querySelector('.dc-learn').getBoundingClientRect().top+window.scrollY,behavior:'instant'});}}/>)}</div>{!filtered.length&&<div className="dc-empty"><h2>No courses match yet.</h2><button onClick={()=>{setQuery('');setCategory('All');}}>Clear filters</button></div>}
    </>}
  </main>;
}
