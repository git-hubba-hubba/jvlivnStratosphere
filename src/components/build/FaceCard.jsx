import React from "react";

function FaceCard({ obj }) {
  return (
    <>
      <img
        src="images/jclLogoMajor.png"
        alt=""
        className="cardCoverer heartbeat"
      />
      <h5 className="facerTitle">{obj.title} Services</h5>
    </>
  );
}

export default FaceCard;
