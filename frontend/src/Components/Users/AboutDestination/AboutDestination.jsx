import React from 'react'
import DestinationSlider from '../DestinationSlider/DestinationSlider'
import './AboutDestination.css'
import { useDestination } from '../../../Context/DestinationContext'

function AboutDestination() {

  const destination = useDestination();

  return (
    <div className='about-section'>
        <div className="about-container">
            <div>
                <h2 className='about-heading'>What you can expect</h2>
                <p className="about-para">{destination?.about}</p>
            </div>
        </div>
        <DestinationSlider/>
    </div>
  )
}

export default AboutDestination
