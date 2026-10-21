import React from "react";

function FaceCard({ obj }) {
  return (
    <>
      <img
        src="/images/main-logo.png"
        alt=""
        className="cardCoverer heartbeat"
      />
      <h3 className="facerTitle">{obj.title} Services</h3>
    </>
  );
}

export default FaceCard;
