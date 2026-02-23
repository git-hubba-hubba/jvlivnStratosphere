import { React, useState } from "react";
import TextAside from "../components/general/TextAside";
import TestimonialsQueue from '../components/build/TestimonialsStack'
import CalendarScheduler from '../components/general/CalendarScheduler'

function Home() {
  const [currentInfo, setCurrentInfo] = useState(null);
  return (
    <>
      <div className="introduckN">
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
        high-quality education that equips melanated people to thrive in the
        digital economy. We focus on real skills, real tools, and real
        outcomes—creating pathways to opportunity, ownership, and growth.
      </p>
      <img
        src="https://plus.unsplash.com/premium_photo-1681400156787-e4afe6e6949a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZyZWUlMjBhYnN0cmFjdCUyMGFydCUyMGltYWdlcyUyMHRvJTIwdXNlfGVufDB8fDB8fHww"
        alt=""
        className="stretchImg"
      />
      <h3 className="sampleTxt">
        Our vision is a future where melanated people are leaders, creators, and
        owners in technology—shaping innovation and defining what’s next.
      </h3>
      <img
        src="https://images.unsplash.com/photo-1504364269860-8be73aabdff2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTAyNjU3fHxlbnwwfHx8fHw%3D"
        alt=""
        className="stretchImg"
      />

      <p className="brandMani">
        A future where access is equitable, talent is recognized, and potential
        is fully realized. We build with purpose. We teach with intention. We
        value excellence, ownership, and learning by doing. This is more than
        technology. It’s about closing gaps, creating access, and building
        lasting impact.
      </p>
      <img
        src="https://images.unsplash.com/photo-1523396390901-d71118bed9b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD"
        alt=""
        className="stretchImg"
      />
      <h3 className="sampleTxt">
        We exist to ensure melanated communities don’t just participate in the
        future of tech—but lead it.
      </h3>

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
     

      <h2>Reviews & Testimonials</h2>
      <TestimonialsQueue />
      <img
        src="https://img.freepik.com/free-photo/friendly-carefree-happy-goodlooking-tall-african-american-female-model-with-curly-hairstyle-hold_1258-139746.jpg?semt=ais_hybrid&w=740&q=80"
        alt=""
        className="fillerPic"
      />
      <h2>Service Guarantee</h2>
      <p className="gserv">
        We guarantee that every course and learning experience we deliver is
        built on high-quality lesson planning, thorough research, and real-world
        industry relevance. Our curriculum is intentionally designed using
        current technologies, proven methodologies, and best practices aligned
        with today’s tech landscape. Each lesson is carefully structured to
        ensure clarity, progression, and practical application—so students
        aren’t just learning concepts, but developing skills they can
        immediately use in professional environments. We continuously review and
        refine our materials to reflect evolving tools, standards, and employer
        expectations. Our commitment is simple: if you engage with our program,
        you will receive instruction that is intentional, well-researched, and
        aligned with the skills demanded by the modern technology industry.
      </p>

      <hr />
    </>
  );
}

export default Home;
