import React from "react";
import { useYoutubeAudio } from "../teach/useYoutubeAudio";
import { Link, useLocation } from "react-router-dom";
import Bookmark from "../../pages/Bookmark";
import {useAuth} from "../account/authContext";

function Nav() {
  useYoutubeAudio("2uhxcxRtkaQ");
  const { pathname } = useLocation();
  const {user} = useAuth();
  const descriptionPuzzle = {
    default:{
      tabName: "JVLIVN",
      tabDescription: "Custom Tech Solutions Made Simple",
      tabImg: "https://cdn-icons-png.flaticon.com/256/25/25694.png"
    },
    home: {
      tabName: "About Us",
      tabDescription: "Learn about who we are and what we seek to accomplish.",
      tabImg: "https://cdn-icons-png.flaticon.com/256/25/25694.png",
    },
    build: {
      tabName: "How It Works",
      tabDescription: "Understand our Build Process & Procedural Outline",
      tabImg: "https://cdn-icons-png.flaticon.com/512/603/603781.png",
    },
    learn: {
      tabName: "Courses",
      tabDescription: "Explore Our Many Different Course Offerings",
      tabImg: "https://st4.depositphotos.com/18672748/20963/v/450/depositphotos_209638806-stock-illustration-learning-icon-vector-isolated-white.jpg",
    },
    service: {
      tabName: "Services",
      tabDescription: "Witness What We Aim to Accomplish for Your Organization",
      tabImg: "https://www.clipartmax.com/png/full/470-4708897_thx-consulting-icon-c-transparent-service-icon-png.png",
    },
    insights: {tabName:"Insights",tabDescription:"Recent AI and technology articles, reviews, and community perspectives",tabImg:"/images/insights.svg"},
    profile: {tabName:"Your Profile",tabDescription:"Your profile, progress, and achievements",tabImg:"/images/jclLogoMajor.png"},
    library: {
      tabName: "Resources",
      tabDescription: "Courses, coding practice, and interview preparation",
      tabImg: "https://images.vexels.com/media/users/3/140908/isolated/preview/bdc30bbe3c022a11e2d7fd0e642c61ae-open-book-icon.png",
    },
  };
  const section = { "/home": "home", "/build": "build", "/teach": "learn", "/about": "service", "/lib": "library", "/profile": "profile", "/insights": "insights" }[pathname] || "home";
  const currentInfo = descriptionPuzzle[section];
  return (
    <>
      <div className="navSuperior">
      <div className="descriptionUpper">
        <div className="smSay fontdiner-swanky-regular">{currentInfo.tabDescription}</div>
          <img src={currentInfo.tabImg} alt="" className="logo" />
        </div>
        <div className="majorRight">
          <nav className="navMain" aria-label="Main navigation">
            <div className="navBtn ">
              <Link to="/home" aria-label="Engage" aria-current={pathname === "/home" ? "page" : undefined}>
                <img
                  src="https://cdn-icons-png.flaticon.com/256/25/25694.png"
                  alt=""
                  className="navImg"
                />
                <span className="navTitle">Engage</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/build" aria-label="Process" aria-current={pathname === "/build" ? "page" : undefined}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/603/603781.png"
                  alt=""
                  className="navImg"
                />
                <span className="navTitle">Process</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/teach" aria-label="Learn" aria-current={pathname === "/teach" ? "page" : undefined}>
                <img
                  src="https://st4.depositphotos.com/18672748/20963/v/450/depositphotos_209638806-stock-illustration-learning-icon-vector-isolated-white.jpg"
                  alt=""
                  className="navImg"
                />
                <span className="navTitle">Learn</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/about" aria-label="Services" aria-current={pathname === "/about" ? "page" : undefined}>
                <img
                  src="https://www.clipartmax.com/png/full/470-4708897_thx-consulting-icon-c-transparent-service-icon-png.png"
                  alt=""
                  className="navImg"
                />
                <span className="navTitle">Services</span>
              </Link>
            </div>

            <div className="navBtn ">
              <Link to="/lib" aria-label="Resources" aria-current={pathname === "/lib" ? "page" : undefined}>
                <img
                  src="https://images.vexels.com/media/users/3/140908/isolated/preview/bdc30bbe3c022a11e2d7fd0e642c61ae-open-book-icon.png"
                  alt=""
                  className="navImg"
                />
                <span className="navTitle">Resources</span>
              </Link>
            </div>
            <div className="navBtn"><Link to="/insights" aria-label="Insights" aria-current={pathname === "/insights" ? "page" : undefined}><img src="/images/insights.svg" alt="" className="navImg"/><span className="navTitle">Insights</span></Link></div>
            <div className="navBtn navProfile"><Link to="/profile" aria-label="Your profile" aria-current={pathname === "/profile" ? "page" : undefined}><span className={`ac-nav-avatar ac-avatar-${user.avatar}`} aria-hidden="true">{user.name.trim()[0].toUpperCase()}</span><span className="navTitle">Profile</span></Link></div>
          </nav>
          <Bookmark name={currentInfo.tabName} />
        </div>
      </div>
    </>
  );
}

export default Nav;
