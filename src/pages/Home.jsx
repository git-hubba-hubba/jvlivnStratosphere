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
      <div className="introduckN">
        <Bookmark name={"About Us"} />
        <div className="descriptionUpper">
          <div className="smSay">
            Learn about who we are and what we seek to accomplish.
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/256/25/25694.png"
            alt=""
            className="logo"
          />
        </div>
      </div>

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
        src="https://ai.gatech.edu/sites/default/files/2024-11/Header-Graphic-gif-V3.gif"
        alt=""
        className="stretchImg"
      />
      <h3 className="sampleTxt">
        Our vision is a future where creative technologists are leaders,
        creators, and owners in technology—shaping innovation and defining
        what’s next.
      </h3>

      <p className="brandMani">
        A future where access is equitable, talent is recognized, and potential
        is fully realized. We build with purpose. We teach with intention. We
        value excellence, ownership, and learning by doing. This is more than
        technology. It’s about closing gaps, creating access, and building
        lasting impact.
      </p>
      <img src="" alt="" className="stretchImg" />

      

      {/* <Contractor /> */}
    </>
  );
}

export default Home;
