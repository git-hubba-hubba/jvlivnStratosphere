import React from "react";

function Bulletpoint({ txt }) {
  return (
    <>
      <div className="barrel">
        <img
          src="/images/main-logo.png"
          alt=""
          className="bulletLogo"
        />
        <p className="bulletFeat">{txt}</p>
      </div>
    </>
  );
}

export default Bulletpoint;
