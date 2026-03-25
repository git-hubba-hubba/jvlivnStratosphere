import React, { useState } from "react";
import Bulletpoint from "./Bulletpoint";
import FaceCard from "./FaceCard";

/**
 * FlashCard
 * Responsive version:
 * - Scales to parent width
 * - Uses maxWidth instead of hard fixed width
 * - Keeps consistent card proportions with aspect-ratio
 * - Handles smaller screens more cleanly
 *
 * Usage:
 * <FlashCard obj={item} />
 *
 * Optional:
 * <FlashCard
 *   obj={item}
 *   width="100%"
 *   maxWidth="400px"
 *   aspectRatio="400 / 450"
 * />
 */
export function FlashCard({
  obj,
  front,
  back,
  width = "70%",
  maxWidth = "500px",
  minHeight = "320px",
  aspectRatio = "300 / 350",
  borderRadius = 22,
  durationMs = 600,
  perspective = 1000,
  className = "",
  style = {},
  defaultFlipped = false,
  onFlip,
}) {
  const [flipped, setFlipped] = useState(defaultFlipped);

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    onFlip?.(next);
  };

  return (
    <>
      <style>{`
        .fc-scene {
          perspective: ${perspective}px;
          display: block;
          width: 100%;
          max-width: 100%;
        }

        .fc-card-wrap {
          position: relative;
          width: 100%;
          max-width: 100%;
          min-height: ${minHeight};
          aspect-ratio: ${aspectRatio};
        }

        .fc-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform ${durationMs}ms cubic-bezier(.2,.9,.2,1);
          cursor: pointer;
          user-select: none;
          outline: none;
        }

        .fc-card.fc-flipped {
          transform: rotateY(180deg);
        }

        .fc-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: inherit;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding: clamp(12px, 2vw, 18px);
        }

        .fc-front {
        }

        .fc-back {
          transform: rotateY(180deg);
          overflow-y: auto;
        }

        .fc-card:focus-visible {
          box-shadow: 0 0 0 3px rgba(90, 160, 255, 0.85);
        }

        .fc-back h4,
        .fc-back h2 {
          margin: 0 0 12px 0;
        }

        .fc-back h2 {
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .fc-card-wrap {
            min-height: 300px;
          }
        }

        @media (max-width: 540px) {
          .fc-card-wrap {
            min-height: 280px;
          }

          .fc-face {
            padding: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fc-card {
            transition: none;
          }
        }
      `}</style>

      <div
        className={`fc-scene ${className}`}
        style={{
          width,
          maxWidth,
          borderRadius,
          margin: "0 auto",
          ...style,
        }}
      >
        <div className="fc-card-wrap" style={{ borderRadius }}>
          <div
            className={`fc-card ${flipped ? "fc-flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label="Flip card"
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            style={{ borderRadius }}
          >
            <div
              className="fc-face fc-front"
              style={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.12)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
                color: "navy",
              }}
            >
              {front || <FaceCard obj={obj} />}
            </div>

            <div
              className="fc-face fc-back"
              style={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.12)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
              }}
            >
              {back || (
                <>
                  <h4>Included Service Features:</h4>
                  {obj.features?.map((feat, i) => (
                    <div key={i}>
                      <Bulletpoint txt={feat} />
                    </div>
                  ))}
                  <h4>{obj.pricing}</h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}