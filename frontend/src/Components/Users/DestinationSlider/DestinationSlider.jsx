import React, {useEffect, useState} from 'react'
import './DestinationSlider.css'
import BtnSlider from './BtnSlider'
import { useDestination } from '../../../Context/DestinationContext'
import { baseUrl } from '../../../Utils/Urls'

export default function DestinationSlider() {


    const destination = useDestination();
    const [extraImages, setExtraImages] = useState([])

    useEffect(()=>{
        setExtraImages(destination.extra_images)
    })

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== extraImages.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === extraImages.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(extraImages.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {extraImages?.map((images, index) => {
                return (
                    <div
                    key={images.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src={`${baseUrl}${images.image}`} 
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}
