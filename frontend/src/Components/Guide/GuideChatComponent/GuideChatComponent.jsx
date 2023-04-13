import React,{useState, useEffect, useRef} from 'react'
import './GuideChat.css'
import back from '../../../Assets/images/left-arrow.svg'
import GuideChatList from './GuideChatList';
import { useParams } from 'react-router-dom';
import axios from '../../../Utils/axios'
import { userChatGuide, baseUrl } from '../../../Utils/Urls';
import { useSelector } from 'react-redux';
import WebSocketInstance from '../../../Utils/websocket.js';

function GuideChatComponent() {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isListClicked, setIsListClicked] = useState(false);
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [url, setUrl] = useState('')
    const { id } = useSelector(state => state.user);
    const [chat, setChat] = useState({});
    const messagesEndRef = useRef(null);

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

  useEffect(()=>{
    scrollToBottom();
  })

  useEffect(()=>{
        if(chatId){
            setUrl(`${userChatGuide}${chatId}`)
        }
    },[chatId])

    useEffect(() => {
        if(url){
        const user_authTokens = JSON.parse(localStorage.getItem('guide_authTokens'))
        const access = user_authTokens?.access
        
        axios.get(url, {
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            setChat(response.data)
        })
        .catch((e) =>{
            console.log(e.response.data)
        })
    }
    },[url])

    useEffect(() => {
      // if(chatId){
      initialiseChat();
      // }
  }, [chatId]);

  const initialiseChat = () => {
      waitForSocketConnection(() => {
          WebSocketInstance.addCallbacks(setMessages, addMessage);
          WebSocketInstance.fetchMessages(chatId);
      });
      WebSocketInstance.connect(chatId);
  };

  const waitForSocketConnection = (callback) => {
      setTimeout(() => {
          if (WebSocketInstance.state() === 1) {
              console.log("Connection is made");
              callback();
              return;
          } else {
              console.log("wait for connection...");
              waitForSocketConnection(callback);
          }
      }, 100);
  };

  const addMessage = (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
  };

  const messageChangeHandler = (event) => {
      setMessage(event.target.value);
  };

  const sendMessageHandler = (e) => {
      e.preventDefault();
      const messageObject = {
          from: id,
          content: message,
          chatId: chatId
      };
      WebSocketInstance.newChatMessage(messageObject);
      setMessage('');
  };

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }


  const handleGoBack = () =>{
    setIsListClicked(false)
    setIsSmallScreen(true)
  }

  return (
    <div className='guide-chat-container'>
        {!isListClicked &&
        <GuideChatList isSmallScreen={isSmallScreen} setIsListClicked={setIsListClicked} setIsSmallScreen={setIsSmallScreen}/>
        }
        {chatId &&
        <div className={isSmallScreen ? "chat-window-container-small-device" : "chat-window-container"}>
            
            <div className="chat-window-header">
                
                {isListClicked && <img onClick={handleGoBack} style={{height:"100%"}} src={back} alt="back button" />}
                
                <img src={`${baseUrl}${chat?.user?.image}`} alt="user image" className="chat-window-header-avatar" />
                <h3 className="chat-window-header-h3">{chat?.user?.first_name}</h3>
            </div>
            <div className="chat-window-scroller chat-window-background">
                <div ref={messagesEndRef}>
                    <ul className="chat-window-ul">
                    {[...new Set(messages.map((message) => message.id))].map((messageId) => {
                            const message = messages.find((message) => message.id === messageId);
                            const dt = new Date(message.created_at);
                            const formattedDate = `${dt.getHours()}:${dt.getMinutes()} ${dt.getDate()} ${dt.toLocaleString('default', { month: 'short' })} ${dt.getFullYear()}`;
                            return(
                            <li key={message.id} className="chat-window-li">
                                <div className={message.senderId === id ? "guide-chat-window-message": "chat-window-message-sender"}>
                                    <p className="chat-window-message-para">{message.content}</p>
                                    <div className="chat-window-message-info">
                                        <span className='message-sender'>{message.senderId === id ? 'me': message.sender}</span>
                                        <span className={message.senderId === id ? "message-date-sented" : "message-date-sented-darker"}> • {formattedDate}</span>
                                    </div>
                                </div>
                            </li>
                            )
                    })}
                    </ul>
                </div>
            </div>
            <div className="chat-window-input-container">
                <form onSubmit={sendMessageHandler} className="chat-window-input-form">
                    <input type='text' placeholder='write a message..' className='chat-window-input-textarea' value={message} onChange={messageChangeHandler}></input>
                    <button className="chat-send-button">
                    <svg fill="#6B9682" width="24" height="24" viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="12"></circle><path d="M 12 6 L 12 18 M 6 12 L 18 12" stroke="white" stroke-width="2"></path></g></svg>
                    </button>
                </form>
            </div>
        </div>
        }
    </div>
  )
}

export default GuideChatComponent
