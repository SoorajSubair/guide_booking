import React from 'react'
import './TourPersonaliseCard.css'
import avatar from '../../../Assets/images/profile.jpg'

function TourPersonaliseCard() {
  return (
    <div className='personalise-container'>
      {/* <div className="avatar-container">
        <img src={avatar} className="personalise-avatar" />
      </div> */}
      <h2 className="personalise-heading">
      Hi there!<br/>
      I can personalize your experience
      </h2>
      <p className="personalise-para">Just let me know your preferences for a private and personalized experience!</p>
      <button className="personalise-button">Request a personalized offer</button>
    </div>
  )
}

export default TourPersonaliseCard
