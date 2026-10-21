import automationIcon from '../../assets/course-icons/automation.svg';
import javascriptIcon from '../../assets/course-icons/javascript.svg';
import mernIcon from '../../assets/course-icons/mern.svg';
import reactIcon from '../../assets/course-icons/react.svg';
import nodeIcon from '../../assets/course-icons/node.svg';
import securityIcon from '../../assets/course-icons/security.svg';
import pentestingIcon from '../../assets/course-icons/pentesting.svg';
import cloudIcon from '../../assets/course-icons/cloud.svg';
import interviewsIcon from '../../assets/course-icons/interviews.svg';
import careerIcon from '../../assets/course-icons/career.svg';

const subjects = [
    {
      img: automationIcon,
      subName: "Agentic Sys Development",
      subDesc:
        "Unlock the power of automation with n8n, the fair-code workflow automation tool that lets you connect apps, APIs, and databases with ease. In this hands-on course, you’ll learn how to design, build, and deploy scalable automation workflows without relying on expensive SaaS tools.",
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
      img: javascriptIcon,
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
      img: mernIcon,
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
      img: reactIcon,
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
      img: nodeIcon,
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
      img: securityIcon,
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
      img: pentestingIcon,
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
      img: cloudIcon,
      subName: "Cloud Computing Fundamentals",
      subDesc:
        "Cover cloud concepts including IaaS, PaaS, SaaS, virtualization, identity and access management, and AWS and Azure fundamentals for beginners.",
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
      img: interviewsIcon,
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
      img: careerIcon,
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
const ids = ['automation', 'javascript', 'mern', 'react', 'node', 'security', 'pentesting', 'cloud', 'interviews', 'career'];
export default subjects.map((subject,index) => ({...subject,id:ids[index]}));
