import React from "react";
import CalendarScheduler from "../components/general/CalendarScheduler";
import Sequence from "../components/teach/Sequence";
import Contractor from "../components/build/Contractor";
import TestimonialsQueue from "../components/build/TestimonialsStack";
import MajorModelXP from "../components/teach/MajorModelXP";
import Bookmark from "./Bookmark";
import Recruit from "./Recruit";
function Build() {
  const stepCalculator = [
    {
      img: "/images/jclwireframe.png",
      title: " Initial Consultation",
      desc: "We begin by understanding your goals, users, and technical requirements. This phase ensures alignment on scope, functionality, timelines, and success criteria before development begins.",
    },
    {
      img: "/images/jvlVscode.png",
      title: " Front End Framework",
      desc: "We design and build a modern, responsive user interface using industry-standard frameworks. The focus is on usability, performance, and a clean experience across mobile and web platforms.",
    },
    {
      img: "/images/jvlBE.png",
      title: " BackEnd Connectivity",
      desc: "We develop secure and scalable backend services that power your application. This includes APIs, databases, authentication, and integrations to ensure reliable data flow and system performance",
    },
    {
      img: "/images/jvlYT.png",
      title: " Feature Review and Connectivity ",
      desc: "We review core features and confirm system connectivity across all components. This step ensures frontend and backend features are properly integrated, functional, and aligned with application requirements.",
    },
    {
      img: "/images/jvlTed.png",
      title: " Application Review & Finalization",
      desc: "We conduct thorough testing, optimization, and quality assurance to ensure stability, security, and functionality. Feedback is incorporated to finalize the application for production readiness.",
    },
    {
      img: "/images/jvlFinal.png",
      title: " Delivery & Deployment",
      desc: "We deploy the application to the appropriate production environment and ensure a smooth launch. Final documentation, handoff, and post-deployment support are provided as needed.",
    },
  ];
  return (
    <>
      {/* <h2 className="howIt">How Our Process Works</h2> */}
      <Sequence info={stepCalculator[0]} />
      <Sequence info={stepCalculator[1]} />
      <Sequence info={stepCalculator[2]} />
      <Sequence info={stepCalculator[3]} />
      <Sequence info={stepCalculator[4]} />
      <Sequence info={stepCalculator[5]} />
      <div className="spacer"></div>

      <div className="spacer"></div>

      <div className="relaxer"></div>

      <Bookmark name={"Collaboration& Recruitment"} />
      <MajorModelXP />
      <br />

      <Bookmark name={"Event Finder"} />
      <Contractor />
    </>
  );
}

export default Build;
