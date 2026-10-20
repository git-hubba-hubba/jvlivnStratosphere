import {useEffect, useRef, useState} from 'react';
import './entrance.css';

const TOTAL_HITS=6;
const SPLASH_ART='/images/transparentJVL.png';
const edge=[[0,0],[23,0],[49,0],[76,0],[100,0],[100,23],[100,49],[100,76],[100,100],[75,100],[50,100],[24,100],[0,100],[0,75],[0,48],[0,23]];
const shards=edge.map((point,index)=>{
  const next=edge[(index+1)%edge.length];
  const x=(point[0]+next[0])/2-49;const y=(point[1]+next[1])/2-45;
  return {clip:`polygon(49% 45%, ${point[0]}% ${point[1]}%, ${next[0]}% ${next[1]}%)`,x,y,spin:(index%2?1:-1)*(18+index*4)};
});
const cracks=[
  ['M49 45 43 32 48 22 41 9','M43 32 32 27 27 17'],
  ['M49 45 63 38 70 24 85 16','M63 38 79 39 91 32'],
  ['M49 45 37 49 26 42 13 48','M37 49 29 60 12 64'],
  ['M49 45 56 61 49 75 55 89','M56 61 70 67 81 80'],
  ['M49 45 64 48 75 55 89 51','M49 45 42 62 33 71 25 87','M48 22 61 17 68 7'],
];

export default function LionEntrance({children}) {
  const [entered,setEntered]=useState(false);
  const [hits,setHits]=useState(0);
  const logoButton=useRef(null);
  const shattering=hits===TOTAL_HITS;
  useEffect(()=>{
    if(entered){document.querySelector('.ac-auth input, .navMain a')?.focus({preventScroll:true});return;}
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';logoButton.current?.focus({preventScroll:true});
    return()=>{document.body.style.overflow=previous;};
  },[entered]);
  useEffect(()=>{
    if(!shattering)return;
    const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?200:1250;
    const timeout=setTimeout(()=>setEntered(true),duration);
    return()=>clearTimeout(timeout);
  },[shattering]);
  if(entered)return children;
  return <main className={`lion-entrance ${shattering?'is-shattering':''}`} aria-labelledby="entrance-title">
    <div className="entrance-wordmark">J V L I V N</div>
    <div className="entrance-stage">
      <div className="entrance-orbit" aria-hidden="true"/>
      <button ref={logoButton} className="entrance-lion" disabled={shattering} onClick={()=>setHits(value=>Math.min(TOTAL_HITS,value+1))} aria-label={shattering?'Entering JVLIVN':`Break the lion seal. ${TOTAL_HITS-hits} clicks remaining.`} style={{'--hits':hits}}>
        <span key={hits} className="entrance-impact" aria-hidden="true">
          {shards.map((shard,index)=><span key={index} className="entrance-shard" style={{clipPath:shard.clip,'--shard-x':`${shard.x*7}px`,'--shard-y':`${shard.y*7}px`,'--spin':`${shard.spin}deg`,'--drift-x':`${shard.x*hits*.025}px`,'--drift-y':`${shard.y*hits*.025}px`,'--delay':`${index%4*25}ms`}}><img src={SPLASH_ART} alt="" draggable="false"/></span>)}
          <svg className="entrance-cracks" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth=".7" strokeLinejoin="bevel" aria-hidden="true">{cracks.map((paths,index)=><g key={index} className={hits>index?'visible':''}>{paths.map(path=><path key={path} d={path}/>)}</g>)}</svg>
        </span>
      </button>
    </div>
    <div className="entrance-copy"><span className="entrance-eyebrow">BREAK THROUGH. BUILD WHAT’S NEXT.</span><h1 id="entrance-title">{shattering?'Welcome to JVLIVN.':hits===0?'Great things start with a breakthrough.':hits<3?'Every breakthrough starts small.':'One step closer to what’s next.'}</h1><p role="status" aria-live="polite">{shattering?'The seal is broken. Your journey begins.':hits===0?'Tap the lion to break the seal and enter.':`${TOTAL_HITS-hits} more ${TOTAL_HITS-hits===1?'tap':'taps'} to break through.`}</p><div className="entrance-progress" aria-hidden="true">{Array.from({length:TOTAL_HITS},(_,index)=><span key={index} className={index<hits?'complete':''}/>)}</div></div>
    <span className="entrance-footnote">TECHNOLOGY · EDUCATION · POSSIBILITY</span>
  </main>;
}
