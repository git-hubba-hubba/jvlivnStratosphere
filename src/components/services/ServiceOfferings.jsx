import './services.css';

const presentation = [
  {category:'STRATEGY', title:'Tech Consultation', description:'A clear plan for your next move, grounded in your goals and budget.', icon:'M5 4h14v11H9l-4 4V4Zm4 4h6m-6 3h4', tone:'blue'},
  {category:'BUILD', title:'Web Development', description:'A thoughtful, responsive web experience built to grow with your business.', icon:'m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14', tone:'green'},
  {category:'SYSTEMS', title:'CMS Architecture', description:'Organize your content and give your team the tools to keep it moving.', icon:'M4 4h16v5H4V4Zm0 11h6v5H4v-5Zm10 0h6v5h-6v-5ZM7 9v6m10-6v6M7 12h10', tone:'purple'},
  {category:'MENTORSHIP', title:'Coding Mentorship', description:'Personal guidance to turn unfamiliar concepts into skills you can use.', icon:'M12 3 2 8l10 5 10-5-10-5Zm-6 7v6c4 3 8 3 12 0v-6m4-2v8', tone:'amber'},
  {category:'EDUCATION', title:'Workshops & Instruction', description:'Practical, guided learning designed around your team and its next challenge.', icon:'M3 4h18v12H3V4Zm5 17 4-5 4 5M7 8h10m-10 4h6', tone:'rose'},
  {category:'IDENTITY', title:'Brand Development', description:'Bring your story, visuals, and digital presence into one coherent identity.', icon:'m12 3 9 9-9 9-9-9 9-9Zm0 0v18M3 12h18', tone:'teal'},
];

export default function ServiceOfferings({services}) {
  return <section className="sv-section" aria-labelledby="sv-title">
    <header className="sv-heading"><span className="sv-eyebrow">HOW WE CAN HELP</span><h2 id="sv-title">Good ideas deserve a great next step.</h2><p>From your first question to your next launch, find the support that fits.</p></header>
    <div className="sv-grid">{services.map((service,index)=>{
      const design=presentation[index];
      return <article className={`sv-card sv-${design.tone}`} key={service.title} aria-labelledby={`sv-service-${index}`}>
        <div className="sv-card-top"><span className="sv-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={design.icon}/></svg></span><span className="sv-eyebrow">{design.category}</span><span className="sv-number" aria-hidden="true">0{index+1}</span></div>
        <h3 id={`sv-service-${index}`}>{design.title}</h3><p className="sv-description">{design.description}</p>
        <ul className="sv-features">{service.features.slice(0,3).map(feature=><li key={feature}>{feature}</li>)}</ul>
        <details className="sv-details"><summary>See all inclusions <span aria-hidden="true">＋</span></summary><ul className="sv-features">{service.features.slice(3).map(feature=><li key={feature}>{feature}</li>)}</ul></details>
        <div className="sv-price"><span>INVESTMENT</span><strong>{service.pricing}</strong></div>
      </article>;
    })}</div>
  </section>;
}
