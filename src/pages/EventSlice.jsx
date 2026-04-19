import React from "react";

function EventSlice({ obj }) {
  return (
    <>
      <div className="evtSlice">
        <img src="images/jclLogoMajor.png" alt={obj.eventName} className="evtImg" />
        <div className="sectionRegulation">
          <div className="evtDesc">{obj.evtDesc}</div>
          <div className="evtNamingBox">
            {obj.evtUrl ? (
              <a href={obj.evtUrl} target="_blank" rel="noreferrer">
                {obj.eventName}
              </a>
            ) : (
              obj.eventName
            )}
          </div>
        </div>
        {/* <img
          src="https://www.freeiconspng.com/thumbs/calendar-icon-png/calendar-icon-png--0.png"
          alt=""
          className="evtSmImg"
        /> */}
      </div>
    </>
  );
}

export default EventSlice;
