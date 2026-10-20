import {learningStorage, isAccountStorageKey} from '../account/learningStorage';
import {useSyncExternalStore} from 'react';
import {badges, emptyProfile, rewardLearning, stats, claimQuest} from './rules';
const key='jvl-rewards-v1';
function read() {
  try {
    const saved=JSON.parse(learningStorage.getItem(key));
    if (!saved || typeof saved!=='object') return emptyProfile();
    return {...emptyProfile(), awards:Object.fromEntries(Object.entries(saved.awards||{}).filter(([k,v])=> /^(lesson|challenge|term|demo):/.test(k) && [5,20,25,100].includes(v))),days:Array.isArray(saved.days)?saved.days.filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)):[], daily:saved.daily && typeof saved.daily==='object'?saved.daily:{}, claims:Array.isArray(saved.claims)?[...new Set(saved.claims.filter(c=>/^\d{4}-\d{2}-\d{2}:(lesson|term|challenge)$/.test(c)))]:[], featured:badges.some(b=>b.id===saved.featured)?saved.featured:null, plan:['Sapphire','Rose','Bullion'].includes(saved.plan)?saved.plan:null};
  } catch {return emptyProfile();}
}
let snapshot={profile:read(),notice:null,storageError:false};
const listeners=new Set();
function publish(profile,notice=snapshot.notice) {
  let storageError=false;
  try {learningStorage.setItem(key,JSON.stringify(profile));}catch{storageError=true;}
  snapshot={profile,notice,storageError};listeners.forEach(l=>l());
}
export function recordLearning(progress, silent=false) {
  const before=stats(snapshot.profile);
  const result=rewardLearning(snapshot.profile,progress,new Date(),!silent);
  if (!result.gain) return;
  const after=stats(result.profile);
  const unlocked=after.earned.filter(b=>!before.earned.some(old=>old.id===b.id));
  publish(result.profile,silent?null:{id:crypto.randomUUID(),text:`+${result.gain} XP${unlocked.length?' · Badge unlocked: '+unlocked.map(b=>b.name).join(', '):''}${after.rank.name!==before.rank.name?' · Promoted to '+after.rank.name+'!':''}`});
}
export function featureBadge(id) {
  if (id!==null&&!stats(snapshot.profile).earned.some(b=>b.id===id)) return;
  publish({...snapshot.profile,featured:id});
}
export function savePlan(plan) {if (['Sapphire','Rose','Bullion'].includes(plan)) publish({...snapshot.profile,plan}, {id:crypto.randomUUID(),text:`${plan} plan preference saved. View details in Services.`});}
export function claimReward(id) {
  const next=claimQuest(snapshot.profile,id);
  if (next!==snapshot.profile) publish(next,{id:crypto.randomUUID(),text:'Daily goal claimed! Bonus XP added.'});
}
export function dismissNotice(){snapshot={...snapshot,notice:null};listeners.forEach(l=>l());}
window.addEventListener('jvl-account-change',()=>{snapshot={profile:read(),notice:null,storageError:false};listeners.forEach(l=>l());});
window.addEventListener('storage',event=>{if((isAccountStorageKey(event.key)&&event.key.endsWith(key))||event.key===null){snapshot={profile:read(),notice:null,storageError:false};listeners.forEach(l=>l());}});
const subscribe=listener=>{listeners.add(listener);return()=>listeners.delete(listener);};
export function useRewards(){return useSyncExternalStore(subscribe,()=>snapshot);}
