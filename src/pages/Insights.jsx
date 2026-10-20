import {useSearchParams} from 'react-router-dom';
import Articles from '../components/Articles';
import TestimonialsQueue from '../components/build/TestimonialsStack';
import '../components/insights/insights.css';
export default function Insights(){
  const [params,setParams]=useSearchParams();const view=params.get('view')==='reviews'?'reviews':'articles';
  return <main className="in-page"><header className="in-intro"><span className="in-eyebrow">JVLIVN / INSIGHTS</span><h1>Stay curious. Stay connected.</h1><p>A space for fresh perspectives in AI and technology, and the experiences that shape our community.</p></header><nav className="in-tabs" aria-label="Insights sections"><button aria-current={view==='articles'?'page':undefined} onClick={()=>setParams({view:'articles'})}>Articles & updates</button><button aria-current={view==='reviews'?'page':undefined} onClick={()=>setParams({view:'reviews'})}>Reviews & community</button></nav>
    {view==='articles'?<Articles/>:<section className="in-community" aria-labelledby="in-reviews-title"><span className="in-eyebrow">COMMUNITY PERSPECTIVES</span><h2 id="in-reviews-title">Reviews</h2><p>JVLIVN is in the early stages of building its reputation, with a strong focus on delivering real value through practical tech education, digital solutions, and hands-on support. As the brand continues to grow, its approach centers on clarity, real-world application, and measurable outcomes rather than hype.</p><TestimonialsQueue/><p>Future reviews and testimonials will reflect the experiences of individuals and organizations who engage with JVLIVN’s services, highlighting the impact of its training, development work, and consulting. The goal is to earn trust through consistent delivery, allowing authentic feedback to naturally shape the brand’s credibility over time.</p></section>}
  </main>;
}
