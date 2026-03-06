import React, { useMemo, useState } from "react";
import './RippableFlyerCarousel.css'
const defaultFlyers = [
    {
      id: 1,
      accent: "lightgrey",
      pinColor: "#f59e0b",
      tag: "LIVE VIRTUAL EVENT",
      eyebrow: "WEB STRATEGY • STARTUP EXECUTION • Q&A",
      title: "Build A Service Website That Actually Converts",
      subtitle:
        "Join a live online workshop focused on turning service ideas into a clean, convincing web presence that makes people want to book.",
      price: "Free RSVP",
      details: [
        "Live walkthrough of flyer-to-landing-page strategy",
        "How to structure offers so visitors understand them fast",
        "Interactive Q&A for freelancers, founders, and creators",
      ],
      contact: "Reserve your virtual seat",
      location: "Online Event • Live Tutorial Room",
      cta: "Attend The Live Build Session",
    },
    {
      id: 2,
      accent: "lightgrey",
      pinColor: "#f59e0b",
      tag: "ONLINE TUTORIAL",
      eyebrow: "REACT UI • OFFER DESIGN • PRACTICAL DEMO",
      title: "Design Better React Service Components In Real Time",
      subtitle:
        "Watch a virtual coding session where we break down how to create polished promotional components that feel modern, clickable, and client-ready.",
      price: "Live Access",
      details: [
        "Real-time component breakdown with simple explanations",
        "How to make visuals feel premium without overcomplicating code",
        "Practical ideas you can reuse in your own projects immediately",
      ],
      contact: "Join the tutorial livestream",
      location: "Virtual Workshop • Screen Share Session",
      cta: "Step Inside The Coding Session",
    },
    {
      id: 3,
      accent: "lightgrey",
      pinColor: "#f59e0b",
      tag: "VIRTUAL ROUNDTABLE",
      eyebrow: "FREELANCING • CLIENT OUTREACH • DIGITAL POSITIONING",
      title: "Win More Clients With Smarter Service Presentation",
      subtitle:
        "Take part in a virtual discussion and tutorial experience focused on packaging your skills, improving your message, and increasing client interest online.",
      price: "Open Registration",
      details: [
        "Roundtable discussion on real-world freelancing approaches",
        "How to present services with more confidence and clarity",
        "Live suggestions on messaging, positioning, and next steps",
      ],
      contact: "Claim your registration spot",
      location: "Virtual Event • Online Community Session",
      cta: "Register For The Next Session",
    },
  ];

function getSlideStyles(direction, phase) {
  if (phase === "enter") {
    return {
      transform: `translateX(${direction > 0 ? 80 : -80}px) rotate(${direction > 0 ? 4 : -4}deg) scale(0.96)`,
      opacity: 0,
      clipPath:
        direction > 0
          ? "polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 90%)"
          : "polygon(0 0, 100% 0, 88% 100%, 0 100%, 0 90%)",
      filter: "blur(3px)",
    };
  }

  if (phase === "exit") {
    return {
      transform: `translateX(${direction > 0 ? -220 : 220}px) translateY(12px) rotate(${direction > 0 ? -10 : 10}deg) scale(0.98)`,
      opacity: 0,
      clipPath:
        direction > 0
          ? "polygon(0 0, 100% 0, 84% 100%, 0 92%)"
          : "polygon(16% 0, 100% 0, 100% 92%, 0 100%)",
      filter: "blur(2px)",
    };
  }

  return {
    transform: "translateX(0px) rotate(0deg) scale(1)",
    opacity: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    filter: "blur(0px)",
  };
}

