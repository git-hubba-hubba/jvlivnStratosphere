import { useYoutubeAudio } from "../teach/useYoutubeAudio";
import { Link, useLocation } from "react-router-dom";
import Bookmark from "../../pages/Bookmark";
import NavIcon from "./NavIcon";

function Nav() {
  useYoutubeAudio("2uhxcxRtkaQ");
  const { pathname } = useLocation();
  const descriptionPuzzle = {
    default:{
      tabName: "JVLIVN",
      tabDescription: "Custom Tech Solutions Made Simple",
      icon: "home"
    },
    home: {
      tabName: "About Us",
      tabDescription: "Learn about who we are and what we seek to accomplish.",
      icon: "home",
    },
    build: {
      tabName: "How It Works",
      tabDescription: "Understand our Build Process & Procedural Outline",
      icon: "process",
    },
    learn: {
      tabName: "Courses",
      tabDescription: "Explore Our Many Different Course Offerings",
      icon: "learn",
    },
    service: {
      tabName: "Services",
      tabDescription: "Witness What We Aim to Accomplish for Your Organization",
      icon: "services",
    },
    insights: {tabName:"Insights",tabDescription:"Recent AI and technology articles, reviews, and community perspectives",icon: "insights"},
    profile: {tabName:"Your Profile",tabDescription:"Your profile, progress, and achievements",icon: "profile"},
    library: {
      tabName: "Resources",
      tabDescription: "Courses, coding practice, and interview preparation",
      icon: "resources",
    },
  };
  const section = { "/home": "home", "/build": "build", "/teach": "learn", "/about": "service", "/lib": "library", "/profile": "profile", "/insights": "insights" }[pathname] || "home";
  const currentInfo = descriptionPuzzle[section];
  return (
    <>
      <div className="navSuperior">
      <div className="descriptionUpper">
        <div className="smSay fontdiner-swanky-regular">{currentInfo.tabDescription}</div>
          <NavIcon name={currentInfo.icon} className="logo" />
        </div>
        <div className="majorRight">
          <nav className="navMain" aria-label="Main navigation">
            <div className="navBtn ">
              <Link to="/home" aria-label="Engage" aria-current={pathname === "/home" ? "page" : undefined}>
                <NavIcon name="home" />
                <span className="navTitle">Engage</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/build" aria-label="Process" aria-current={pathname === "/build" ? "page" : undefined}>
                <NavIcon name="process" />
                <span className="navTitle">Process</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/teach" aria-label="Learn" aria-current={pathname === "/teach" ? "page" : undefined}>
                <NavIcon name="learn" />
                <span className="navTitle">Learn</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/about" aria-label="Services" aria-current={pathname === "/about" ? "page" : undefined}>
                <NavIcon name="services" />
                <span className="navTitle">Services</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/lib" aria-label="Resources" aria-current={pathname === "/lib" ? "page" : undefined}>
                <NavIcon name="resources" />
                <span className="navTitle">Resources</span>
              </Link>
            </div>
            <div className="navBtn"><Link to="/insights" aria-label="Insights" aria-current={pathname === "/insights" ? "page" : undefined}><NavIcon name="insights" /><span className="navTitle">Insights</span></Link></div>
            <div className="navBtn navProfile"><Link to="/profile" aria-label="Your profile" aria-current={pathname === "/profile" ? "page" : undefined}><NavIcon name="profile" /><span className="navTitle">Profile</span></Link></div>
          </nav>
          <Bookmark name={currentInfo.tabName} />
        </div>
      </div>
    </>
  );
}

export default Nav;
