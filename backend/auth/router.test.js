import {test} from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createAuthRouter} from './router.js';
const origin='http://localhost:5173';
async function fixture(t){const directory=await mkdtemp(join(tmpdir(),'jvl-auth-http-'));const app=express();app.use(express.json());app.use('/api/auth',createAuthRouter({filename:join(directory,'accounts.json'),origins:[origin]}));const server=await new Promise(resolve=>{const listener=app.listen(0,'127.0.0.1',()=>resolve(listener));});t.after(async()=>{await new Promise(resolve=>server.close(resolve));await rm(directory,{recursive:true,force:true});});const base=`http://127.0.0.1:${server.address().port}/api/auth`;return {request:(path,{method='GET',body,cookie,requestOrigin=origin}={})=>fetch(base+path,{method,headers:{...(method!=='GET'?{'Content-Type':'application/json',Origin:requestOrigin}:{}),...(cookie?{Cookie:cookie}:{})},...(body?{body:JSON.stringify(body)}:{})})};}
test('HTTP signup, session lookup, profile update and logout',async t=>{const {request}=await fixture(t);assert.equal((await request('/me')).status,401);const signup=await request('/signup',{method:'POST',body:{name:'Casey Learner',email:'casey@example.test',password:'A strong example passphrase!'}});assert.equal(signup.status,201);const cookie=signup.headers.get('set-cookie');assert.match(cookie,/HttpOnly/i);assert.match(cookie,/SameSite=Lax/i);const cookieHeader=cookie.split(';')[0];assert.equal((await request('/me',{cookie:cookieHeader})).status,200);const update=await request('/profile',{method:'PATCH',cookie:cookieHeader,body:{name:'Casey Builder',bio:'Learning daily',avatar:'purple',focus:'Cloud computing'}});assert.equal(update.status,200);assert.equal((await update.json()).user.name,'Casey Builder');assert.equal((await request('/logout',{method:'POST',cookie:cookieHeader,body:{}})).status,200);assert.equal((await request('/me',{cookie:cookieHeader})).status,401);});
test('cross-origin writes and unauthenticated profile changes are rejected',async t=>{const {request}=await fixture(t);assert.equal((await request('/signup',{method:'POST',body:{},requestOrigin:'https://unrelated.example'})).status,403);assert.equal((await request('/profile',{method:'PATCH',body:{name:'Not authorized'}})).status,401);});
test('repeated failed authentication is throttled',async t=>{const {request}=await fixture(t);for(let i=0;i<12;i++)assert.equal((await request('/login',{method:'POST',body:{email:'none@example.test',password:'An unknown account passphrase'}})).status,401);const blocked=await request('/login',{method:'POST',body:{}});assert.equal(blocked.status,429);assert.ok(Number(blocked.headers.get('retry-after'))>0);});

test('community questions persist across members with authenticated authorship and answer ownership',async t=>{
  const {request}=await fixture(t);
  assert.equal((await request('/community')).status,401);
  assert.equal((await request('/community/create',{method:'POST',body:{}})).status,401);
  async function member(email,name){const response=await request('/signup',{method:'POST',body:{email,name,password:'A strong community passphrase!'}});return {cookie:response.headers.get('set-cookie').split(';')[0],user:(await response.json()).user};}
  const alex=await member('alex@example.test','Alex Builder');const sam=await member('sam@example.test','Sam Builder');
  const input={kind:'question',channel:'web-development',title:'Why does my API request fail?',body:'I expect JSON but get a CORS error. How can I debug this?',github:'https://github.com/example/project/issues/42',code:'fetch("/api/example")',tags:'react, api',author:sam.user};
  const created=await request('/community/create',{method:'POST',cookie:alex.cookie,body:input});assert.equal(created.status,201);const {post}=await created.json();assert.equal(post.author.id,alex.user.id);assert.equal(post.author.email,undefined);assert.equal(post.github,input.github);
  const feed=await (await request('/community',{cookie:sam.cookie})).json();assert.equal(feed.posts[0].id,post.id);
  const replyResponse=await request('/community/reply',{method:'POST',cookie:sam.cookie,body:{postId:post.id,body:'Check the origin allowed by your API server.',github:'https://github.com/example/project/pull/43'}});assert.equal(replyResponse.status,201);const reply=(await replyResponse.json()).post.replies[0];
  assert.equal((await request('/community/accept',{method:'POST',cookie:sam.cookie,body:{postId:post.id,replyId:reply.id}})).status,403);
  const accepted=await request('/community/accept',{method:'POST',cookie:alex.cookie,body:{postId:post.id,replyId:reply.id}});assert.equal((await accepted.json()).post.acceptedReplyId,reply.id);
  for(let i=0;i<2;i++){const vote=await request('/community/vote',{method:'POST',cookie:sam.cookie,body:{postId:post.id}});assert.equal((await vote.json()).post.votes.length,i===0?1:0);}
  for(const github of ['javascript:alert(1)','https://github.com.evil.test/a/b','https://github.com@evil.test/a/b'])assert.equal((await request('/community/create',{method:'POST',cookie:alex.cookie,body:{...input,github}})).status,400);
  assert.equal((await request('/community/create',{method:'POST',cookie:alex.cookie,requestOrigin:'https://other.test',body:input})).status,403);
  assert.equal((await request('/community/reply',{method:'POST',cookie:sam.cookie,body:{postId:'missing',body:'Hello'}})).status,404);
});
