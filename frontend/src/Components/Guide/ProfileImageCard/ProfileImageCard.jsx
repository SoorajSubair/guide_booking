import React, { useEffect,useState } from 'react'
import './ProfileImageCard.css'
import { useSelector } from 'react-redux';
import { baseUrl,getGuide } from '../../../Utils/Urls';
import { useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios'


function ProfileImageCard() {

    const navigate = useNavigate()
    const { image } = useSelector(state => state.user);
    const profileImage = `${baseUrl}${image}`
    const { id } = useSelector(state => state.user);
    const url = `${getGuide}${id}`
    const [destinationImage, setDestinationImage] = useState(null)

    useEffect(() => {

        axios.get(url, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => {
            if (response.status === 200) {
                setDestinationImage(response.data.destination.image)
                
            }
          });
    })

  return (
    <div className='profile-image-card-container'>
        <div className='guide-cover-image-container'>
            <img className='guide-cover-image' src={`${baseUrl}${destinationImage}`} alt="cover-Image" />
        </div>
       
            <div className='guide-avatar-container'>
                <div className='guide-avatar'>
                    <img src={profileImage} alt="avatar" />
                </div>
                <div className='profile-edit-btn-container'>
                <button onClick={()=> navigate('/guide/profile/edit')}>Edit</button>
                </div>
            </div>
        
      
    </div>
  )
}

export default ProfileImageCard
