import { useState } from "react";
import CalendarScheduler from "../general/CalendarScheduler";
// import "./TvModal.css";

export default function TvModal2() {
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
      <div className="open-trigger" onClick={openModal}>
        Enroll
      </div>

      {isOpen && (
        <div className="overlay" onClick={closeModal}>
          <div
            className={`tv-modal ${isClosing ? "tv-off" : "tv-on"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
            <div className="nameStretch">
            <div className="letta">J</div>
            <div className="letta">V</div>
            <div className="letta">L</div>
            <div className="letta">I</div>
            <div className="letta">V</div>
            <div className="letta">N</div>
            scheduler
          </div>
              <div className="close-x" onClick={closeModal}>✕</div>
            </div>

            <div className="modal-content">
             <CalendarScheduler />
             <div className="nameStretch">
            <div className="letta">J</div>
            <div className="letta">V</div>
            <div className="letta">L</div>
            <div className="letta">I</div>
            <div className="letta">V</div>
            <div className="letta">N</div>
          </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}