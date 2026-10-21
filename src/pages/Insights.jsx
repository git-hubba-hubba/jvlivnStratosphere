import {useSearchParams} from 'react-router-dom';
import Articles from '../components/Articles';
import CommunityHub from '../components/insights/CommunityHub';
import '../components/insights/insights.css';
export default function Insights(){
  const [params,setParams]=useSearchParams();const view=['reviews','community'].includes(params.get('view'))?'community':'articles';
  return <main className="in-page"><header className="in-intro"><span className="in-eyebrow">JVLIVN / INSIGHTS</span><h1>Stay curious. Stay connected.</h1><p>A space for fresh perspectives in AI and technology, and the experiences that shape our community.</p></header><nav className="in-tabs" aria-label="Insights sections"><button aria-current={view==='articles'?'page':undefined} onClick={()=>setParams({view:'articles'})}>Articles & updates</button><button aria-current={view==='community'?'page':undefined} onClick={()=>setParams({view:'community'})}>Community hub</button></nav>
    {view==='articles'?<Articles/>:<CommunityHub/>}
  </main>;
}
