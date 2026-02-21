import React from 'react'
import TestimonialsQueue from '../components/build/TestimonialsStack'
import CalendarScheduler from '../components/general/CalendarScheduler'

function Contact() {
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

    <h2>Reviews & Testimonials</h2>
    <TestimonialsQueue />
    <img src="https://img.freepik.com/free-photo/friendly-carefree-happy-goodlooking-tall-african-american-female-model-with-curly-hairstyle-hold_1258-139746.jpg?semt=ais_hybrid&w=740&q=80" alt="" className="fillerPic" />
    <h2>Service Guarantee</h2>
    <p className="gserv">We guarantee that every course and learning experience we deliver is built on high-quality lesson planning, thorough research, and real-world industry relevance. Our curriculum is intentionally designed using current technologies, proven methodologies, and best practices aligned with today’s tech landscape.

Each lesson is carefully structured to ensure clarity, progression, and practical application—so students aren’t just learning concepts, but developing skills they can immediately use in professional environments. We continuously review and refine our materials to reflect evolving tools, standards, and employer expectations.

Our commitment is simple: if you engage with our program, you will receive instruction that is intentional, well-researched, and aligned with the skills demanded by the modern technology industry.</p>
    

    <hr />
    
    </>
  )
}

export default Contact