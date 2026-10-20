import {Buffer} from 'node:buffer';
import {mkdir, readFile, writeFile, rename} from 'node:fs/promises';
import {dirname} from 'node:path';
import {randomBytes, randomUUID, scrypt as deriveKey, timingSafeEqual, createHash} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(deriveKey);
const SESSION_MS=7*24*60*60*1000;
export class AuthError extends Error {constructor(message,status=400){super(message);this.status=status;}}
export function publicUser(user){return {id:user.id,email:user.email,name:user.name,bio:user.bio||'',focus:user.focus||'Exploring',avatar:user.avatar||'blue',createdAt:user.createdAt};}
export function validateProfile(input){
  if(typeof input.name!=='string'||input.name.trim().length<2||input.name.trim().length>60)throw new AuthError('Enter a name between 2 and 60 characters.');
  if(input.bio!==undefined&&(typeof input.bio!=='string'||input.bio.length>400))throw new AuthError('Keep your bio within 400 characters.');
  const focuses=['Exploring','Software development','Automation & AI','Cybersecurity','Cloud computing','Interview preparation'];
  const colors=['blue','green','purple','rose'];
  if(input.focus!==undefined&&!focuses.includes(input.focus))throw new AuthError('Choose a listed learning focus.');
  if(input.avatar!==undefined&&!colors.includes(input.avatar))throw new AuthError('Choose a listed profile color.');
  return {name:input.name.trim(),bio:input.bio||'',focus:input.focus||'Exploring',avatar:input.avatar||'blue'};
}
function credentials(input){
  const email=typeof input.email==='string'?input.email.trim().toLowerCase():'';
  if(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email))throw new AuthError('Enter a valid email address.');
  if(typeof input.password!=='string'||input.password.length<12||input.password.length>128)throw new AuthError('Use a password between 12 and 128 characters.');
  return {email,password:input.password};
}
const tokenHash=token=>createHash('sha256').update(token).digest('hex');
export function createAccountStore(filename){
  let queue=Promise.resolve();
  async function load(){try{const parsed=JSON.parse(await readFile(filename,'utf8'));if(!Array.isArray(parsed.users)||!Array.isArray(parsed.sessions))throw new Error('Invalid account store');return parsed;}catch(error){if(error.code==='ENOENT')return {users:[],sessions:[]};throw error;}}
  async function persist(data){await mkdir(dirname(filename),{recursive:true,mode:0o700});const temporary=`${filename}.${randomUUID()}.tmp`;await writeFile(temporary,JSON.stringify(data),{mode:0o600});await rename(temporary,filename);}
  function transaction(fn){const result=queue.then(async()=>{const data=await load();const value=await fn(data);await persist(data);return value;});queue=result.catch(()=>{});return result;}
  function issue(data,user){const token=randomBytes(32).toString('base64url');const expiresAt=Date.now()+SESSION_MS;data.sessions=data.sessions.filter(s=>s.expiresAt>Date.now());data.sessions.push({tokenHash:tokenHash(token),userId:user.id,expiresAt});return {user:publicUser(user),token,expiresAt};}
  function findUser(data,token){if(typeof token!=='string'||token.length>128)throw new AuthError('Please log in to continue.',401);const session=data.sessions.find(s=>s.tokenHash===tokenHash(token)&&s.expiresAt>Date.now());const user=session&&data.users.find(u=>u.id===session.userId);if(!user)throw new AuthError('Please log in to continue.',401);return user;}
  return {
    async register(input){const {email,password}=credentials(input);const profile=validateProfile(input);const salt=randomBytes(16).toString('hex');const passwordHash=(await scrypt(password,salt,64,{N:32768,maxmem:64*1024*1024})).toString('hex');return transaction(data=>{if(data.users.some(u=>u.email===email))throw new AuthError('An account with this email already exists. Try logging in.',409);const user={...profile,id:randomUUID(),email,salt,passwordHash,createdAt:new Date().toISOString()};data.users.push(user);return issue(data,user);});},
    async login(input){let creds;try{creds=credentials(input);}catch{throw new AuthError('Email or password is incorrect.',401);}await queue;const existing=(await load()).users.find(u=>u.email===creds.email);const salt=existing?.salt||'00000000000000000000000000000000';const hash=await scrypt(creds.password,salt,64,{N:32768,maxmem:64*1024*1024});if(!existing||!timingSafeEqual(hash,Buffer.from(existing.passwordHash,'hex')))throw new AuthError('Email or password is incorrect.',401);return transaction(data=>issue(data,data.users.find(u=>u.id===existing.id)));},
    async me(token){await queue;return publicUser(findUser(await load(),token));},
    async update(token,input){const profile=validateProfile(input);return transaction(data=>{const user=findUser(data,token);Object.assign(user,profile);return publicUser(user);});},
    logout(token){return transaction(data=>{if(typeof token==='string')data.sessions=data.sessions.filter(s=>s.tokenHash!==tokenHash(token));return {ok:true};});},
  };
}
