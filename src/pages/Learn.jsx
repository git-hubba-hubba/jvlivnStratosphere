import {learningStorage} from '../components/account/learningStorage';
import {useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Subject from '../components/teach/Subject';
import catalog from '../components/courses/catalog';
import demoContent, {checkedOn} from '../components/courses/demoContent';
import DemoCourse from '../components/courses/DemoCourse';
import {recordLearning} from '../components/gamification/store';
import '../components/courses/courses.css';

const courses=catalog.map(course=>({...course,demo:demoContent[course.id]}));
const key='jvl-demo-courses-v1';
function readSaved(){
  try{
    const data=JSON.parse(learningStorage.getItem(key))||{};
    return Object.fromEntries(courses.map(course=>{const saved=data[course.id]||{};return [course.id,{passed:Array.isArray(saved.passed)?[...new Set(saved.passed.filter(i=>Number.isInteger(i)&&i>=0&&i<3))]:[],lesson:Number.isInteger(saved.lesson)&&saved.lesson>=0&&saved.lesson<3?saved.lesson:0,notes:saved.notes&&typeof saved.notes==='object'?saved.notes:{},lab:saved.lab&&typeof saved.lab==='object'?saved.lab:{}}];}));
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
  const filtered=courses.filter(course=>(category==='All'||course.demo.category===category)&&`${course.subName} ${course.subDesc} ${course.demo.project}`.toLowerCase().includes(query.toLowerCase()));
  const completed=Object.values(saved).filter(course=>course.passed?.length===3).length;
  return <main className="dc-learn">
    {storageError&&<p className="dc-storage-error" role="alert">Browser storage is unavailable or full. Your changes may not persist after reloading.</p>}
    {selected?<DemoCourse key={selected.id} course={selected} progress={saved[selected.id]||{passed:[],lesson:0}} save={transform=>save(selected.id,transform)} onBack={()=>setParams(previous=>{const next=new URLSearchParams(previous);next.delete('course');return next;})}/>:<>
      <header className="dc-intro"><span className="dc-eyebrow">EXPLORE · PRACTICE · BUILD</span><h1>A little curiosity. A new skill.</h1><p>Try a free course in every topic. Read a short lesson, test your understanding, and bring it to life in an interactive demo.</p><div className="dc-summary"><span>10 free demo courses</span><span>30 short lessons</span><span>{completed}/10 demos completed</span></div><small>Free references checked {checkedOn}. No enrollment needed for these demos.</small></header>
      <div className="dc-catalog-controls"><label>Find your next skill<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses, concepts, or projects…"/></label><div className="dc-category-filters" aria-label="Filter courses by topic">{['All','Development','Security','Cloud','Career'].map(value=><button key={value} aria-pressed={category===value} onClick={()=>setCategory(value)}>{value}</button>)}</div></div><p className="dc-result-count" role="status">{filtered.length} demo courses</p>
      <div className="courseCata">{filtered.map(course=><Subject key={course.id} obj={course} progress={saved[course.id]} onStart={()=>{const resume=(saved[course.id]?.passed||[]);const firstIncomplete=[0,1,2].find(index=>!resume.includes(index));if(firstIncomplete!==undefined)save(course.id,p=>({...p,lesson:firstIncomplete}));setParams({course:course.id});window.scrollTo({top:document.querySelector('.dc-learn').getBoundingClientRect().top+window.scrollY,behavior:'instant'});}}/>)}</div>{!filtered.length&&<div className="dc-empty"><h2>No courses match yet.</h2><button onClick={()=>{setQuery('');setCategory('All');}}>Clear filters</button></div>}
    </>}
  </main>;
}
