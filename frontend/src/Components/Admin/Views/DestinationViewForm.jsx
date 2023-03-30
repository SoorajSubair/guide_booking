import './Views.css'
import React, { useState } from 'react'
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import axios from '../../../Utils/axios'
import { baseUrl, viewDestination } from '../../../Utils/Urls';
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function DestinationViewForm() {

   
    const {destinationId} = useParams()
    const [destination, setDestination] = useState({})
    const [extraImages, setExtraImages] = useState([])
    const url = `${viewDestination}${destinationId}`


    useEffect(() => {

        axios.get(url,{
            headers: {'Content-Type': 'application/json' },
          })
            .then((response) => {
              if (response.status === 200) {
                setDestination(response.data)
                setExtraImages(response.data.extra_images)
              } 
            })    
      },[url])

  return (
    <>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
      <Card 
      className="bg-dark text-white"
    >
      <Card.Img className='destination-image' src={`${baseUrl}${destination.image}`} alt="Card image"/>
     
          <Card.ImgOverlay className='overlay'>
            <Card.Title className="center-input">{destination.name}</Card.Title>
      
          </Card.ImgOverlay>
    
    </Card>
      <Card className='about-destination'>
        <Card.Body>
            
            <div className='about-text-container'>
          <Card.Text className='about-text'>{destination.about}
          </Card.Text>
          
          </div>
        </Card.Body>
      </Card>
      <div style={{marginTop:'10px', width:'100%', paddingLeft:'5vw', paddingRight:'5vw'}}>
        <ResponsiveMasonry className='gallery'
                // columnsCountBreakPoints={{600: 1, 600: 2, 0: 3}}
            >
            <Masonry gutter='20px'>
                {extraImages.map(({image}, {destination}) => (
                    <LazyLoadImage
                        key={destination}
                        effect="blur"
                        src={`${baseUrl}${image}`}
                        style={{width: "100%",height: '45vh', display: "block", objectFit:"cover"}}
                        alt=""
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>
       </div>
    
    </>
  )
}

export default DestinationViewForm

