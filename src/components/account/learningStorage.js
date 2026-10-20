const learningKeys=['jvl-learning-v1','jvl-demo-courses-v1','jvl-rewards-v1'];
let account=null;
export function setLearningAccount(id){
  account=id||null;
  // Attach pre-account learning to the first signed-in account on this browser.
  if(account){try{
    if(!localStorage.getItem('jvl-learning-owner-v1')){
      for(const key of learningKeys){const existing=localStorage.getItem(key);if(existing&&!localStorage.getItem(`jvl-account:${account}:${key}`))localStorage.setItem(`jvl-account:${account}:${key}`,existing);}
      localStorage.setItem('jvl-learning-owner-v1',account);
      for(const key of learningKeys)localStorage.removeItem(key);
    }
  }catch{/* Storage failures are reported by the learning screens. */}}
  window.dispatchEvent(new Event('jvl-account-change'));
}
export const learningStorage={
  getItem(key){return account?localStorage.getItem(`jvl-account:${account}:${key}`):null;},
  setItem(key,value){if(!account)throw new Error('Sign in to save learning progress.');localStorage.setItem(`jvl-account:${account}:${key}`,value);},
};
export function isAccountStorageKey(key){return account&&key?.startsWith(`jvl-account:${account}:`);}
