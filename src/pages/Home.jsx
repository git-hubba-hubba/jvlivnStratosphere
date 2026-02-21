import { React, useState } from "react";
import TextAside from "../components/general/TextAside";

function Home() {
  const [currentInfo, setCurrentInfo] = useState(null);
  return (
    <>
      <div className="introduckN">
        <div className="descriptionUpper">
          <div className="smSay">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae.
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
              setCurrentInfo("929.269.9227");
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
                "Creating Kommunity & Initiatives for Melanated Entreprenuers"
              );
            }}
          >
            Vision
          </div>
        </div>
      </div>
      <div className="nameStretch">
        <div className="letta">J</div>
        <div className="letta">V</div>
        <div className="letta">L</div>
        <div className="letta">I</div>
        <div className="letta">V</div>
        <div className="letta">N</div>
      </div>
      <img
        src="https://blog.tshirt-factory.com/wp-content/uploads/2015/01/d7mfkhccyynbwpvtwm4e.jpg"
        alt=""
        className="newOne"
      />

      


      <h3 className="sampleTxt">
        We believe technology should empower, not exclude.
      </h3>
      <p className="brandMani"> Our mission is to build impactful applications and deliver practical,
        high-quality education that equips melanated people to thrive in the
        digital economy. We focus on real skills, real tools, and real
        outcomes—creating pathways to opportunity, ownership, and growth.</p>
        <img src="https://dirtypilot.com/cdn/shop/products/SEEN_YellowGreen_1024x1024.jpeg?v=1571265476" alt="" className="stretchImg" />
        <h3 className="sampleTxt">
          Our vision is a future where melanated people are leaders, creators,
          and owners in technology—shaping innovation and defining what’s next.</h3>
          <img src="https://www.singulart.com/images/artworks/v2/cropped/11283/main/base/918927_cd2b0cae3fa3f677f37f3a36dd13210d.jpeg" alt="" className="stretchImg" />
        
          <p className="brandMani">A future where access is equitable, talent is recognized, and potential
        is fully realized. We build with purpose. We teach with intention. We
        value excellence, ownership, and learning by doing. This is more than
        technology. It’s about closing gaps, creating access, and building
        lasting impact.</p>
        <img src="https://dirtypilot.com/cdn/shop/products/SEEN_Bubble_Blue_Drawing_eff776ab-1db7-4c4d-8b67-231a67c6920b_1024x1024.jpg?v=1571265902" alt="" className="stretchImg" />
        <h3 className="sampleTxt">
          We exist to ensure melanated communities don’t just participate in the
          future of tech—but lead it.
        </h3>
      
     
    </>
  );
}

export default Home;
