import React from "react";
import CalendarScheduler from "../components/general/CalendarScheduler";
import Sequence from "../components/teach/Sequence";

function Build() {
  const stepCalculator = [
    { img: "/images/jclwireframe.png", title: "1. Initial Consultation", desc: "We begin by understanding your goals, users, and technical requirements. This phase ensures alignment on scope, functionality, timelines, and success criteria before development begins." },
    { img: "/images/jvlVscode.png", title: "2. Front End Framework", desc: "We design and build a modern, responsive user interface using industry-standard frameworks. The focus is on usability, performance, and a clean experience across mobile and web platforms." },
    { img: "/images/jvlBE.png", title: "3. BackEnd Connectivity", desc: "We develop secure and scalable backend services that power your application. This includes APIs, databases, authentication, and integrations to ensure reliable data flow and system performance" },
    { img: "/images/jvlYT.png", title: "4. Feature Review and Connectivity ", desc: "We review core features and confirm system connectivity across all components. This step ensures frontend and backend features are properly integrated, functional, and aligned with application requirements." },
    { img: "/images/jvlTed.png", title: "5. Application Review & Finalization", desc: "We conduct thorough testing, optimization, and quality assurance to ensure stability, security, and functionality. Feedback is incorporated to finalize the application for production readiness." },
    { img: "/images/jvlFinal.png", title: "6. Delivery & Deployment", desc: "We deploy the application to the appropriate production environment and ensure a smooth launch. Final documentation, handoff, and post-deployment support are provided as needed." },
  ];
  return (
    <>
      <div className="introduckN">
        <div className="descriptionUpper">
          <div className="smSay">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae.
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/603/603781.png"
            alt=""
            className="logo"
          />
        </div>
      </div>
      <h2 className="howIt">How Our Process Works</h2>
      <Sequence info={stepCalculator[0]} />
      <Sequence info={stepCalculator[1]} />
      <Sequence info={stepCalculator[2]} />
      <Sequence info={stepCalculator[3]} />
      <Sequence info={stepCalculator[4]} />
      <Sequence info={stepCalculator[5]} />
      <div className="spacer"></div>
      <div className="nameStretch">
            <div className="letta">J</div>
            <div className="letta">V</div>
            <div className="letta">L</div>
            <div className="letta">I</div>
            <div className="letta">V</div>
            <div className="letta">N</div>
          </div>
          <div className="spacer"></div>
      <h2 className="csd">Featured Services </h2>
      <p className="csdp">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam,
        blanditiis? Corrupti, voluptatem.
      </p>
      <div className="dubOption">
        <div className="sumDub">
          <img
            src="https://assets-v2.lottiefiles.com/a/b2c8cb94-1173-11ee-af06-4bc14b720754/QObbydNiSu.gif"
            alt=""
            className="dubPix"
          />
          <div className="dubContent"> Free Consultation</div>
        </div>
        <div className="sumDub">
          <img
            src="https://cdn.dribbble.com/userupload/20843659/file/original-f2ed857b9a846c93de7cf4091a1dd860.gif"
            alt=""
            className="dubPix"
          />
          <div className="dubContent">Request Build Services</div>
        </div>
      </div>
      <div className="dubOption">
        <div className="sumDub">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/d5f77c104128975.5f5bdc0d6d7b6.gif"
            alt=""
            className="dubPix"
          />
          <div className="dubContent"> Existing Site Maintenance</div>
        </div>
        <div className="sumDub">
          <img
            src="https://payload.cargocollective.com/1/8/270313/8807453/ECP_VV_Business_Part_02.gif"
            alt=""
            className="dubPix"
          />
          <div className="dubContent">CMS and Agentic Tool Creation</div>
        </div>
      </div>
      <hr />
      
      
    </>
  );
}

export default Build;
