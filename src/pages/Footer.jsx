import { Link } from "react-router-dom";
import "./Footer.css";

const destinations = [
  ["/about", "Build something", "Solutions for your next idea"],
  ["/teach", "Learn something", "Skills that open doors"],
  ["/insights", "Find inspiration", "Ideas from our community"],
];

export default function Footer() {
  return (
    <footer className="jvl-footer" aria-labelledby="footer-heading">
      <div className="jvl-footer-topline"><span>CREATIVE MINDS. LASTING IMPACT.</span><span>NYC / ATL / OAK / DAL</span></div>
      <div className="jvl-footer-main">
        <div className="jvl-footer-invitation">
          <p className="jvl-footer-eyebrow">Your next chapter starts here</p>
          <h2 id="footer-heading">Big ideas.<br /><em>Real possibilities.</em></h2>
          <p>Bring your curiosity. Bring your ambition. Let’s create something that moves you forward.</p>
          <a className="jvl-footer-cta" href="mailto:admin@jvlivn.dev">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
        <nav className="jvl-footer-paths" aria-label="Explore JVLIVN">
          {destinations.map(([to, title, detail], index) => (
            <Link className="jvl-footer-path" to={to} key={to}>
              <span className="jvl-footer-number" aria-hidden="true">0{index + 1}</span>
              <span><strong>{title}</strong><small>{detail}</small></span>
              <span className="jvl-footer-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="jvl-footer-contact">
        <Link className="jvl-footer-brand" to="/home" aria-label="JVLIVN home">
          <img src="/images/main-logo.png" alt="" width="48" height="48" loading="lazy" />
          <span>JVLIVN<small>Technology with purpose.</small></span>
        </Link>
        <div className="jvl-footer-contact-links"><a href="mailto:admin@jvlivn.dev">admin@jvlivn.dev</a><a href="tel:+19292332109">929-233-2109</a></div>
      </div>
      <div className="jvl-footer-bottom">
        <span>© {new Date().getFullYear()} JVLIVN</span><span>Keep building. Keep becoming.</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Back to top <span aria-hidden="true">↑</span></button>
      </div>
    </footer>
  );
}
