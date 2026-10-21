import {Router} from 'express';
import {createAccountStore, AuthError} from './store.js';
const COOKIE='jvl_session';
function readToken(req){const part=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith(`${COOKIE}=`));return part?part.slice(COOKIE.length+1):null;}
export function createAuthRouter({filename,origins,secure=false}){
  const router=Router();const store=createAccountStore(filename);const attempts=new Map();
  router.use((req,res,next)=>{res.set('Cache-Control','no-store');if(req.method!=='GET'){
    if(!req.headers.origin||!origins.includes(req.headers.origin))return res.status(403).json({error:'This request must come from the JVLIVN site.'});
    if(!req.is('application/json'))return res.status(415).json({error:'Send application/json.'});
  }next();});
  function limited(req,res,next){const now=Date.now();for(const [ip,record]of attempts)if(record.until<now)attempts.delete(ip);const ip=req.ip;const record=attempts.get(ip)||{count:0,until:now+15*60*1000};record.count++;attempts.set(ip,record);if(record.count>12){res.set('Retry-After',String(Math.ceil((record.until-now)/1000)));return res.status(429).json({error:'Too many attempts. Please try again in 15 minutes.'});}next();}
  function session(res,result){res.cookie(COOKIE,result.token,{httpOnly:true,sameSite:'lax',secure,path:'/api/auth',maxAge:7*24*60*60*1000});}
  function endpoint(fn){return async(req,res)=>{try{await fn(req,res);}catch(error){if(error instanceof AuthError)return res.status(error.status).json({error:error.message});console.error('Account request failed:',error.message);res.status(500).json({error:'The account service could not complete this request. Please try again.'});}};}
  router.post('/signup',limited,endpoint(async(req,res)=>{const result=await store.register(req.body||{});session(res,result);res.status(201).json({user:result.user});}));
  router.post('/login',limited,endpoint(async(req,res)=>{const result=await store.login(req.body||{});session(res,result);res.json({user:result.user});}));
  router.get('/me',endpoint(async(req,res)=>res.json({user:await store.me(readToken(req))})));
  router.patch('/profile',endpoint(async(req,res)=>res.json({user:await store.update(readToken(req),req.body||{})})));
  router.post('/logout',endpoint(async(req,res)=>{await store.logout(readToken(req));res.clearCookie(COOKIE,{httpOnly:true,sameSite:'lax',secure,path:'/api/auth'});res.json({ok:true});}));
  router.get('/community',endpoint(async(req,res)=>res.json(await store.community(readToken(req),'list'))));
  for(const action of ['create','reply','vote','accept'])router.post(`/community/${action}`,endpoint(async(req,res)=>res.status(action==='create'||action==='reply'?201:200).json(await store.community(readToken(req),action,req.body||{}))));
  return router;
}
