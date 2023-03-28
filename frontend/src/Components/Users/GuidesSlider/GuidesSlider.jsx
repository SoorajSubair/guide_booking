import React,{useState, useEffect} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './GuidesSlider.css'
import { useDestination } from '../../../Context/DestinationContext'
import { baseUrl } from '../../../Utils/Urls'
import { useNavigate } from 'react-router-dom';


function GuidesSlider() {

  const navigate = useNavigate()
  const destination = useDestination();
  const [guides, setGuides] = useState([])

  useEffect(()=>{
    setGuides(destination.guides)
})


 const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 5,
          slidesToSlide: 1,
        },
        desktop: {
          breakpoint: { max: 1700, min: 800 },
          items: 4,
        },
        tv: {
            breakpoint: { max: 1100, min: 464 },
            items: 3,
          },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };

      const handleGuide = (guideId)=>{
        navigate(`/guide/${guideId}`)

      }

  return (
   <div className="carousel">
      <h1 className='carousel-heading'>Explore Madrid with a local of your choice</h1>
      <h1 className='carousel-subheading'>Learn about their personal stories, and find out how you can explore Madrid together</h1>
      {guides && guides.length > 0 && (
        <Carousel showDots={true} responsive={responsive}>
          {guides.map(guide => (
            <div className="guide-card" key={guide.id} onClick={()=>handleGuide(guide.id)}>
              <div className="image-overlay"></div>
              <img className="product--image" src={`${baseUrl}${guide.image}`} alt="product7" />
              <h3 className="h3-guide">Hi, I am</h3>
              <h2 className='h2-guide'>{guide.first_name}</h2>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default GuidesSlider
