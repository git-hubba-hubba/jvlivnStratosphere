import React from "react";
import Namespace from "../components/general/Namespace";

function Footer() {
  return (
    <>
    
      <div className="footerMain">
        <div className="footSplitter">
          <div className="lefti">
            <div className="footSmaller"> Careers</div>
            <div className="footSmaller"> Corporate</div>
            <div className="footSmaller"> Volunteering</div>
            <div className="footSmaller"> 929-233-2109</div>
          </div>
          <div className="righti">
            <div className="footSmaller"> Founder Bio</div>
            <div className="footSmaller"> Scheduling Assist</div>
            <div className="footSmaller"> admin@jvlivn.dev</div>
            <div className="footSmaller"> Translate Site</div>
          </div>
          <div className="imagii">
            <img
              src="/images/jclLogoMajor.png"
              alt=""
              className="footPic"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
