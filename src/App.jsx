import { useState } from "react";
import { Routes, Route, Link,Navigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/general/Nav";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Bookmark from "./pages/Bookmark";
import Events from "./pages/Events";
import Footer from "./pages/Footer";
import Contractor from "./components/build/Contractor";
import TestimonialsQueue from "./components/build/TestimonialsStack";
import RippableFlyerCarousel from "./components/teach/RippableFlyerCarousel";
function App() {
  return (
    <>
      {/* Nav */}
      <Nav />
      {/* Dashboard */}
      <div className="organicSplit">
        <div className="ogRight">
          <img
            src="images/jclLogoMajor.png"
            alt=""
            className="lionShare"
          />
          <div className="lionShareTopic fontdiner-swanky-regular">Reviews</div>
          <p className="revOne">JVLIVN is in the early stages of building its reputation, with a strong focus on delivering real value through practical tech education, digital solutions, and hands-on support. As the brand continues to grow, its approach centers on clarity, real-world application, and measurable outcomes rather than hype. </p>
          <TestimonialsQueue />
          <p className="revOne">Future reviews and testimonials will reflect the experiences of individuals and organizations who engage with JVLIVN’s services, highlighting the impact of its training, development work, and consulting. The goal is to earn trust through consistent delivery, allowing authentic feedback to naturally shape the brand’s credibility over time.</p>
         
        </div>
        <div className="ogMid">
          <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/build" element={<Build />} />
            <Route path="/teach" element={<Learn />} />
            <Route path="/about" element={<Contact />} />
          </Routes>
          <Footer/>
        </div>
        <div className="ogLeft">
          <img
            src="images/jclLogoMajor.png"
            alt=""
            className="lionShare"
          />
          <div className="lionShareTopic fontdiner-swanky-regular">Events</div>
          <RippableFlyerCarousel/> 
        </div>
      </div>
    </>
  );
}

export default App;
