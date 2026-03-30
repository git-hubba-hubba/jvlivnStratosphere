import { React, useState } from "react";
import Tvmodal2 from "../build/Tvmodal2";
function Subject({ obj}) {
  const [currentSyll, setCurrentSyll] = useState([]);
  return (
    <>
      <div className="subMatter">
        <div className="subMtop">
          <img src={obj.img} alt="" className="subImg" />
          <div className="subName">{obj.subName}</div>
        </div>

        <p className="subdesc">{obj.subDesc}</p>

        <div className="btnCafe">
          <button
            className="syllabus"
            onClick={() => {
              setCurrentSyll(obj.syllabusDesc);
            }}
          >
            Syllabus
          </button>
          <Tvmodal2 />
        </div>
        <div className="hideSyll"  >
          {currentSyll.map((badSyll,key) => {
            return (
              <div key={key}>
                <div className="lilSyll">
                  <div className="syllTrack">[Wk{key}]</div>
                  <div className="syllName">{badSyll}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Subject;
