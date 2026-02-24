import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/general/Nav";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
function App() {
  return (
    <>
      {/* Nav */}
      <Nav />
      {/* Dashboard */}
      <div className="organicSplit">
        <div className="ogRight"></div>
        <div className="ogMid">
        
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/build" element={<Build />} />
            <Route path="/teach" element={<Learn />} />
            <Route path="/about" element={<Contact />} />
          </Routes>
        </div>
        <div className="ogLeft"></div>
      </div>

      {/* Advertising Products and Services */}

      {/* Events and Volunteering */}
    </>
  );
}

export default App;
