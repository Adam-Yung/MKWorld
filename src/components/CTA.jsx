import React from 'react'
import { Link } from 'react-router-dom'
const CTA = () => {
  return (
    <section className='cta'>
        <p className='cta-text'>Have a gooi in mind? <br className='sm:block hidden'/>
            Let's gooi together!
        </p>
        <Link to="/contact" className="btn">
            Contact Gee
        </Link>
    </section>
  )
}

export default CTA