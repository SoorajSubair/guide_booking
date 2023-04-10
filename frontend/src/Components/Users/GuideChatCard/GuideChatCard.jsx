import React from 'react'
import './GuideChatCard.css'
import { useGuide } from '../../../Context/GuideContext'
import { baseUrl, createOrStartChat } from '../../../Utils/Urls'
import { useSelector } from 'react-redux';
import axios from '../../../Utils/axios'
import { useNavigate } from 'react-router-dom';

function GuideChatCard() {

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
    <div className='chat-card-holder'>
        <div className="chat-card-container">
            <div className="chat-card-header">
                <div>
                    <h1 className="chat-card-title">{guide?.first_name}</h1>
                </div>
                <div className="chat-card-image">
                    <div className="chat-card-image-container">
                        <img className='chat-card-avatar' src={`${baseUrl}${guide?.image}`} />
                    </div>
                </div>
            </div>
            <p className="chat-card-list">
                <span className="list-item-icon">
                    <div></div>
                </span>
                <span className="list-item-text">
                    <span className="guide-text">I live in <strong>{guide?.destination?.name}</strong></span>
                </span>
            </p>
            <p className="chat-card-list">
                <span className="list-item-icon">
                    <div></div>
                </span>
                <span className="list-item-text">
                    <span className="guide-text">Verified <strong>Native host</strong></span>
                </span>
            </p>
            <p className="chat-card-list">
                <span className="list-item-icon">
                    <div></div>
                </span>
                <span className="list-item-text">
                    <span className="guide-text">Response time <strong>less than 10 hours</strong></span>
                </span>
            </p>
            <button onClick={handleChat} className='chat-with-me'>Chat with me</button>

        </div> 
    </div>
    
  )
}

export default GuideChatCard
