import React from 'react'
import Tvmodal2 from '../build/Tvmodal2'
function Subject({obj}) {
  return (
    <>
    <div className="subMatter">
    <div className="subMtop">
        <img src={obj.img} alt="" className="subImg" />
        <div className="subName">{obj.subName}</div>
    </div>

    <p className="subdesc">{obj.subDesc}</p>

    <div className="btnCafe">
    <button className="syllabus">Download Syllabus</button>
    <Tvmodal2 />
    
    </div>
    </div>
    
    </>
  )
}

export default Subject