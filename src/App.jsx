import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/general/Nav";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Footer from "./pages/Footer";
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
          <TestimonialsQueue />
        </div>
        <div className="ogMid">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/build" element={<Build />} />
            <Route path="/teach" element={<Learn />} />
            <Route path="/about" element={<Contact />} />
          </Routes>
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
