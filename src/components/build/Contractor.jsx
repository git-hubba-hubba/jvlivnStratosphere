import { React,useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Targeting from "../general/Targeting";
import Pricing from '../general/Pricing'
import Engagement from "../general/Engage"
import Solutions from "../general/Solutions";
import MajorModelXP from "../teach/MajorModelXP";
import Membership from "../general/Membership";
import ResumeTailor from "./../build/ResumeTailor";
import Engage from "../general/Engage";
import RippableFlyerCarousel from "../teach/RippableFlyerCarousel";
import EventPage from "../../pages/EventPage";
import InternalEvPage from "../../pages/InternalEvPage";

function Contractor() {
    const [currentSlide,setCurrentSlide] = useState("")
  return (
    <div>
   

      <div className="movieScreen">
      <nav className="navMain">
          <div className="navBtn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/245/245904.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("pricing")
              }}
            />
            <div className="navTitle">Paid</div>
          </div>

          <div className="navBtn">
            <img
              src="https://static.thenounproject.com/png/87667-200.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("engagement")
              }}
            />
            <div className="navTitle">Local</div>
          </div>

          <div className="navBtn">
            <img
              src="https://www.freeiconspng.com/thumbs/question-mark-icon/black-question-mark-icon-clip-art-10.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("solutions")
              }}
            />
            <div className="navTitle">Inquiry</div>
          </div>

          <div className="navBtn">
            <img
              src="https://static.thenounproject.com/png/2191323-200.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("targeting")
              }}
            />
            <div className="navTitle">Nearby</div>
          </div>
        </nav>
        <div className="screen">
          
          {currentSlide === ""? <img src="/images/jclLogoMajor.png" alt="" className="lionShare" /> : ""}
            {currentSlide === "pricing" ? <><InternalEvPage /></> : "" }
            {currentSlide === "engagement" ? <>  <EventPage/> </> : "" }
            {currentSlide === "solutions" ? <>  </> : "" }
            {currentSlide === "targeting" ? <> </> : ""}

        </div>
      
      </div>
    </div>
  );
}

export default Contractor;
