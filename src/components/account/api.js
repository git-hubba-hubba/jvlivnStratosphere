export async function accountRequest(path,{method='GET',body,signal}={}){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),10000);
  let response;
  try{response=await fetch(`/api/auth${path}`,{method,credentials:'same-origin',headers:{Accept:'application/json',...(body!==undefined?{'Content-Type':'application/json'}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:signal||controller.signal});}
  catch{throw new Error('The account service is unavailable. Please try again shortly.');}
  finally{clearTimeout(timeout);}
  let data;try{data=await response.json();}catch{throw new Error('The account service is unavailable. Please try again shortly.');}
  if(!response.ok){const error=new Error(data.error||'The request could not be completed.');error.status=response.status;throw error;}
  return data;
}
