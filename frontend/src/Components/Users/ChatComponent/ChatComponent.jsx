import React from 'react'
import './Chat.css'

function ChatComponent() {
  return (
    <div className='chat-container'>
        <div className="chat-list-container">
            <div className="chat-list-header">
                <h3 className="chat-list-h3">Messages</h3>
            </div>
            <div className="chat-list-scroller">
                <ul className="chat-list-ul">
                    <li className="chat-list-item">
                        <a className="chat-list-item-info item-active">
                            <div className="chat-item-avatar">
                                <img className='chat-item-avatar-img' src="https://withlocals-com-res.cloudinary.com/image/up…o,dpr_1.0,f_auto/cb06da7e6ea436bd2d48ce8eb0b2eef1" alt="" />
                            </div>
                            <div className="chat-item-details">
                                <div className="name-time">
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

        <div className="chat-window-container">
            <div className="chat-window-header">
                <img src="	https://withlocals-com-res.cloudinary.com/image/up…o,dpr_1.0,f_auto/cb06da7e6ea436bd2d48ce8eb0b2eef1" alt="" className="chat-window-header-avatar" />
                <h3 className="chat-window-header-h3">Rocco</h3>
            </div>
            <div className="chat-window-scroller chat-window-background">
                <div>
                    <ul className="chat-window-ul">
                        <li className="chat-window-li">
                            <div className="chat-window-message">
                                <p className="chat-window-message-para">Hi</p>
                                <div className="chat-window-message-info">
                                    <span className='message-sender'>me</span>
                                    <span className="message-date-sented"> • 14:43 30 Mar 2023</span>
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

export default ChatComponent
