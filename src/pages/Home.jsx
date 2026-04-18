import { React, useState } from "react";
import TextAside from "../components/general/TextAside";
import TestimonialsQueue from "../components/build/TestimonialsStack";
import CalendarScheduler from "../components/general/CalendarScheduler";
import Events from "./Events";
import Contractor from "../components/build/Contractor";
import Bookmark from "./Bookmark";
import MajorModelXP from "../components/teach/MajorModelXP";
import AlsoHome from "./AlsoHome";
function Home() {
  const [currentInfo, setCurrentInfo] = useState(null);
  return (
    <>

      <div className="quadMaster">
        <div className="qp">
          <div
            className="quad"
            onClick={() => {
              setCurrentInfo("929.233.2109");
            }}
          >
            Contact
          </div>
          <div
            className="quad"
            onClick={() => {
              setCurrentInfo("NYC . ATL . OAK . DAL");
            }}
          >
            Locations
          </div>
        </div>
        <div className="hiddenOne">{currentInfo}</div>
        <div className="qp">
          <div
            className="quad"
            onClick={() => {
              setCurrentInfo(
                "Empower Our Clients By Providing Lasting Tech Solutions"
              );
            }}
          >
            Mission
          </div>
          <div
            className="quad"
            onClick={() => {
              setCurrentInfo(
                "Creating Global Community Initiatives for Inspiring Entreprenuers"
              );
            }}
          >
            Vision
          </div>
        </div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1717701505819-9722f6c92bc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="newOne"
      />
      <h3 className="sampleTxt">
        We believe technology should empower, not exclude.
      </h3>

      <p className="brandMani">
        {" "}
        Our mission is to build impactful applications and deliver practical,
        high-quality education that equips people from all backgrounds to thrive
        in the digital economy. We focus on real skills, real tools, and real
        outcomes—creating clear pathways to opportunity, ownership, and
        long-term growth.
      </p>
      <img
        src="https://images.pexels.com/photos/35088939/pexels-photo-35088939.jpeg?cs=srgb&dl=pexels-akoonie-35088939.jpg&fm=jpg"
        alt=""
        className="newOne"
      />
      <h3 className="sampleTxt">
        Our vision is a future where creative technologists are leaders,
        creators, and owners in technology—shaping innovation and defining
        what’s next.
      </h3>
      <img
        src="https://img.freepik.com/premium-photo/showcasing-technology-integration-diverse-settings_1161356-31043.jpg?semt=ais_hybrid&w=740&q=80"
        alt=""
        className="newOne"
      />

      <p className="brandMani">
        A future where access is equitable, talent is recognized, and potential
        is fully realized. We build with purpose. We teach with intention. We
        value excellence, ownership, and learning by doing. This is more than
        technology. It’s about closing gaps, creating access, and building
        lasting impact.
      </p>
      <img
        src="https://media.istockphoto.com/id/2198117851/photo/digital-overload-and-its-impact-on-the-human-brain-showcasing-fragmented-thoughts-information.jpg?s=612x612&w=0&k=20&c=BPuv9nXpOkB8fDtXHyf53wlywGTvMjRw5w5U14yoemY="
        alt=""
        className="newOne"
      />
      {/* <Contractor /> */}
    </>
  );
}

export default Home;
