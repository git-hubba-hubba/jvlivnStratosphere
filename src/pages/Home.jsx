import {useState} from 'react';
import Pricing from '../components/general/Pricing';
import './Home.css';

const quickInfo=[['Contact','929.233.2109'],['Locations','NYC · ATL · OAK · DAL'],['Mission','Empower Our Clients By Providing Lasting Tech Solutions'],['Vision','Creating Global Community Initiatives for Inspiring Entrepreneurs']];
export default function Home(){
  const [selected,setSelected]=useState(null);
  return <main className="engage-page">
    <section className="quadMaster engage-quick" aria-label="About JVLIVN">
      <div className="qp">{quickInfo.slice(0,2).map(([label,value])=><button className="quad" key={label} aria-pressed={selected===value} onClick={()=>setSelected(selected===value?null:value)}>{label}</button>)}</div>
      <p className="hiddenOne engage-quick-answer" role="status">{selected}</p>
      <div className="qp">{quickInfo.slice(2).map(([label,value])=><button className="quad" key={label} aria-pressed={selected===value} onClick={()=>setSelected(selected===value?null:value)}>{label}</button>)}</div>
    </section>
    <Pricing/>
    <section className="engage-row engage-reverse" aria-labelledby="engage-mission"><div className="engage-media"><img src="https://images.unsplash.com/photo-1717701505819-9722f6c92bc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Technology and digital learning" loading="lazy"/></div><div className="engage-copy"><span className="engage-eyebrow">OUR MISSION</span><h2 id="engage-mission">We believe technology should empower, not exclude.</h2><p>Our mission is to build impactful applications and deliver practical, high-quality education that equips people from all backgrounds to thrive in the digital economy. We focus on real skills, real tools, and real outcomes—creating clear pathways to opportunity, ownership, and long-term growth.</p></div></section>
    <section className="engage-row" aria-labelledby="engage-vision"><div className="engage-media"><img src="https://images.pexels.com/photos/35088939/pexels-photo-35088939.jpeg?cs=srgb&dl=pexels-akoonie-35088939.jpg&fm=jpg" alt="Creative technology and innovation" loading="lazy"/></div><div className="engage-copy"><span className="engage-eyebrow">OUR VISION</span><h2 id="engage-vision">Creative technologists shaping what’s next.</h2><p>Our vision is a future where creative technologists are leaders, creators, and owners in technology—shaping innovation and defining what’s next.</p></div></section>
    <section className="engage-row engage-reverse" aria-labelledby="engage-impact"><div className="engage-media engage-gallery"><img src="https://img.freepik.com/premium-photo/showcasing-technology-integration-diverse-settings_1161356-31043.jpg?semt=ais_hybrid&w=740&q=80" alt="Technology integrated into everyday settings" loading="lazy"/><img src="https://media.istockphoto.com/id/2198117851/photo/digital-overload-and-its-impact-on-the-human-brain-showcasing-fragmented-thoughts-information.jpg?s=612x612&w=0&k=20&c=BPuv9nXpOkB8fDtXHyf53wlywGTvMjRw5w5U14yoemY=" alt="Digital information and human creativity" loading="lazy"/></div><div className="engage-copy"><span className="engage-eyebrow">BUILT WITH PURPOSE</span><h2 id="engage-impact">Opportunity. Ownership. Lasting impact.</h2><p>A future where access is equitable, talent is recognized, and potential is fully realized. We build with purpose. We teach with intention. We value excellence, ownership, and learning by doing.</p><p>This is more than technology. It’s about closing gaps, creating access, and building lasting impact.</p></div></section>
  </main>;
}
