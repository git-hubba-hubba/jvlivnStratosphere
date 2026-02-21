import React from 'react'
import Subject from '../components/teach/Subject'

function Learn() {
  const subjects = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/960px-Unofficial_JavaScript_logo_2.svg.png",
      subName: "JavaScript Programming",
      subDesc:
        "Teach core to advanced JavaScript concepts including variables, functions, ES6+, asynchronous programming, APIs, and real-world problem solving used in modern web applications."
    },
    {
      img: "https://designoweb.s3.eu-north-1.amazonaws.com/technologies/mern.webp",
      subName: "Full-Stack Web Development (MERN)",
      subDesc:
        "Hands-on instruction in building full-stack applications using MongoDB, Express, React, and Node.js, covering frontend UI, backend APIs, authentication, and deployment."
    },
    {
      img: "https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png",
      subName: "React Development",
      subDesc:
        "Focused training on React fundamentals and advanced concepts such as hooks, state management, component architecture, and building scalable, production-ready user interfaces."
    },
    {
      img: "https://images.credly.com/images/51aeb74b-ec87-4069-93fc-0ea449c8d77f/twitter_thumb_201604_node.png",
      subName: "Backend Development with Node.js",
      subDesc:
        "Teach server-side development using Node.js and Express, including REST APIs, middleware, authentication, database integration, and secure application design."
    },
    {
      img: "https://img.freepik.com/premium-vector/cyber-security-logo-icon-symbol-vector-illustration-modern-cyber-security-logo_1123785-4541.jpg",
      subName: "Cybersecurity Fundamentals",
      subDesc:
        "Introduction to cybersecurity concepts including threat models, vulnerabilities, attacks, defensive strategies, and foundational security principles aligned with Security+ objectives."
    },
  
    {
      img: "https://www.oreilly.com/api/v2/epubs/urn:orm:book:9781492069485/files/images/page212.jpg",
      subName: "Ethical Hacking & Penetration Testing Basics",
      subDesc:
        "Introductory penetration testing concepts including reconnaissance, scanning, vulnerability assessment, and ethical hacking methodologies using tools like Kali Linux."
    },
    {
      img: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png",
      subName: "Cloud Computing Fundamentals",
      subDesc:
        "Cover cloud concepts including IaaS, PaaS, SaaS, virtualization, identity and access management, and core Azure fundamentals for beginners."
    },
  
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      subName: "Technical Interview & Coding Prep",
      subDesc:
        "Prepare students for technical interviews with coding challenges, data structures, algorithms, problem-solving strategies, and real-world engineering scenarios."
    },
    {
      img: "https://t4.ftcdn.net/jpg/04/52/93/93/360_F_452939372_33TpmMySxDxez38m7B55TM0hbTrG0oKm.jpg",
      subName: "Career Development in Tech",
      subDesc:
        "Guide students on breaking into tech roles through resume building, portfolio projects, interview strategies, and navigating career paths in software and cybersecurity."
    }
  ];
  return (
    <>
    <div className="introduckN">
        <div className="descriptionUpper">
          <div className="smSay">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae.
          </div>
          <img
            src="https://www.freeiconspng.com/thumbs/brain-icon-png/brain-2.png"
            alt=""
            className="logo"
          />
        </div>
      </div>
    
    <h2 className="titler">Courses & Tutorials</h2>
    <div className="courseCata">
      {subjects.map((topic,i)=>{
        return <Subject key={i} obj={topic}/>
      })}
    </div>
    
    </>
  )
}

export default Learn