function TearEdge({ side = "left" }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        width: 8 + ((i * 7) % 11),
        height: 10 + ((i * 5) % 12),
      })),
    []
  );

  return (
    <div className={`tear-edge tear-edge--${side}`}>
      {pieces.map((piece, idx) => (
        <span
          key={piece.id}
          className="tear-edge__piece"
          style={{
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            marginLeft: side === "left" ? `${idx % 2 === 0 ? 0 : 6}px` : "auto",
            marginRight: side === "right" ? `${idx % 2 === 0 ? 0 : 6}px` : "auto",
            transform: `rotate(${side === "left" ? -1 : 1 * (idx % 3)}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function FlyerCard({ flyer }) {
  return (
    <div className="rf-wrap">
      <div className="rf-pin" />
      <div className="rf-shadow" />

      <div className="rf-card">
        <TearEdge side="left" />
        <TearEdge side="right" />

        <div className="rf-header" style={{ background: flyer.accent }}>
          <div className="rf-tag">{flyer.tag}</div>
          <div className="rf-badge" style={{ backgroundColor: flyer.pinColor }}>
            <span style={{ fontSize: "1.5rem", lineHeight: .8 }}>✦</span>
          </div>
          <p className="rf-eyebrow">{flyer.eyebrow || "Community Flyer"}</p>
          <h2 className="rf-title">{flyer.title}</h2>
          <p className="rf-subtitle">{flyer.subtitle}</p>
        </div>

        <div className="rf-body">
          <div className="rf-priceRow">
            <div>
              <p className="rf-label">Starting At</p>
              <p className="rf-price">{flyer.price}</p>
            </div>
            <div className="rf-locationWrap">
              <div className="rf-location">
                <span aria-hidden="true">📍</span>
                {flyer.location}
              </div>
            </div>
          </div>

          <div className="rf-details">
            {flyer.details.map((item) => (
              <div key={item} className="rf-detailItem">
                <span className="rf-detailDot" />
                <p className="rf-detailText">{item}</p>
              </div>
            ))}
          </div>

          <div className="rf-contactBox">
            <div className="rf-contactRow">
              <p className="rf-contactLabel">Contact</p>
              <p className="rf-contactText">
                <span aria-hidden="true">☎</span>
                {flyer.contact}
              </p>
            </div>
          </div>

          <div className="rf-ctaWrap">
            <p className="rf-cta">{flyer.cta}</p>
          </div>

          <div className="rf-bottomFade" />
        </div>
      </div>
    </div>
  );
}

export default function RippableFlyerCarousel({
  flyers = defaultFlyers,
  title = "Live / Virtual Event Calendar",
  subtitle = "",
  posterLabel = "Open To The Public",
}) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [renderedFlyer, setRenderedFlyer] = useState(flyers[0]);
  const [animationStyles, setAnimationStyles] = useState(getSlideStyles(0, "center"));

  const paginate = (nextDirection) => {
    if (isAnimating || flyers.length <= 1) return;

    const nextIndex = (index + nextDirection + flyers.length) % flyers.length;
    const nextFlyer = flyers[nextIndex];

    setIsAnimating(true);
    setAnimationStyles({
      ...getSlideStyles(nextDirection, "exit"),
      transition: "transform 450ms cubic-bezier(0.4, 0, 0.2, 1), opacity 450ms ease, clip-path 450ms ease, filter 450ms ease",
    });

    window.setTimeout(() => {
      setRenderedFlyer(nextFlyer);
      setIndex(nextIndex);
      setAnimationStyles({
        ...getSlideStyles(nextDirection, "enter"),
        transition: "none",
      });

      window.setTimeout(() => {
        setAnimationStyles({
          ...getSlideStyles(nextDirection, "center"),
          transition: "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease, clip-path 550ms ease, filter 550ms ease",
        });

        window.setTimeout(() => {
          setIsAnimating(false);
        }, 560);
      }, 25);
    }, 460);
  };

  return (
    <>
      <div className="rf-shell">
        <div className="rf-container">
          <div className="rf-intro">
            <p className="rf-posterLabel">{posterLabel}</p>
            <h1 className="rf-mainTitle">{title}</h1>
            <p className="rf-mainSubtitle">{subtitle}</p>
          </div>

          <div className="rf-stage">
            <div className="rf-slideLayer" style={animationStyles}>
              <FlyerCard flyer={renderedFlyer} />
            </div>
          </div>

          <div className="rf-controls">
            <button
              onClick={() => paginate(-1)}
              className="rf-button"
              disabled={isAnimating}
            >
              <span aria-hidden="true">←</span>
              Prev
            </button>

            <div className="rf-dots">
              {flyers.map((flyer, dotIndex) => (
                <button
                  key={flyer.id}
                  aria-label={`Go to flyer ${dotIndex + 1}`}
                  onClick={() => {
                    if (dotIndex === index) return;
                    paginate(dotIndex > index ? 1 : -1);
                  }}
                  className={`rf-dot ${dotIndex === index ? "rf-dot--active" : ""}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="rf-button"
              disabled={isAnimating}
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
