import React from 'react'
import './Certification.css'

function Certification() {
  return (
    <div className='certificate-section'>
        <div className="certificate-container">
            <div>
                <h2 className='certificate-heading'>We are B Corp certified!</h2>
                <p className="certificate-para">We are proud to be part of a movement that prioritizes purpose beyond profit and are ready to put our words into action. Being B Corp is a process, not a destination. Discover more about our B Corp journey and how we intend to change the way we travel.</p>
            </div>
            <div className="certificate-image-container">
                <img className='certificate-image' src='https://withlocals-com-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,w_256/website/homepage/bcorp-logo' alt="certificate" style={{color:"transparent"}}/>
            </div>

        </div>
      
    </div>
  )
}

export default Certification
