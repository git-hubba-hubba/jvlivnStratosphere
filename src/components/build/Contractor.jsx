import { React,useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Targeting from "../general/Targeting";
import Pricing from '../general/Pricing'
import Engagement from "../general/Engage"
import Solutions from "../general/Solutions";

function Contractor() {
    const [currentSlide,setCurrentSlide] = useState("")
  return (
    <div>
      <h2 className="ctTitle">Consultation Structure & Business Development</h2>
      <p className="ctDesc">
        Our Goal is to provide innovative viable tech solutions to your company.
        We accomplish this by understandin the unique needs of your organization
        and utilizing its strengths,connections,and reach to develop
        cost-effective ways to generate more income. We provide record-keeping
        services and other essential tools to create effective strategies for
        profit generation and overall business growth.
      </p>

      <div className="movieScreen">
        <div className="screen">
            {currentSlide === "pricing" ? <> <Pricing /> </> : "" }
            {currentSlide === "engagement" ? <> <Engagement /> </> : "" }
            {currentSlide === "solutions" ? <> <Solutions /> </> : "" }
            {currentSlide === "targeting" ? <> <Targeting /> </> : ""}

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
            <div className="navTitle">Pricing</div>
          </div>

          <div className="navBtn">
            <img
              src="https://static.thenounproject.com/png/87667-200.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("engagement")
              }}
            />
            <div className="navTitle">Steps</div>
          </div>

          <div className="navBtn">
            <img
              src="https://www.freeiconspng.com/thumbs/question-mark-icon/black-question-mark-icon-clip-art-10.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("solutions")
              }}
            />
            <div className="navTitle">Problem</div>
          </div>

          <div className="navBtn">
            <img
              src="https://static.thenounproject.com/png/2191323-200.png"
              alt=""
              className="navImg" onClick={()=>{
                setCurrentSlide("targeting")
              }}
            />
            <div className="navTitle">Mission</div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Contractor;
