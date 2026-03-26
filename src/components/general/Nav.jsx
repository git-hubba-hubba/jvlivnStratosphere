import React from "react";
import { useYoutubeAudio } from "../teach/useYoutubeAudio";
import { Link } from "react-router-dom";

function Nav() {
  const toggleMusic = useYoutubeAudio("2uhxcxRtkaQ");
  return (
    <>
      <div className="navSuperior">
        <div className="majorLeft">
          <div className="nameStretch">
            <div className="letta">J</div>
            <div className="letta">V</div>
            <div className="letta">L</div>
            <div className="letta">I</div>
            <div className="letta">V</div>
            <div className="letta">N</div>
          </div>
          <div className="guessingGame">
            {/* <Link to="/home">
              <img
                src="/images/jclLogoMajor.png"
                alt=""
                className="gifMe"
                onClick={toggleMusic}
              />
            </Link> */}
          </div>

          {/* <p className="slogan">True. Innovative. Tech. Solutions</p> */}
        </div>
        <div className="majorRight">
          <nav className="navMain">
              <div className="navBtn">
            <Link to="/home">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/25/25694.png"
                  alt=""
                  className="navImg heartbeat"
                  />
                  </Link>
                <div className="navTitle">Home</div>
              </div>

              <div className="navBtn">
            <Link to="/build">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/603/603781.png"
                  alt=""
                  className="navImg heartbeat"
                />
            </Link>
                <div className="navTitle">Build</div>
              </div>
              <div className="navBtn">
            <Link to="/home">
                <img
                  src="/images/jclLogoMajor.png"
                  alt=""
                  className="gifMe"
                  
                  onClick={toggleMusic}
                  />
                  </Link>
              </div>
              <div className="navBtn">
            <Link to="/teach">
                <img
                  src="https://www.freeiconspng.com/thumbs/brain-icon-png/brain-2.png"
                  alt=""
                  className="navImg heartbeat"
                />
            </Link>
                <div className="navTitle">Learn</div>
              </div>

              <div className="navBtn">
            <Link to="/about">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/65/65000.png"
                  alt=""
                  className="navImg heartbeat"
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
