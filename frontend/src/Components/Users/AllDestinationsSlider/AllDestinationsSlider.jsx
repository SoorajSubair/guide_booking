import React,{useEffect, useState} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './AllDestinations.css'
import axios from '../../../Utils/axios'
import { getDestinations,baseUrl } from '../../../Utils/Urls';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

function AllDestinationsSlider() {

  const [allDestinations, setAllDestinations] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(getDestinations,{
      headers: {'Content-Type': 'application/json' },
    })
    .then((response) => {
      if (response.status === 200) {
        setAllDestinations(response.data)
        
      } 
    })    
  },[]);

 const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 4,
          slidesToSlide: 1,
        },
        desktop: {
          breakpoint: { max: 1700, min: 800 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1300, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };

  const handleDestination = (destinationId) => {
    navigate(`/destination/${destinationId}`)
    
  }

  return (
   <div className="carousel">
      <h1 className='carousel-heading'>Get native in these Destinations</h1>
      <h1 className='carousel-subheading'>Find a private guided tour with one of our locals</h1>
      <Carousel showDots={true} responsive={responsive}>
      {allDestinations.map(destination => (
        <div className="destination-card" key={destination.id} onClick={() => handleDestination(destination.id)}>
            <LazyLoadImage className="product--image" effect="blur" src={`${baseUrl}${destination.image}`} alt={`${destination.name}`} />
            <h2 className='h2'>{destination.name}</h2>
            <p className='allDestination-description' >{destination.short_info}</p>
            <p>
            </p>
        </div>
        ))}
      </Carousel>
    </div>
  )
}

export default AllDestinationsSlider
