import React from "react";

function ProgressTracker() {
  const userProgress = {
    coursesAttempted: 0,
    coursesCompleted: 0,
    activeMember: true,
    memberTier: "Sapphire",
    problemsSolved: 0,
    siteTime: Date.now(),
  };

  return (
    <>
      <div className="ptContainer">
        <div className="ptTrack">
          <div className="ptPathFinder">
            <h1 className="fontdiner-swanky-regular">Progress Tracker</h1>
            <img
              src="images/jvlBadjiess/111.png"
              alt=""
              className="baddge"
            />
            <img
              src="images/jvlBadjiess/222.png"
              alt=""
              className="baddge"
            />
            <img
              src="images/jvlBadjiess/333.png"
              alt=""
              className="baddge"
            />
          
          </div>
          <div className="ptMissc">
            <div className="infopt">
              Assigned Courses{" "}
              <span className="fancyShower fontdiner-swanky-regular">
                {userProgress.coursesAttempted}
              </span>
            </div>
            <div className="infopt">
              Completed Courses
              <span className="fancyShower fontdiner-swanky-regular">
                {userProgress.coursesCompleted}
              </span>
            </div>
            <div className="infopt">
              Problems Solved
              <span className="fancyShower fontdiner-swanky-regular">
                {userProgress.problemsSolved}
              </span>
            </div>
            <div className="infopt">
              Membership Tier
              <span className="fancyShower fontdiner-swanky-regular">
                {userProgress.memberTier}
              </span>
            </div>
            <img
              src="/public/images/jvlBadjiess/444.png"
              alt=""
              className="baddge"
            />
            <img
              src="/public/images/jvlBadjiess/555.png"
              alt=""
              className="baddge"
            />
            <img
              src="/public/images/jvlBadjiess/777.png"
              alt=""
              className="baddge"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressTracker;
