import { React, useState } from "react";
import { useYoutubeAudio } from "../teach/useYoutubeAudio";
import { Link } from "react-router-dom";

function Nav() {
  const toggleMusic = useYoutubeAudio("2uhxcxRtkaQ");
  const [currentInfo, setCurrentInfo] = useState(null);

  return (
    <>
      <div className="navSuperior">
      <div className="majorLeft">
          <Link to="/home">
            <img
              src="/images/jclLogoMajor.png"
              alt=""
              className="gifMe"
              onClick={toggleMusic}
            />
          </Link>
        </div>
        <div className="majorRight">
          <nav className="navMain">
            <div className="navBtn">
              <Link to="/home">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/25/25694.png"
                  alt=""
                  className="navImg"
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
                />
              </Link>
              <div className="navTitle">Build</div>
            </div>
            <div className="navBtn">
              {/* <Link to="/home">
                <img
                  src="/images/jclLogoMajor.png"
                  alt=""
                  className="gifMe"
                  
                  onClick={toggleMusic}
                  />
                  </Link> */}
            </div>
            <div className="navBtn">
              <Link to="/teach">
                <img
                  src="https://www.freeiconspng.com/thumbs/brain-icon-png/brain-2.png"
                  alt=""
                  className="navImg"
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
                />
              </Link>
              <div className="navTitle">Vision</div>
            </div>
          </nav>
        </div>
       
      </div>
    </>
  );
}

export default Nav;
