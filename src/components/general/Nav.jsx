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
      tabName: "Courses",
      tabDescription: "Explore Our Many Different Course Offerings",
      tabImg: "https://st4.depositphotos.com/18672748/20963/v/450/depositphotos_209638806-stock-illustration-learning-icon-vector-isolated-white.jpg",
    },
    service: {
      tabName: "Services",
      tabDescription: "Witness What We Aim to Accomplish for Your Organization",
      tabImg: "https://www.clipartmax.com/png/full/470-4708897_thx-consulting-icon-c-transparent-service-icon-png.png",
    },
    library: {
      tabName: "Library",
      tabDescription: "Collection of Valuable Resources for Memebers",
      tabImg: "https://images.vexels.com/media/users/3/140908/isolated/preview/bdc30bbe3c022a11e2d7fd0e642c61ae-open-book-icon.png",
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
            <div className="navBtn ">
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
              <div className="navTitle">Engage</div>
            </div>

            <div className="navBtn ">
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
              <div className="navTitle">Process</div>
            </div>

            <div className="navBtn ">
              <Link to="/teach">
                <img
                  src="https://st4.depositphotos.com/18672748/20963/v/450/depositphotos_209638806-stock-illustration-learning-icon-vector-isolated-white.jpg"
                  alt=""
                  className="navImg"
                  onClick={() => {
                    setCurrentInfo(descriptionPuzzle.learn);
                  }}
                />
              </Link>
              <div className="navTitle">Learn</div>
            </div>

            <div className="navBtn ">
              <Link to="/about">
                <img
                  src="https://www.clipartmax.com/png/full/470-4708897_thx-consulting-icon-c-transparent-service-icon-png.png"
                  alt=""
                  className="navImg"
                  onClick={() => {
                    setCurrentInfo(descriptionPuzzle.service);
                  }}
                />
              </Link>
              <div className="navTitle">Services</div>
            </div>

            {/* <div className="navBtn ">
              <Link to="/lib">
                <img
                  src="https://images.vexels.com/media/users/3/140908/isolated/preview/bdc30bbe3c022a11e2d7fd0e642c61ae-open-book-icon.png"
                  alt=""
                  className="navImg"
                  onClick={() => {
                    setCurrentInfo(descriptionPuzzle.library);
                  }}
                />
              </Link>
              <div className="navTitle">Lib</div>
            </div> */}
          </nav>
          <Bookmark name={currentInfo.tabName} />
        </div>
        
      </div>
    </>
  );
}

export default Nav;
