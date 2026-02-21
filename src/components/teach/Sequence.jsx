import React from "react";

function Sequence({info}) {
  return (
    <>
      <div className="stepContainer">
        <img src={info.img} alt="" className="stepPhoto" />
        <div className="stepMaker">
          <h3 className="stepHeader">{info.title} </h3>
          <p className="stepDescribe">
            {info.desc}
          </p>
        </div>
      </div>
    </>
  );
}

export default Sequence;
