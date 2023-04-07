import React,{useState, useEffect} from 'react'
import './GuideChat.css'
import profile from '../../../Assets/images/profile.jpg'
import back from '../../../Assets/images/left-arrow.svg'

function GuideChatComponent() {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isListClicked, setIsListClicked] = useState(false);

  useEffect(() => {
    function handleResize() {

      if (window.innerWidth < 950) {
        setIsSmallScreen(true);
        setIsListClicked(false);
      } else {
        setIsSmallScreen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // call handleResize initially to set the state correctly
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChatList = () =>{
    if(window.innerWidth < 950){
    setIsListClicked(true)
    setIsSmallScreen(false)
    }
  }

  const handleGoBack = () =>{
    setIsListClicked(false)
    setIsSmallScreen(true)
  }

  return (
    <div className='guide-chat-container'>
        {!isListClicked &&
        <div className={isSmallScreen? "chat-list-container-small-device" : "chat-list-container"}>
            <div className="chat-list-header">
                <h3 className="chat-list-h3">Messages</h3>
            </div>
            <div className="chat-list-scroller">
                <ul className="chat-list-ul">
                    <li className="chat-list-item">
                        <a onClick={handleChatList} className="chat-list-item-info guide-item-active">
                            <div className="chat-item-avatar">
                                <img className='chat-item-avatar-img' src={profile} alt="" />
                            </div>
                            <div className="chat-item-details">
                                <div className="guide-name-time">
                                    <span className='name-chat'>Rocco</span>
                                    <span className='time-chat'>5 minutes ago</span>
                                </div>
                                <div className="last-message"></div>
                            </div>
                        </a>
                    </li>
                    <li className="chat-list-item">
                        <a className="chat-list-item-info">
                            <div className="chat-item-avatar">
                                <img className='chat-item-avatar-img' src={profile} alt="" />
                            </div>
                            <div className="chat-item-details">
                                <div className="guide-name-time">
                                    <span className='name-chat'>Rocco</span>
                                    <span className='time-chat'>5 minutes ago</span>
                                </div>
                                <div className="last-message"></div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        }

        <div className={isSmallScreen ? "chat-window-container-small-device" : "chat-window-container"}>
            
            <div className="chat-window-header">
                
                {isListClicked && <img onClick={handleGoBack} style={{height:"100%"}} src={back} alt="" />}
                
                <img src={profile} alt="" className="chat-window-header-avatar" />
                <h3 className="chat-window-header-h3">Rocco</h3>
            </div>
            <div className="chat-window-scroller chat-window-background">
                <div>
                    <ul className="chat-window-ul">
                        <li className="chat-window-li">
                            <div className="guide-chat-window-message">
                                <p className="chat-window-message-para">Hi</p>
                                <div className="chat-window-message-info">
                                    <span className='message-sender'>me</span>
                                    <span className="message-date-sented"> • 14:43 30 Mar 2023</span>
                                </div>
                            </div>
                        </li>

                        <li className="chat-window-li">
                            <div className="chat-window-message-sender">
                                <p className="chat-window-message-para">We are proud to be part of a movement that prioritizes purpose beyond profit and are ready to put our words into action. Being B Corp is a process, not a destination. Discover more about our B Corp journey and how we intend to change the way we travel.</p>
                                <div className="chat-window-message-info">
                                    <span className='message-sender'>Rocco</span>
                                    <span className="message-date-sented"> • 14:45 30 Mar 2023</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="chat-window-input-container">
                <form action="" className="chat-window-input-form">
                    <textarea placeholder='write a message..' className='chat-window-input-textarea'></textarea>
                    <button className="chat-send-button">
                    <svg fill="#6B9682" width="24" height="24" viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="12"></circle><path d="M 12 6 L 12 18 M 6 12 L 18 12" stroke="white" stroke-width="2"></path></g></svg>
                    </button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default GuideChatComponent
