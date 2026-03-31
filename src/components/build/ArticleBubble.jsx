import React, { useState } from "react";
import "../../App.css";

export function ArticleBubble({
  image,
  alt = "article image",
  title,
  content,
  buttonText = "Close",
  className = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={image}
        alt={alt}
        className={`articleBubble ${className}`}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="articleOverlay" onClick={() => setOpen(false)}>
          <div className="articleModal" onClick={(e) => e.stopPropagation()}>
            <button
              className="articleCloseBtn"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {title && <h2 className="articleTitle">{title}</h2>}
            <div style={{alignItems:"center"}}>
              <img src="/images/jclLogoMajor.png" alt="" className="myguyy" />
            </div>
            <div className="articleContent">
              {typeof content === "string" ? <p>{content}</p> : content}
            </div>

            <button className="articleActionBtn" onClick={() => setOpen(false)}>
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
