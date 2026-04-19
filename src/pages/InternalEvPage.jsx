import React, { useState } from "react";
import EventSlice from "./EventSlice";

function InternalEvPage() {
  const techEvents = [
    {
      eventName: "AWS re:Invent 2026",
      evtImage: "",
      evtDesc:
        "The largest cloud computing conference in the world, hosted by Amazon Web Services. Features 1,000+ technical sessions, hands-on workshops, keynote announcements, and the legendary re:Play networking party. Covers cloud, AI/ML, security, and DevOps.",
      evtUrl: "https://reinvent.awsevents.com",
    },
    {
      eventName: "Google I/O 2026",
      evtImage: "",
      evtDesc:
        "Google's annual developer conference featuring a livestreamed keynote, technical sessions, and on-demand content. Expected to focus on Gemini AI and other core Google products. Free online registration open to the public.",
      evtUrl: "https://io.google",
    },
    {
      eventName: "NVIDIA GTC 2026",
      evtImage: "",
      evtDesc:
        "The GPU Technology Conference in San Jose, CA (March 16–19). Brings together developers, researchers, and tech leaders to explore advances in AI, accelerated computing, deep learning, and autonomous systems. Free to paid passes available.",
      evtUrl: "https://www.nvidia.com/gtc/",
    },
    {
      eventName: "Apple WWDC 2026",
      evtImage: "",
      evtDesc:
        "Apple's Worldwide Developers Conference in Cupertino, CA (June 2026). Apple reveals updates to iOS, macOS, iPadOS, visionOS, and more, with labs and sessions alongside Apple engineers. Many sessions streamed free online.",
      evtUrl: "https://developer.apple.com/wwdc/",
    },
    {
      eventName: "MWC Barcelona 2026",
      evtImage: "",
      evtDesc:
        "Mobile World Congress (March 2–5, 2026) in Barcelona, Spain — the world's largest mobile industry event. Features major announcements in 5G/6G, IoT, AI on mobile, and smart connectivity from companies like Samsung, Huawei, and Qualcomm.",
      evtUrl: "https://www.mwcbarcelona.com/",
    },
    {
      eventName: "Web Summit 2026",
      evtImage: "",
      evtDesc:
        "One of the world's largest tech conferences (November 9–12, 2026) in Lisbon, Portugal. Attracts 70,000+ attendees including CEOs, startup founders, and investors. Covers AI, blockchain, sustainability, and e-commerce.",
      evtUrl: "https://websummit.com/",
    },
    {
      eventName: "Dell Technologies World 2026",
      evtImage: "",
      evtDesc:
        "Held May 18–21, 2026 in Las Vegas. Features breaking tech announcements, visionary keynotes, hands-on learning, and unlimited networking across cloud, AI, security, and infrastructure topics.",
      evtUrl:
        "https://www.dell.com/en-us/dt/events/delltechnologiesworld/index.htm",
    },
    {
      eventName: "AI Summit London 2026",
      evtImage: "",
      evtDesc:
        "The UK's premier AI event (June 10–11, 2026) at Tobacco Dock, London, celebrating its 10th year as part of London Tech Week. Draws 6,500+ professionals from 35+ countries with 300+ speakers from Google DeepMind, IBM, Mastercard, and more.",
      evtUrl: "https://london.theaisummit.com/",
    },
    {
      eventName: "Tech Summit Vienna 2026",
      evtImage: "",
      evtDesc:
        "Held May 20–21, 2026 in Vienna, Austria. Connects 60,000+ attendees, 500+ companies, and 400+ partners across 16 countries. Focused on AI, ML, networking, matchmaking, and thought leadership for global tech innovators and enterprise teams.",
      evtUrl: "http://techjobsfair.com/",
    },
    {
      eventName: "Grace Hopper Celebration 2026",
      evtImage: "",
      evtDesc:
        "The world's largest gathering of women technologists at the Anaheim Convention Center in Southern California. Features a massive career fair with Google, Microsoft, Amazon, Meta, and hundreds of other companies, plus technical talks, workshops, and keynotes.",
      evtUrl: "https://ghc.anitab.org/",
    },
    {
      eventName: "New York Tech Career Fair 2026",
      evtImage: "",
      evtDesc:
        "A virtual exclusive tech hiring event (April 24, 2026) hosted by Tech Career Fair. Connects job seekers with fast-growing startups and Fortune 500 companies. Focused on diversity and inclusion with roles spanning software engineering, data science, and IT.",
      evtUrl:
        "https://www.eventbrite.com/e/new-york-tech-career-fair-exclusive-tech-hiring-event-tickets-146584912419",
    },
    {
      eventName: "Georgia Tech Spring SEC & ACC Virtual Career Fair 2026",
      evtImage: "",
      evtDesc:
        "A virtual career fair on April 22, 2026 (10 AM – 5 PM) hosted by Georgia Tech, open to students across SEC and ACC universities. Connects candidates with employers via the Career Eco platform.",
      evtUrl: "https://careerfair.gatech.edu/upcoming-career-fairs/",
    },
    {
      eventName: "Amsterdam Tech Job Fair 2026",
      evtImage: "",
      evtDesc:
        "TechMeetups' in-person tech job fair on March 26, 2026 (6–9 PM) in Amsterdam. Part of a Europe-wide series connecting tech professionals with employers across software, engineering, and product roles.",
      evtUrl: "https://techmeetups.com/product-category/other/tech-job-fair/",
    },
    {
      eventName: "Dublin Tech Job Fair 2026",
      evtImage: "",
      evtDesc:
        "TechMeetups' in-person tech job fair on June 4, 2026 (6–9 PM) in Dublin, Ireland. Connects local and international tech talent with companies hiring across engineering, development, and IT.",
      evtUrl: "https://techmeetups.com/product-category/other/tech-job-fair/",
    },
    {
      eventName: "CareerEco STEM Virtual Career Fair 2026",
      evtImage: "",
      evtDesc:
        "A well-organized virtual career fair connecting STEM job seekers with employers and graduate programs. Held February 10, 2026, with additional dates throughout the year. Free for job seekers, featuring real-time recruiter chats and interview scheduling.",
      evtUrl: "https://www.careereco.com/",
    },
    {
      eventName: "HackerX Tech Job Fairs 2026",
      evtImage: "",
      evtDesc:
        "Exclusive, invite-only tech job fairs held in 50+ cities worldwide. Only pre-vetted candidates are admitted and all participating companies are actively hiring. Ideal for software engineers, developers, and tech professionals at all levels.",
      evtUrl: "https://hackerx.org/",
    },
  ];
  return (
    <>
      
      <div className="defaultEvt">
        {techEvents.map((thingToDo) => {
          return (
            <>
              <EventSlice obj={thingToDo} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default InternalEvPage;
