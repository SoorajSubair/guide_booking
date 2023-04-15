import React from 'react'
import './GuideContent.css'
import TourPersonaliseCard from '../TourPersonaliseCard/TourPersonaliseCard'
import Services from '../Services/Services'
import { baseUrl } from '../../../Utils/Urls'
import { useGuide } from '../../../Context/GuideContext'
import CommentsComponent from '../CommentsComponent/CommentsComponent'

function GuideContent() {

  
    const guide = useGuide()


  return (
    <div className='content-layout'>
        <div className="content-container1">
            <h2 className="content-cintainer1-header">Hi there! Nice to meet you</h2>
            <div className="image-section image-section-container">
                <div className="full-image-container child-2">
                    {/* <svg></svg> */}
                    <img className='image-1 image-2' src={`${baseUrl}${guide?.image}`} />
                </div>
            </div>
            <div className="read-more">
                <p className="read-more-para">{guide?.bio}</p>

            </div>
        </div>
        <Services/>
        <TourPersonaliseCard/>
        <CommentsComponent commentsFor={'guide'}/>
      
    </div>
  )
}

export default GuideContent
