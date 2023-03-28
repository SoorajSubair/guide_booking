import React,{useEffect, useState} from 'react'
import './Top5NatureFriendly.css'
import axios from '../../../Utils/axios'
import { baseUrl, getTop5NatureFriendly } from '../../../Utils/Urls'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';


function Top5NatureFriendly() {

    const navigate = useNavigate()
    const [top5NatureFriendly, setTop5NatureFriendly] = useState([])

    useEffect(() => {
        console.log('topMega')
        axios.get(getTop5NatureFriendly,{
        headers: {'Content-Type': 'application/json' },
        })
        .then((response) => {
        if (response.status === 200) {
            setTop5NatureFriendly(response.data)
            
        } 
        })    
    },[]);

    const handleNatureFriendly = (destinationId) => {
        navigate(`/destination/${destinationId}`)
    }

  return (
    <div className='top5-section'>
        <div className="top5-container">
            <div className="top5-heading">
                <h2 className="top5-mainheading">Top 5 nature friendly destinations</h2>
                <p className="top5-subheading">Discover the best way to know the city, by our natives!</p>
            </div>
            <ol className='top5-list'>
                <li className='top5-card card-list first-card-list' onClick={()=> handleNatureFriendly(top5NatureFriendly[0].id)}>
                    <div className='top5-card-image' data-cardnumber = '1'>
                        <LazyLoadImage className='card-image' effect='blur' src={`${baseUrl}${top5NatureFriendly[0]?.image}`} alt="image1"  style={{color:"transparent"}}/>
                    </div>
                    <div className='top5-content-container'>
                        <h3 className="top5-content-heading">
                        {top5NatureFriendly[0]?.name}
                        </h3>
                        <p className="top5-content-para">
                        {top5NatureFriendly[0]?.short_info}
                        </p>
                        <div className="top5-card-bottom">
                            <a className="discover-button">
                                Discover {top5NatureFriendly[0]?.guide_count} tours
                            </a>
                        </div>
                    </div>
                </li>

                {top5NatureFriendly.slice(1).map((destination)=>(
                <li className='top5-card card-list' key={destination.id} onClick={()=> handleNatureFriendly(destination.id)}>
                    <div className='top5-card-image' data-cardnumber = '2'>
                        <LazyLoadImage className='card-image' effect='blur' src={`${baseUrl}${destination.image}`} alt="image2"  style={{color:"transparent"}}/>
                    </div>
                    <div className='top5-content-container'>
                        <h3 className="top5-content-heading">
                            {destination.name}
                        </h3>
                        <p className="top5-content-para">
                        {destination.short_info}
                        </p>
                        <div className="top5-card-bottom">
                            <a className="discover-button">
                                Discover {destination.guide_count} tours
                            </a>
                        </div>
                    </div>
                </li>
                ))}
            </ol>

        </div>
      
    </div>
  )
}

export default Top5NatureFriendly
