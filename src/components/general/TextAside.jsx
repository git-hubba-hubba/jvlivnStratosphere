import React from 'react'

function TextAside({title, descr}) {
  return (
    <>
    <div className="taContainer">
    <h2 className="taTitle">{title}</h2>
    <p className="taDesc">{descr}</p>


    </div>
    
    
    
    </>
  )
}

export default TextAside