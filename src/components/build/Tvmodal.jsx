import { useState } from "react";
// import "./TvModal.css";

export default function TvModal({name,component, width,title}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 500);
  };

  return (
    <>
      {/* Trigger (DIV, not button) */}
      <div className="open-trigger" style={{border:"solid white", width: width}}  onClick={openModal}>
        {name}
      </div>

      {isOpen && (
        <div className="overlay" onClick={closeModal}>
          <div
            className={`tv-modal ${isClosing ? "tv-off" : "tv-on"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{title}</h2>
              <div className="close-x" onClick={closeModal}>✕</div>
            </div>

            <div className="modal-content">
              {component}
            </div>
          </div>
        </div>
      )}
    </>
  );
}