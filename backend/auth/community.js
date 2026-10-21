import {randomUUID} from 'node:crypto';
import {AuthError} from './store.js';
export const channels=['general','projects','ai-automation','web-development','cloud-security'];
function text(value,label,max,min=1){if(typeof value!=='string'||value.trim().length<min||value.trim().length>max)throw new AuthError(`${label} must be between ${min} and ${max} characters.`);return value.trim();}
function github(value){if(!value)return '';let url;try{url=new URL(value);}catch{throw new AuthError('Enter a valid GitHub URL.');}if(url.protocol!=='https:'||url.hostname!=='github.com'||url.username||url.password||url.port||url.pathname.split('/').filter(Boolean).length<2)throw new AuthError('Use an HTTPS github.com repository, issue, pull request, or file link.');return url.href;}
export function communityAction(data,user,action,input={}){
  data.community??={posts:[]};const posts=data.community.posts;
  const author={id:user.id,name:user.name};
  if(action==='list')return {posts};
  if(action==='create'){
    if(!['discussion','question'].includes(input.kind))throw new AuthError('Choose a discussion or code review question.');
    if(!channels.includes(input.channel))throw new AuthError('Choose a listed channel.');
    const post={id:randomUUID(),author,kind:input.kind,channel:input.channel,title:text(input.title,'Title',140,5),body:text(input.body,'Details',12000,10),code:input.code?text(input.code,'Code',8000):'',github:github(input.github),tags:typeof input.tags==='string'?[...new Set(input.tags.split(',').map(t=>t.trim().toLowerCase()).filter(Boolean))].slice(0,5).map(t=>text(t,'Tag',24)):[],createdAt:new Date().toISOString(),replies:[],votes:[],acceptedReplyId:null};posts.push(post);return {post};
  }
  const post=posts.find(p=>p.id===input.postId);if(!post)throw new AuthError('This discussion could not be found.',404);
  if(action==='reply'){const reply={id:randomUUID(),author,body:text(input.body,'Reply',12000),code:input.code?text(input.code,'Code',8000):'',github:github(input.github),createdAt:new Date().toISOString()};post.replies.push(reply);}
  else if(action==='vote'){post.votes=post.votes.includes(user.id)?post.votes.filter(id=>id!==user.id):[...post.votes,user.id];}
  else if(action==='accept'){if(post.author.id!==user.id)throw new AuthError('Only the question author can accept an answer.',403);if(post.kind!=='question'||!post.replies.some(r=>r.id===input.replyId))throw new AuthError('Choose an answer to this question.');post.acceptedReplyId=post.acceptedReplyId===input.replyId?null:input.replyId;}
  else throw new AuthError('Unknown community action.');
  return {post};
}
