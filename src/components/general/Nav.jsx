import { React, useState } from "react";
import { useYoutubeAudio } from "../teach/useYoutubeAudio";
import { Link } from "react-router-dom";
import Bookmark from "../../pages/Bookmark";

function Nav() {
  const toggleMusic = useYoutubeAudio("2uhxcxRtkaQ");
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
      tabName: "CourseCart",
      tabDescription: "Explore Our Many Different Course Offerings",
      tabImg: "https://www.freeiconspng.com/thumbs/brain-icon-png/brain-2.png",
    },
    service: {
      tabName: "Services",
      tabDescription: "Witness What We Aim to Accomplish for Your Organization",
      tabImg: "https://cdn-icons-png.flaticon.com/512/65/65000.png",
    },
  };
  const [currentInfo, setCurrentInfo] = useState(descriptionPuzzle.home);
  return (
    <>
      <div className="navSuperior">
      <div className="descriptionUpper">
          <div className="smSay fontdiner-swanky-regular">{currentInfo.tabDescription}</div>
          <img src={currentInfo.tabImg} alt="" className="logo" />
        </div>
        <div className="majorRight">
          <nav className="navMain">
            <div className="navBtn">
              <Link to="/home">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/25/25694.png"
                  alt=""
                  className="navImg"
                  onClick={() => {
                    setCurrentInfo(descriptionPuzzle.home);
                  }}
                />
              </Link>
              <div className="navTitle">Home</div>
            </div>

            <div className="navBtn">
              <Link to="/build">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/603/603781.png"
                  alt=""
                  className="navImg"
                  onClick={() => {
                    setCurrentInfo(descriptionPuzzle.build);
                  }}
                />
              </Link>
              <div className="navTitle">Build</div>
            </div>

            <div className="navBtn">
              <Link to="/teach">
                <img
                  src="https://www.freeiconspng.com/thumbs/brain-icon-png/brain-2.png"
                  alt=""
                  className="navImg"
                  onClick={() => {
                    setCurrentInfo(descriptionPuzzle.learn);
                  }}
                />
              </Link>
              <div className="navTitle">Learn</div>
            </div>

            <div className="navBtn">
              <Link to="/about">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/65/65000.png"
                  alt=""
                  className="navImg"
                  onClick={() => {
                    setCurrentInfo(descriptionPuzzle.service);
                  }}
                />
              </Link>
              <div className="navTitle">Vision</div>
            </div>
          </nav>
          <Bookmark name={currentInfo.tabName} />
        </div>
        
      </div>
    </>
  );
}

export default Nav;
