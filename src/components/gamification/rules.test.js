import {test} from 'node:test';
import assert from 'node:assert/strict';
import {emptyProfile,rewardLearning,stats,claimQuest,dayKey} from './rules.js';
const today=new Date(2026,9,19,12);
const progress={completed:['0-0'],solved:['sum'],reviewed:['API','Array','Closure','Stack','Queue']};
test('unique accomplishments award XP once, including after undo and re-completion',()=>{
  const first=rewardLearning(emptyProfile(),progress,today);
  assert.equal(first.gain,150);
  assert.equal(stats(first.profile,today).xp,150);
  assert.equal(rewardLearning(first.profile,progress,today).gain,0);
  const undone=rewardLearning(first.profile,{completed:[],solved:[],reviewed:[]},today);
  assert.equal(rewardLearning(undone.profile,progress,today).gain,0);
  assert.equal(stats(first.profile,today).earned.length,2);
});
test('goal bonuses require completion and can only be claimed once per date',()=>{
  const empty=emptyProfile();assert.equal(claimQuest(empty,'lesson',today),empty);
  const earned=rewardLearning(empty,progress,today).profile;
  const claimed=claimQuest(earned,'lesson',today);
  assert.equal(stats(claimed,today).xp,165);
  assert.equal(claimQuest(claimed,'lesson',today),claimed);
  assert.equal(claimQuest(claimed,'invalid',today),claimed);
  const tomorrow=new Date(2026,9,20,12);
  assert.equal(claimQuest(claimed,'lesson',tomorrow),claimed);
});
test('streaks allow yesterday and expire after a missed day',()=>{
  const profile=emptyProfile();profile.days=['2026-10-17','2026-10-18'];
  assert.equal(stats(profile,today).streak,2);
  profile.days.push(dayKey(today));assert.equal(stats(profile,today).streak,3);
  assert.equal(stats(profile,new Date(2026,9,21,12)).streak,0);
});
test('imported history earns badges and XP without inventing daily activity',()=>{
  const migrated=rewardLearning(emptyProfile(),progress,today,false).profile;
  assert.equal(stats(migrated,today).xp,150);
  assert.equal(stats(migrated,today).streak,0);
  assert.deepEqual(migrated.daily,{});
  assert.equal(claimQuest(migrated,'lesson',today),migrated);
});
test('rank thresholds and badge milestones reflect earned activity',()=>{
  const all={completed:Array.from({length:28},(_,i)=>`${Math.floor(i/2)}-${i%2}`),solved:['a','b','c','d','e'],reviewed:Array.from({length:20},(_,i)=>`term-${i}`)};
  const profile=rewardLearning(emptyProfile(),all,today).profile;
  const status=stats(profile,today);
  assert.equal(status.xp,1300);assert.equal(status.rank.name,'Engineer');assert.equal(status.next.name,'Architect');assert.equal(status.earned.length,6);
});
test('demo checks earn XP once without inflating video or coding milestones',()=>{
  const first=rewardLearning(emptyProfile(),{demos:['react:0','react:1','react:2']},today);
  assert.equal(first.gain,60);
  assert.equal(stats(first.profile,today).counts.demo,3);
  assert.equal(stats(first.profile,today).counts.lesson,undefined);
  assert.equal(stats(first.profile,today).earned.length,0);
  assert.equal(rewardLearning(first.profile,{demos:['react:0','react:0']},today).gain,0);
});
