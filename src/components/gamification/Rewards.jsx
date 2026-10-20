import {learningStorage} from '../account/learningStorage';
import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {badges, quests, dayKey, stats} from './rules';
import {useRewards, recordLearning, featureBadge, claimReward} from './store';
import './rewards.css';

export function AchievementCollection({onPractice}) {
  const {profile}=useRewards();const {earned,counts}=stats(profile);
  return <div className="gm-badges">{badges.map(b=>{const unlocked=earned.some(e=>e.id===b.id);return <article key={b.id} className={`gm-badge ${unlocked?'earned':'locked'}`}><img src={`/images/jvlBadjiess/${b.image}.png`} alt=""/><div><strong>{b.name}</strong><p>{b.description}</p><small>{unlocked?'Unlocked':`${Math.min(counts[b.field]||0,b.target)} / ${b.target}`}</small></div><button disabled={!unlocked} aria-pressed={profile.featured===b.id} onClick={()=>featureBadge(profile.featured===b.id?null:b.id)}>{profile.featured===b.id?'★ Featured':unlocked?'Feature badge':'Locked'}</button>{!unlocked&&<button onClick={()=>onPractice(b.destination)}>Work toward badge →</button>}</article>})}</div>;
}
export default function Rewards() {
  const {profile,storageError}=useRewards();const status=stats(profile);
  const dialog=useRef(null);const navigate=useNavigate();
  const featured=status.earned.find(b=>b.id===profile.featured);
  useEffect(()=>{try{const existing=JSON.parse(learningStorage.getItem('jvl-learning-v1'));if(existing)recordLearning(existing,true);}catch{/* Fresh learner or unavailable browser storage. */}},[]);
  const practice=tab=>{dialog.current.close();navigate(`/lib?tab=${tab}`);};
  return <><button className="gm-status" onClick={()=>dialog.current.showModal()} aria-haspopup="dialog" aria-label={`Open achievements: ${status.rank.name}, ${status.xp} XP`}>
    {featured&&<img src={`/images/jvlBadjiess/${featured.image}.png`} alt={featured.name}/>}<span>✦ {status.rank.name}</span><span>{status.xp} XP</span><span title="Consecutive active learning days">🔥 {status.streak}</span></button>
    <dialog ref={dialog} className="gm-dialog" onClick={event=>{if(event.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.current.close();}}} aria-labelledby="gm-title"><div className="gm-top"><div><small>YOUR JVLIVN JOURNEY</small><h2 id="gm-title">A little progress. A new possibility.</h2></div><button onClick={()=>dialog.current.close()} aria-label="Close achievements">×</button></div>
      <div className="gm-summary"><strong>{status.rank.name}</strong><span>{status.xp} XP · {status.streak} day streak · {status.earned.length}/{badges.length} badges</span></div><progress value={status.next?status.xp-status.rank.xp:1} max={status.next?status.next.xp-status.rank.xp:1} aria-label="Progress to next learning tier"/><p>{status.next?`${status.next.xp-status.xp} XP to ${status.next.name}`:'Top learning tier reached. Keep your curiosity going.'}</p><p className="gm-help">Earn 25 XP per new lesson, 100 per new challenge, 5 per new term, and 20 per demo lesson check. Each counts once. Learning tiers celebrate your activity.</p>
      <h3>Today’s goals</h3><p className="gm-help">Goals reset at midnight in your device’s time zone. New completions count toward your streak and daily goals.</p><div className="gm-quests">{quests.map(q=>{const count=profile.daily[dayKey()]?.[q.id]||0;const claimed=profile.claims.includes(`${dayKey()}:${q.id}`);return <div key={q.id}><span><strong>{q.name}</strong><small>{Math.min(count,q.target)}/{q.target} · +{q.bonus} bonus XP</small></span>{count>=q.target?<button disabled={claimed} onClick={()=>claimReward(q.id)}>{claimed?'✓ Claimed':'Claim bonus'}</button>:<button onClick={()=>practice(q.destination)}>Start →</button>}</div>})}</div>
      <h3>Your badge collection</h3><p className="gm-help">Choose an earned badge to display beside your tier across the site.</p><AchievementCollection onPractice={practice}/>
      <div className="gm-membership"><h3>Membership preference</h3><p>{profile.plan?`${profile.plan} is your saved plan preference.`:'Compare Sapphire, Rose, and Bullion in Services.'} Paid memberships and learning tiers are separate.</p><button onClick={()=>{dialog.current.close();navigate('/about');}}>Explore memberships →</button><small>Saving a preference does not purchase or activate a subscription.</small></div>{storageError&&<p role="alert">Browser storage is unavailable. Rewards may not persist after reloading.</p>}
    </dialog>
  </>;
}
