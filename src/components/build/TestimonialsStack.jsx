import { useEffect, useState } from "react";
// import "./TestimonialsQueue.css";

const testimonialsData = [
  { name: "Aaron Mitchell", role: "Software Engineering Student", rating: 5, text: "Clear instruction, fast support, and practical lessons that actually translate to real-world skills." },
  { name: "Bianca Reed", role: "UX Designer", rating: 5, text: "Every interaction felt intentional and professional. The quality of service truly stands out." },
  { name: "Caleb Thompson", role: "Startup Founder", rating: 5, text: "From onboarding to delivery, the experience was smooth, responsive, and exceeded expectations." },
  { name: "Danielle Foster", role: "Career Switcher", rating: 4, text: "I finally felt confident applying what I learned. The guidance made a real difference." },
  { name: "Evan Brooks", role: "Frontend Developer", rating: 5, text: "Strong technical depth paired with excellent communication. Highly recommend." },
  { name: "Faith Coleman", role: "IT Student", rating: 5, text: "Supportive, structured, and empowering. The lessons were easy to follow and impactful." },
  { name: "Gregory Allen", role: "Product Manager", rating: 5, text: "Professional service with attention to detail. Everything was handled efficiently." },
  { name: "Hannah Lewis", role: "Data Analyst", rating: 5, text: "The clarity and organization made complex topics feel manageable and relevant." },
  { name: "Isaiah Morgan", role: "Junior Developer", rating: 4, text: "Great pacing and strong mentorship throughout the process." },
  { name: "Jasmine Patel", role: "Tech Entrepreneur", rating: 5, text: "The quality of both instruction and execution was outstanding." },

  { name: "Kevin Turner", role: "Backend Developer", rating: 5, text: "Thoughtful explanations and real-world examples made everything click." },
  { name: "Latoya Simmons", role: "Cybersecurity Student", rating: 5, text: "The support system alone makes this worth it. Truly top-tier service." },
  { name: "Marcus Bennett", role: "DevOps Engineer", rating: 5, text: "Reliable, knowledgeable, and very easy to work with." },
  { name: "Nina Wallace", role: "Software Tester", rating: 4, text: "Clear expectations and excellent follow-through from start to finish." },
  { name: "Omar Richardson", role: "IT Consultant", rating: 5, text: "Everything was delivered with professionalism and technical excellence." },
  { name: "Paige Robinson", role: "Computer Science Student", rating: 5, text: "The learning experience felt intentional and well-structured." },
  { name: "Quentin Hayes", role: "Cloud Engineer", rating: 5, text: "Strong fundamentals paired with modern best practices." },
  { name: "Renee Washington", role: "Business Analyst", rating: 4, text: "Very responsive and supportive throughout the engagement." },
  { name: "Samuel Price", role: "Systems Administrator", rating: 5, text: "The attention to detail and care really stood out." },
  { name: "Tiffany Moore", role: "Tech Recruiter", rating: 5, text: "The professionalism and clarity made this an easy recommendation." },

  { name: "Ulysses Carter", role: "Network Technician", rating: 5, text: "Everything was explained clearly without being overwhelming." },
  { name: "Vanessa King", role: "UI Developer", rating: 5, text: "A great balance between theory and hands-on learning." },
  { name: "William Scott", role: "Security Analyst", rating: 5, text: "Practical, efficient, and very well-executed." },
  { name: "Xavier Long", role: "IT Support Specialist", rating: 4, text: "The service was reliable and easy to engage with." },
  { name: "Yolanda Perez", role: "Digital Strategist", rating: 5, text: "Everything felt thoughtfully designed with the learner in mind." },
  { name: "Zachary Evans", role: "Software Intern", rating: 5, text: "I gained confidence quickly thanks to the clear guidance." },

  { name: "Alicia Grant", role: "Mobile Developer", rating: 5, text: "The experience was seamless and extremely informative." },
  { name: "Brandon Young", role: "Full Stack Developer", rating: 5, text: "Excellent pacing and real-world application throughout." },
  { name: "Candace Hill", role: "QA Engineer", rating: 4, text: "Consistent communication and solid technical delivery." },
  { name: "Derrick Owens", role: "Tech Lead", rating: 5, text: "A reliable partner with strong technical insight." },
  { name: "Elijah Ward", role: "CS Graduate", rating: 5, text: "Everything was broken down in a way that made sense." },
  { name: "Felicia Adams", role: "Project Coordinator", rating: 5, text: "Organized, professional, and extremely helpful." },
  { name: "Gavin Morales", role: "Platform Engineer", rating: 5, text: "High-quality service backed by real expertise." },
  { name: "Heather Nguyen", role: "Product Designer", rating: 5, text: "The process felt smooth and collaborative." },
  { name: "Ian Porter", role: "Junior Analyst", rating: 4, text: "Supportive and patient throughout the learning process." },
  { name: "Jordan Fields", role: "Software Engineer", rating: 5, text: "Exceptional experience from beginning to end." },

  { name: "Kara Bell", role: "Scrum Master", rating: 5, text: "Everything was delivered with clarity and purpose." },
  { name: "Leonard Ross", role: "Infrastructure Engineer", rating: 5, text: "Strong communication and even stronger execution." },
  { name: "Monique Taylor", role: "IT Manager", rating: 5, text: "Professional, efficient, and highly effective." },
  { name: "Noah Kim", role: "AI Student", rating: 4, text: "Well-structured lessons with real value." },
  { name: "Olivia Brooks", role: "Digital Product Owner", rating: 5, text: "A refreshing level of quality and care." },
  { name: "Preston Miller", role: "Cloud Support Engineer", rating: 5, text: "Clear expectations and consistent delivery." },
  { name: "Rashida Coleman", role: "STEM Educator", rating: 5, text: "A meaningful and empowering learning experience." },
  { name: "Stefan Wright", role: "Systems Engineer", rating: 5, text: "The technical knowledge was clearly top-tier." },
  { name: "Tamara Lewis", role: "Operations Analyst", rating: 4, text: "Professional service with thoughtful execution." },
  { name: "Victor Johnson", role: "Solutions Architect", rating: 5, text: "Reliable expertise and excellent follow-up." },

  { name: "Whitney Clarke", role: "Tech Program Manager", rating: 5, text: "Everything felt intentional and well planned." },
  { name: "Andre Nelson", role: "Web Developer", rating: 5, text: "Straightforward, practical, and extremely helpful." },
  { name: "Brianna Lopez", role: "Computer Engineering Student", rating: 5, text: "The explanations were clear and encouraging." },
  { name: "Chris Daniels", role: "Application Support", rating: 4, text: "Consistent quality and dependable service." },
  { name: "Dionne Harper", role: "IT Operations", rating: 5, text: "Excellent structure and attention to detail." },
  { name: "Eric Vaughn", role: "Senior Developer", rating: 5, text: "Strong fundamentals delivered the right way." },
  { name: "Farrah Blake", role: "Digital Consultant", rating: 5, text: "Professional experience with real value." },
  { name: "Harold Jenkins", role: "Network Engineer", rating: 5, text: "Clear communication and effective solutions." },
  { name: "Imani Brooks", role: "Tech Fellow", rating: 5, text: "Supportive, knowledgeable, and empowering." },
  { name: "Julian Matthews", role: "Engineering Manager", rating: 5, text: "High standards reflected in every interaction." },

  { name: "Kayla Price", role: "Product Analyst", rating: 5, text: "A thoughtful and well-executed experience." },
  { name: "Logan Pierce", role: "Security Trainee", rating: 4, text: "Great foundational knowledge delivered clearly." },
  { name: "Maya Robinson", role: "Software Apprentice", rating: 5, text: "The support made learning feel achievable." },
  { name: "Nathan Ortiz", role: "Platform Support Engineer", rating: 5, text: "Efficient service with strong technical insight." },
  { name: "Ophelia Grant", role: "Digital Educator", rating: 5, text: "Everything was learner-focused and intentional." },
  { name: "Patrick Lewis", role: "Cloud Solutions Specialist", rating: 5, text: "Solid execution paired with clear communication." },
  { name: "Queen Reynolds", role: "STEM Advocate", rating: 5, text: "A powerful example of excellence in tech education." },
  { name: "Raymond Scott", role: "Enterprise Engineer", rating: 5, text: "Reliable service that delivers consistent results." },
  { name: "Sabrina White", role: "Tech Community Organizer", rating: 5, text: "The care and quality were immediately noticeable." },
  { name: "Trevor Collins", role: "Junior Software Engineer", rating: 5, text: "Clear, practical, and confidence-building." }
];
const MAX_VISIBLE = 4;
const STACK_OFFSET = 22;

export default function TestimonialsQueue() {
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prev) => {
        const next = testimonialsData[index];
        const updated = [...prev, next];
        return updated.slice(-MAX_VISIBLE);
      },);

      setIndex((i) => (i + 1) % testimonialsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="queue-container">
      {queue.map((review, i) => (
        <div
          key={i}
          className="queue-card"
          style={{
            transform: `translateY(${i * STACK_OFFSET}px)`,
            zIndex: i
          }}
        >
          <div className="queue-header">
            <h4>{review.name}</h4>
            <span>{review.role}</span>
          </div>

          <div className="queue-stars">
            {Array.from({ length: review.rating }).map((_, idx) => (
              <span key={idx}>★</span>
            ))}
          </div>

          <p>“{review.text}”</p>
        </div>
      ))}
    </div>
  );
}