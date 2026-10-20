export const ranks = [
  {name: 'Explorer', xp: 0}, {name: 'Builder', xp: 200},
  {name: 'Engineer', xp: 600}, {name: 'Architect', xp: 1400},
  {name: 'Trailblazer', xp: 2400},
];
export const badges = [
  {id:'first-lesson', name:'First Step', image:'111', description:'Complete your first lesson.', field:'lesson', target:1, destination:'courses'},
  {id:'five-lessons', name:'Knowledge Builder', image:'222', description:'Complete 5 different lessons.', field:'lesson', target:5, destination:'courses'},
  {id:'first-code', name:'Code Breaker', image:'333', description:'Pass every test in your first coding challenge.', field:'challenge', target:1, destination:'sandbox'},
  {id:'all-code', name:'Problem Solver', image:'444', description:'Solve all 5 coding challenges.', field:'challenge', target:5, destination:'sandbox'},
  {id:'terms', name:'Tech Translator', image:'555', description:'Review 20 different glossary terms.', field:'term', target:20, destination:'glossary'},
  {id:'path', name:'Interview Ready', image:'777', description:'Complete all 28 lessons.', field:'lesson', target:28, destination:'courses'},
];
export const quests = [
  {id:'lesson', name:'Complete a lesson', target:1, bonus:15, destination:'courses'},
  {id:'term', name:'Review 5 tech terms', target:5, bonus:15, destination:'glossary'},
  {id:'challenge', name:'Solve a coding challenge', target:1, bonus:25, destination:'sandbox'},
];
export const emptyProfile = () => ({awards:{}, days:[], daily:{}, claims:[], featured:null, plan:null});
export function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function stats(profile, now = new Date()) {
  const xp = Object.values(profile.awards).reduce((sum,value) => sum+value,0) + profile.claims.reduce((sum,key) => sum + (quests.find(q => q.id === key.split(':')[1])?.bonus || 0),0);
  const rank = ranks.findLast(r => xp >= r.xp);
  const next = ranks[ranks.indexOf(rank)+1];
  const counts = Object.keys(profile.awards).reduce((all,key) => {const kind=key.split(':')[0]; all[kind]=(all[kind]||0)+1; return all;},{});
  const earned = badges.filter(b => (counts[b.field]||0)>=b.target);
  const date = new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);
  if (!profile.days.includes(dayKey(date))) date.setDate(date.getDate()-1);
  let streak=0;
  while (profile.days.includes(dayKey(date))) {streak++;date.setDate(date.getDate()-1);}
  return {xp, rank, next, counts, earned, streak};
}
export function rewardLearning(profile, progress, now = new Date(), creditDaily = true) {
  const day=dayKey(now);
  const next={...profile, awards:{...profile.awards}, daily:{...profile.daily}, days:[...profile.days]};
  const today={...(next.daily[day] || {})};
  for (const [field,kind,points] of [['completed','lesson',25],['solved','challenge',100],['reviewed','term',5],['demos','demo',20]]) {
    for (const id of new Set(progress[field] || [])) {
      const key=`${kind}:${id}`;
      if (Object.hasOwn(next.awards,key)) continue;
      next.awards[key]=points;if (creditDaily) today[kind]=(today[kind]||0)+1;
    }
  }
  const gain=Object.values(next.awards).reduce((a,b)=>a+b,0)-Object.values(profile.awards).reduce((a,b)=>a+b,0);
  if (gain && creditDaily) {next.daily[day]=today;if (!next.days.includes(day)) next.days.push(day);}
  return {profile:next,gain};
}
export function claimQuest(profile, id, now = new Date()) {
  const quest=quests.find(q=>q.id===id);const day=dayKey(now);const key=`${day}:${id}`;
  if (!quest || profile.claims.includes(key) || (profile.daily[day]?.[id]||0)<quest.target) return profile;
  return {...profile,claims:[...profile.claims,key]};
}
