import { React,useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Targeting from "../general/Targeting";
import Pricing from '../general/Pricing'
import Engagement from "../general/Engage"
import Solutions from "../general/Solutions";
import MajorModelXP from "../teach/MajorModelXP";

function Contractor() {
    const [currentSlide,setCurrentSlide] = useState("")
  return (
    <div>
   

      <div className="movieScreen">
        <div className="screen">
          
          {currentSlide === ""? <img src="/images/jclLogoMajor.png" alt="" className="lionShare" /> : ""}
            {currentSlide === "pricing" ? <> Membership </> : "" }
            {currentSlide === "engagement" ? <> <MajorModelXP /> </> : "" }
            {currentSlide === "solutions" ? <> <Pricing /> </> : "" }
            {currentSlide === "targeting" ? <> "" </> : ""}

        </div>
        <nav className="navMain">
          <div className="navBtn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/245/245904.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("pricing")
              }}
            />
            <div className="navTitle">Mission</div>
          </div>

          <div className="navBtn">
            <img
              src="https://static.thenounproject.com/png/87667-200.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("engagement")
              }}
            />
            <div className="navTitle">Recruit</div>
          </div>

          <div className="navBtn">
            <img
              src="https://www.freeiconspng.com/thumbs/question-mark-icon/black-question-mark-icon-clip-art-10.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("solutions")
              }}
            />
            <div className="navTitle">Events</div>
          </div>

          <div className="navBtn">
            <img
              src="https://static.thenounproject.com/png/2191323-200.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("targeting")
              }}
            />
            <div className="navTitle">Invest</div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Contractor;
