import React from "react";
import { Link } from "react-router-dom";

function Nav() {
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
          <Link to="/home">
            <img src="/images/jclLogoMajor.png" alt="" className="gifMe" />
          </Link>
          {/* <p className="slogan">True. Innovative. Tech. Solutions</p> */}
        </div>
        <div className="majorRight">
          <nav className="navMain">
            <Link to="/home">
              <div className="navBtn">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/25/25694.png"
                  alt=""
                  className="navImg heartbeat"
                />
                <div className="navTitle">Home</div>
              </div>
            </Link>

            <Link to="/build">
              <div className="navBtn">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/603/603781.png"
                  alt=""
                  className="navImg heartbeat"
                />
                <div className="navTitle">Build</div>
              </div>
            </Link>

            <Link to="/teach">
              <div className="navBtn">
                <img
                  src="https://www.freeiconspng.com/thumbs/brain-icon-png/brain-2.png"
                  alt=""
                  className="navImg heartbeat"
                />
                <div className="navTitle">Learn</div>
              </div>
            </Link>

            <Link to="/about">
              <div className="navBtn">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/65/65000.png"
                  alt=""
                  className="navImg heartbeat"
                />
                <div className="navTitle">Vision</div>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Nav;
