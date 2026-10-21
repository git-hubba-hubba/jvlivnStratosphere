import {useEffect,useRef,useState} from 'react';
import EventSlice from './EventSlice';
export default function EventPage({saved=[],onSave}){
  const [zip,setZip]=useState('');const [state,setState]=useState({status:'idle',events:[],error:'',zip:''});const request=useRef(null);
  useEffect(()=>()=>{request.current?.abort();request.current=null;},[]);
  async function search(event){event.preventDefault();request.current?.abort();const controller=new AbortController();request.current=controller;setState({status:'loading',events:[],error:'',zip});
    const timeout=setTimeout(()=>controller.abort(),60000);
    try{const response=await fetch(`/api/predicthq/events?zipcode=${encodeURIComponent(zip.trim())}`,{signal:controller.signal,headers:{Accept:'application/json'}});let data;try{data=await response.json();}catch{throw new Error('Local event search is unavailable. Please try again shortly.');}if(!response.ok)throw new Error(response.status>=500?'Local event search is unavailable. Please try again shortly.':data.error||'Unable to search this area.');
      if(!Array.isArray(data.results))throw new Error('Local event search returned an unexpected response.');
      const events=data.results.map(item=>{const start=new Date(item.start);return {id:`local-${item.id}`,eventName:item.title||'Technology event',evtDesc:item.description||'Visit the organizer for more details about this event.',evtUrl:item.url||'',category:item.category||'Technology',format:'Local event',local:true,location:item.entities?.find(entity=>entity.formatted_address)?.formatted_address||`Near ${zip.trim()}`,date:Number.isNaN(start.getTime())?'':start.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})};});
      if(request.current===controller)setState({status:'success',events,error:'',zip:zip.trim()});
    }catch(error){if(request.current===controller)setState({status:'error',events:[],zip,error:error.name==='AbortError'?'The search timed out. Please try again.':error.message});}finally{clearTimeout(timeout);}
  }
  return <div><form className="ef-local-search" onSubmit={search}><div><h3>A good connection could be close by.</h3><p>Search for technology events within 15 miles of a US ZIP code.</p></div><label>US ZIP code<input required pattern="[0-9]{5}" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="e.g. 60601" value={zip} onChange={event=>setZip(event.target.value)} title="Enter a five-digit US ZIP code"/></label><button className="ef-primary" disabled={state.status==='loading'}>{state.status==='loading'?'Searching…':'Find local events →'}</button></form>
    {state.status==='idle'&&<div className="ef-empty"><span aria-hidden="true">⌖</span><h3>Find your local tech community.</h3><p>Enter a ZIP code to discover upcoming conferences, meetups, and learning events nearby.</p></div>}
    {state.status==='loading'&&<div className="ef-empty" role="status">Looking for events near {state.zip}…</div>}
    {state.status==='error'&&<p className="ef-error" role="alert">{state.error}</p>}
    {state.status==='success'&&<><p className="ef-results" role="status">{state.events.length} events near {state.zip} · Powered by PredictHQ</p>{!state.events.length&&<div className="ef-empty"><h3>No events found in this area.</h3><p>Try another ZIP code, or browse the organizer directory in Discover.</p></div>}<div className="ef-grid">{state.events.map(item=><EventSlice key={item.id} obj={item} saved={saved.some(s=>s.id===item.id)} onSave={onSave}/>)}</div></>}
  </div>;
}
