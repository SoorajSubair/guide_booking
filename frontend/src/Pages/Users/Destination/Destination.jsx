import React from 'react'
import AboutDestination from '../../../Components/Users/AboutDestination/AboutDestination'
import Certification from '../../../Components/Users/Certification/Certification'
import DestinationVideo from '../../../Components/Users/DestinationVideo/DestinationVideo'
import Footer from '../../../Components/Users/Footer/Footer'
import GuidesSlider from '../../../Components/Users/GuidesSlider/GuidesSlider'
import NavBar from '../../../Components/Users/Navbar/Navbar'
import { DestinationProvider } from '../../../Context/DestinationContext'
import CommentsComponent from '../../../Components/Users/CommentsComponent/CommentsComponent'

function Destination() {
  return (
    <div style={{backgroundColor:'#EAEAEA'}}>
        <NavBar/>
        <DestinationProvider>
        <DestinationVideo/>
        <AboutDestination/>
        <Certification/>
        <GuidesSlider/>
        <CommentsComponent commentsFor={'destination'}/>
        </DestinationProvider>
        <Footer/>
      
    </div>
  )
}

export default Destination
