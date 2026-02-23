import React from "react";
import Namespace from "../components/general/Namespace"
import Contractor from "../components/build/Contractor";
function Contact() {
  return (
    <>
      <div className="introduckN">
        <div className="descriptionUpper">
          <div className="smSay">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae.
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/65/65000.png"
            alt=""
            className="logo"
          />
        </div>
      </div>

      <img src="/images/jvlMantra.png" alt="" className="jvlShowcase" />
      <Namespace />

      <Contractor />
    </>
  );
}

export default Contact;
