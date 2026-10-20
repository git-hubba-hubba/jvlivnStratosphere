import {useEffect,useState} from 'react';
import {AuthContext} from './authContext';
import {accountRequest} from './api';
import {setLearningAccount} from './learningStorage';
function announceSession(){try{localStorage.setItem('jvl-auth-event-v1',crypto.randomUUID());}catch{/* The server session still works when browser storage is unavailable. */}}
export default function AuthProvider({children}){
  const [state,setState]=useState({user:null,loading:true,error:null});const [attempt,setAttempt]=useState(0);
  useEffect(()=>{let active=true;accountRequest('/me').then(data=>{if(!active)return;setLearningAccount(data.user.id);setState({user:data.user,loading:false,error:null});}).catch(error=>{if(!active)return;setLearningAccount(null);setState({user:null,loading:false,error:error.status===401?null:error.message});});return()=>{active=false;};},[attempt]);
  useEffect(()=>{const changed=event=>{if(event.key!=='jvl-auth-event-v1')return;setLearningAccount(null);setState({user:null,loading:true,error:null});setAttempt(value=>value+1);};window.addEventListener('storage',changed);return()=>window.removeEventListener('storage',changed);},[]);
  async function authenticate(mode,body){const data=await accountRequest(mode==='signup'?'/signup':'/login',{method:'POST',body});setLearningAccount(data.user.id);setState({user:data.user,loading:false,error:null});announceSession();return data.user;}
  async function updateProfile(body){try{const data=await accountRequest('/profile',{method:'PATCH',body});setState(previous=>({...previous,user:data.user}));}catch(error){if(error.status===401){setLearningAccount(null);setState({user:null,loading:false,error:null});}throw error;}}
  async function logout(){await accountRequest('/logout',{method:'POST',body:{}});setLearningAccount(null);setState({user:null,loading:false,error:null});announceSession();}
  return <AuthContext value={{...state,authenticate,updateProfile,logout,retry:()=>{setState(previous=>({...previous,loading:true,error:null}));setAttempt(value=>value+1);}}}>{children}</AuthContext>;
}
