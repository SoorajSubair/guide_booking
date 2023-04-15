import React from 'react'
import BookingCard from '../../../Components/Users/BookingCard/BookingCard'
import Chat from '../../../Components/Users/ChatComponent/ChatComponent'
import Footer from '../../../Components/Users/Footer/Footer'
import GuideChatCard from '../../../Components/Users/GuideChatCard/GuideChatCard'
import GuideContent from '../../../Components/Users/GuideContent/GuideContent'
import NavBar from '../../../Components/Users/Navbar/Navbar'
import { GuideProvider } from '../../../Context/GuideContext'
import './Guide.css'
import CommentsComponent from '../../../Components/Users/CommentsComponent/CommentsComponent'

function Guide() {
  return (
    <div>
        <NavBar/>
        <div className="guide-container content-block">
          <GuideProvider>
            <GuideChatCard/>
            <GuideContent/>
            <BookingCard/>
          </GuideProvider>
            
        </div>
        <Footer/>
      
    </div>
  )
}

export default Guide
