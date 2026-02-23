import React, { useState } from "react";
import Bulletpoint from "./Bulletpoint";
import FaceCard from "./FaceCard";

/**
 * FlashCard
 * - Click to flip like a study flash card.
 * - No UI libraries, no Tailwind.
 *
 * Usage:
 * <FlashCard
 *   front={<div>Question: What is n8n?</div>}
 *   back={<div>Answer: An automation workflow tool...</div>}
 *   width={360}
 *   height={220}
 * />
 */
export function FlashCard({
  obj,
  front,
  back,
  width = "400px",
  height = "500px",
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
          display: inline-block;
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
          display: block;
          align-items: center;
          justify-content: center;
          padding: 18px;
          box-sizing: border-box;
        }

        .fc-front {
          /* default front styling (customize via your front content) */
        }

        .fc-back {
          transform: rotateY(180deg);
        }

        /* Keyboard focus ring */
        .fc-card:focus-visible {
          box-shadow: 0 0 0 3px rgba(90, 160, 255, 0.85);
        }

        /* Reduced motion */
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
          height,
          borderRadius,
          ...style,
        }}
      >
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
            <>
              {/* Create Front Structure */}
              <FaceCard obj={obj} />
            </>
          </div>

          <div
            className="fc-face fc-back"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.12)",
              boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
            }}
          >
            {/* Create Back Structure */}
            <>
              <h4>Included Service Features: </h4>
              {obj.features.map((feat) => {
                return (
                  <>
                    <Bulletpoint txt={feat} />
                  </>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

/** Example */
export default function FlashCardDemo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f5f7fb",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <FlashCard
        width={380}
        height={240}
        front={
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: 1, opacity: 0.7 }}>
              FRONT
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>
              What is n8n?
            </div>
            <div style={{ marginTop: 10, opacity: 0.8 }}>
              Click to reveal the answer
            </div>
          </div>
        }
        back={
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: 1, opacity: 0.7 }}>
              BACK
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>
              An open-source workflow automation tool
            </div>
            <div style={{ marginTop: 10, opacity: 0.85 }}>
              Connect apps + APIs, automate tasks, self-host it.
            </div>
          </div>
        }
      />
    </div>
  );
}
