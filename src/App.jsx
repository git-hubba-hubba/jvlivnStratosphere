import {useEffect, useRef, useState} from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/general/Nav";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Namespace from "./components/general/Namespace";
import { useYoutubeAudio } from "./components/teach/useYoutubeAudio";
import Library from "./components/general/Library";
import Profile from "./components/account/Profile";
import RewardNotice from "./components/gamification/RewardNotice";
import Insights from "./pages/Insights";
function App() {
  const toggleMusic = useYoutubeAudio("2uhxcxRtkaQ");
  const navigate=useNavigate();
  const [neon,setNeon]=useState(()=>{try{return localStorage.getItem('jvl-theme')==='neon';}catch{return false;}});
  const logoClicks=useRef({count:0,timer:null});
  useEffect(()=>{
    document.documentElement.dataset.theme=neon?'neon':'light';
    try{localStorage.setItem('jvl-theme',neon?'neon':'light');}catch{/* The theme still works without browser storage. */}
  },[neon]);
  useEffect(()=>()=>clearTimeout(logoClicks.current.timer),[]);
  function handleLogoClick(event){
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    const clicks=logoClicks.current;
    clearTimeout(clicks.timer);
    if(event.detail===0){toggleMusic();navigate('/home');return;}
    clicks.count++;
    if(clicks.count===3){clicks.count=0;setNeon(value=>!value);return;}
    clicks.timer=setTimeout(()=>{clicks.count=0;toggleMusic();navigate('/home');},500);
  }

  
  return (
    <>
      {/* Nav */}
      <RewardNotice/>
      <Namespace/>
      <div className="majorLeft">
        <Link to="/home" className="main-logo-link" aria-label="JVLIVN home" title="Triple-click to toggle neon dark mode. Keyboard: Alt+Enter." onClick={handleLogoClick} onKeyDown={event=>{if(event.altKey&&event.key==='Enter'){event.preventDefault();setNeon(value=>!value);}}}>
          <img src="/images/main-logo.png" alt="JVLIVN" className="gifMe main-logo" />
        </Link>
      </div>
      {/* Dashboard */}
      <div className="organicSplit">
        <div className="ogMid">
        <Nav />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/build" element={<Build />} />
            <Route path="/teach" element={<Learn />} />
            <Route path="/about" element={<Contact />} />
            <Route path="/lib" element={<Library/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/insights" element={<Insights/>} />
            <Route path="*" element={<Navigate to="/home" replace/>} />
          </Routes>
          <Footer />
        </div>

      </div>
    </>
  );
}

export default App;
