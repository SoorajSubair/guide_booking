import React from 'react'
import './TourPersonaliseCard.css'
import { useGuide } from '../../../Context/GuideContext'
import { createOrStartChat } from '../../../Utils/Urls'
import { useSelector } from 'react-redux';
import axios from '../../../Utils/axios'
import { useNavigate } from 'react-router-dom';

function TourPersonaliseCard() {

  const guide = useGuide()
  const  userId  = useSelector(state => state.user.id);
  const guideId = guide.id
  const navigate = useNavigate();

  const handleChat = () =>{
    const data = {
        userId,
        guideId
    }

    axios.post(createOrStartChat, data, {
        headers: {'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
        navigate(`/chat/${response.data.id}`)
    })
    .catch((e) =>{
        console.log(e.response.data)
    })

  }

  return (
    <div className='personalise-container'>
      <h2 className="personalise-heading">
      Hi there!<br/>
      I can personalize your experience
      </h2>
      <p className="personalise-para">Just let me know your preferences for a private and personalized experience!</p>
      <button onClick={handleChat} className="personalise-button">Request a personalized offer</button>
    </div>
  )
}

export default TourPersonaliseCard
