import React from "react";
import Subject from "../components/teach/Subject";
import Bookmark from "./Bookmark";

function Learn() {
  const subjects = [
    {
      img: "https://n8n.io/brandguidelines/dont/vertical-align.png",
      subName: "Agentic Sys Development",
      subDesc:
        "Unlock the power of automation with n8n, the open-source workflow automation tool that lets you connect apps, APIs, and databases with ease. In this hands-on course, you’ll learn how to design, build, and deploy scalable automation workflows without relying on expensive SaaS tools.",
      syllabusDesc: [
        "Introduction to n8n & workflow automation",
        "Understanding nodes, triggers, and executions",
        "API integrations & webhooks",
        "Data transformation & logic flows",
        "Connecting databases and external services",
        "Building agentic workflows with AI integrations",
        "Error handling & workflow optimization",
        "Deploying and scaling automation systems"
      ]
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/960px-Unofficial_JavaScript_logo_2.svg.png",
      subName: "JavaScript Programming",
      subDesc:
        "Teach core to advanced JavaScript concepts including variables, functions, ES6+, asynchronous programming, APIs, and real-world problem solving used in modern web applications.",
      syllabusDesc: [
        "Variables, data types, and operators",
        "Functions and scope",
        "Control flow (loops & conditionals)",
        "Arrays and objects",
        "DOM manipulation",
        "ES6+ features (arrow functions, destructuring)",
        "Asynchronous JavaScript (callbacks, promises, async/await)",
        "Working with APIs and JSON"
      ]
    },
    {
      img: "https://designoweb.s3.eu-north-1.amazonaws.com/technologies/mern.webp",
      subName: "Full-Stack Web Development (MERN)",
      subDesc:
        "Hands-on instruction in building full-stack applications using MongoDB, Express, React, and Node.js, covering frontend UI, backend APIs, authentication, and deployment.",
      syllabusDesc: [
        "Overview of MERN stack architecture",
        "Building frontend with React",
        "Creating REST APIs with Node.js & Express",
        "MongoDB database design & queries",
        "Authentication & authorization (JWT)",
        "Connecting frontend to backend",
        "CRUD operations in full-stack apps",
        "Deployment and hosting strategies"
      ]
    },
    {
      img: "https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png",
      subName: "React Development",
      subDesc:
        "Focused training on React fundamentals and advanced concepts such as hooks, state management, component architecture, and building scalable, production-ready user interfaces.",
      syllabusDesc: [
        "React fundamentals & component structure",
        "JSX and rendering techniques",
        "Props and state management",
        "React Hooks (useState, useEffect, custom hooks)",
        "Routing with React Router",
        "Component reusability & architecture",
        "Performance optimization techniques",
        "Building production-ready UI applications"
      ]
    },
    {
      img: "https://images.credly.com/images/51aeb74b-ec87-4069-93fc-0ea449c8d77f/twitter_thumb_201604_node.png",
      subName: "Backend Development with Node.js",
      subDesc:
        "Teach server-side development using Node.js and Express, including REST APIs, middleware, authentication, database integration, and secure application design.",
      syllabusDesc: [
        "Introduction to Node.js runtime",
        "Express.js fundamentals",
        "Building RESTful APIs",
        "Middleware and routing",
        "Database integration (MongoDB/SQL)",
        "Authentication & authorization",
        "Error handling & logging",
        "Securing backend applications"
      ]
    },
    {
      img: "https://img.freepik.com/premium-vector/cyber-security-logo-icon-symbol-vector-illustration-modern-cyber-security-logo_1123785-4541.jpg",
      subName: "Cybersecurity Fundamentals",
      subDesc:
        "Introduction to cybersecurity concepts including threat models, vulnerabilities, attacks, defensive strategies, and foundational security principles aligned with Security+ objectives.",
      syllabusDesc: [
        "Introduction to cybersecurity concepts",
        "Types of threats and vulnerabilities",
        "Network security fundamentals",
        "Encryption and cryptography basics",
        "Risk management and mitigation",
        "Security frameworks and compliance",
        "Incident response basics",
        "Security best practices"
      ]
    },
    {
      img: "https://www.oreilly.com/api/v2/epubs/urn:orm:book:9781492069485/files/images/page212.jpg",
      subName: "Ethical Hacking & Penetration Testing Basics",
      subDesc:
        "Introductory penetration testing concepts including reconnaissance, scanning, vulnerability assessment, and ethical hacking methodologies using tools like Kali Linux.",
      syllabusDesc: [
        "Introduction to ethical hacking",
        "Reconnaissance and information gathering",
        "Scanning networks and systems",
        "Vulnerability assessment techniques",
        "Exploitation fundamentals",
        "Using tools like Kali Linux",
        "Reporting and documentation",
        "Legal and ethical considerations"
      ]
    },
    {
      img: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png",
      subName: "Cloud Computing Fundamentals",
      subDesc:
        "Cover cloud concepts including IaaS, PaaS, SaaS, virtualization, identity and access management, and core Azure fundamentals for beginners.",
      syllabusDesc: [
        "Introduction to cloud computing concepts",
        "IaaS, PaaS, SaaS models",
        "AWS core services (EC2, S3, IAM)",
        "Virtualization and cloud architecture",
        "Identity and access management",
        "Deploying applications to the cloud",
        "Monitoring and scaling resources",
        "Cloud security fundamentals"
      ]
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      subName: "Technical Interview & Coding Prep",
      subDesc:
        "Prepare students for technical interviews with coding challenges, data structures, algorithms, problem-solving strategies, and real-world engineering scenarios.",
      syllabusDesc: [
        "Data structures (arrays, stacks, queues, trees)",
        "Algorithms (sorting, searching)",
        "Problem-solving strategies",
        "Coding challenge practice",
        "Time and space complexity (Big O)",
        "Whiteboard and mock interviews",
        "System design basics",
        "Behavioral interview preparation"
      ]
    },
    {
      img: "https://t4.ftcdn.net/jpg/04/52/93/93/360_F_452939372_33TpmMySxDxez38m7B55TM0hbTrG0oKm.jpg",
      subName: "Career Development in Tech",
      subDesc:
        "Guide students on breaking into tech roles through resume building, portfolio projects, interview strategies, and navigating career paths in software and cybersecurity.",
      syllabusDesc: [
        "Resume and portfolio development",
        "Building real-world projects",
        "Personal branding and LinkedIn optimization",
        "Networking strategies",
        "Job search techniques",
        "Freelancing and client acquisition",
        "Interview preparation strategies",
        "Career growth and advancement planning"
      ]
    }
  ];
  return (
    <>
      <div className="introduckN">
      <Bookmark name={"CourseCart"} />
        <div className="descriptionUpper">
          <div className="smSay">
            Explore Our Many Different Course Offerings
          </div>
          <img
            src="https://www.freeiconspng.com/thumbs/brain-icon-png/brain-2.png"
            alt=""
            className="logo"
          />
        </div>
      </div>
     
      <div className="courseCata">
        {subjects.map((topic, i) => {
          return <Subject key={i} obj={topic} />;
        })}
      </div>
    </>
  );
}

export default Learn;
