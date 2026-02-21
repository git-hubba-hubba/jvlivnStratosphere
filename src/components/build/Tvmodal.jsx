import { useState } from "react";
// import "./TvModal.css";

export default function TvModal() {
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
        Open Modal
      </div>

      {isOpen && (
        <div className="overlay" onClick={closeModal}>
          <div
            className={`tv-modal ${isClosing ? "tv-off" : "tv-on"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Modal Title</h2>
              <div className="close-x" onClick={closeModal}>✕</div>
            </div>

            <div className="modal-content">
              {Array.from({ length: 30 }).map((_, i) => (
                <p key={i}>
                  This is scrollable modal content. Line {i + 1}.
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}