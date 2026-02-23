import React from "react";
import Namespace from "../components/general/Namespace";
import Contractor from "../components/build/Contractor";
import  FlashCard  from "../components/build/FlashCard";
function Contact() {
  const allCardInfo = [
    {
      title: "Tech Consultation",
      image: "https://img1.wsimg.com/isteam/ip/d67a79b6-be4e-4bfa-a483-a3a9eecac97e/blacksinaijpeg.jpeg",
      features: [
        "60-minute strategy session focused on startup growth",
        "Tech stack recommendations based on budget",
        "Scalability roadmap for future expansion",
        "Basic security and infrastructure review",
        "Startup automation recommendations",
        "Action plan summary delivered within 48 hours",
      ],
      pricing: "Starting at $75 per session",
    },
    {
      title: "Web Development",
      image: "https://img.freepik.com/premium-photo/computer-programmer-software-development-engineer-team-two-african-american-young-people-man-woman-working-together-office-writing-code-computer-sitting-desk_1178410-5025.jpg",
      features: [
        "Custom responsive website (mobile-first design)",
        "Modern React-based frontend build",
        "Basic backend/API integration",
        "SEO-ready structure",
        "Speed optimization",
        "Deployment assistance + launch support",
      ],
      pricing: "Starter Package: $1,200 – $3,000",
    },
    {
      title: "Content Management Architecture",
      image: "https://cdn9.dissolve.com/p/D1293_620_007/D1293_620_007_0004_600.jpg",
      features: [
        "CMS setup (Headless or traditional)",
        "Structured content modeling",
        "Admin role configuration",
        "Content workflow optimization",
        "Automation integrations (when applicable)",
        "Basic team training session",
      ],
      pricing: "Startup Package: $1,000 – $2,500",
    },
    {
      title: "Tutorial ",
      image: "https://baltimoretimes-online.com/wp-content/uploads/2024/02/two_kids_computing.jpg",
      features: [
        "1-on-1 coding mentorship",
        "Hands-on project guidance",
        "Real-world development walkthroughs",
        "Session recordings available",
        "Homework + feedback review",
        "Career path guidance",
      ],
      pricing: "$40 – $65 per hour",
    },
    {
      title: "Instructor ",
      image: "https://i0.wp.com/wordinblack.com/wp-content/uploads/2023/11/Ruha.Benjamin.Illustration.jpg?fit=1920%2C1316&ssl=1",
      features: [
        "Custom curriculum development",
        "Live virtual instruction",
        "Interactive coding labs",
        "Workshop facilitation",
        "Beginner-to-advanced level training",
        "Post-session learning resources",
      ],
      pricing: "Half-Day Workshop: $800 – $1,500",
    },
    {
      title: "Brand Redevelopment",
      image: "/images/brand-redevelopment.jpg",
      features: [
        "Brand identity refresh",
        "Logo refinement or redesign",
        "Color palette + typography system",
        "Website visual strategy alignment",
        "Messaging clarity improvement",
        "Mini brand guideline document",
      ],
      pricing: "Growth Package: $1,500 – $3,500",
    },
  ];
  return (
    <>
      <div className="introduckN">
        <div className="descriptionUpper">
          <div className="smSay">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae.
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/65/65000.png"
            alt=""
            className="logo"
          />
        </div>
      </div>

      <img src="/images/jvlMantra.png" alt="" className="jvlShowcase" />
      <Namespace />

      <h2 style={{color:"navy"}}>Our Services At a Glance</h2>

      <div className="flashMeContainer">
        {allCardInfo.map((crd, i) => {
          return (
            <div key={i}>
              <FlashCard obj={crd} />
            </div>
          );
        })}
      </div>
      <Contractor />
    </>
  );
}

export default Contact;
