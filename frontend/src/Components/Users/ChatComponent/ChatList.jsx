import React,{useState, useEffect} from 'react'
import axios from '../../../Utils/axios'
import { userChatList, baseUrl } from '../../../Utils/Urls';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';


function ChatList(props) {

    const [chats, setChats] = useState([]);
    const { id } = useSelector(state => state.user);
    const [url, setUrl] = useState('')
    const navigate = useNavigate()
    const { chatId } = useParams();

    useEffect(() => {
        if(url){
        const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
        const access = user_authTokens?.access
        
        axios.get(url, {
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            setChats(response.data)
        })
        .catch((e) =>{
            console.log(e.response.data)
        })
    }
    },[url])

    useEffect(()=>{
        if(id){
            setUrl(`${userChatList}${id}`)
        }
    },[id])


    const handleChatList = (id) =>{
        if(window.innerWidth < 600){
        navigate(`/chat/${id}`)
        props.setIsListClicked(true)
        props.setIsSmallScreen(false)
        }
        navigate(`/chat/${id}`)
      }

  return (
    <div className={props.isSmallScreen? "chat-list-container-small-device" : "chat-list-container"}>
        <div className="chat-list-header">
            <h3 className="chat-list-h3">Messages</h3>
        </div>
        <div className="chat-list-scroller">
            <ul className="chat-list-ul">
                {chats.map((data)=>{
                    const dt = new Date(data.last_message_time);
                    const formattedDate = `${dt.getHours()}:${dt.getMinutes()} ${dt.getDate()} ${dt.toLocaleString('default', { month: 'short' })} ${dt.getFullYear()}`;
                    return(
                        <li key={data.id} className="chat-list-item"> 
                            <a onClick={()=>handleChatList(data.id)} className={data.id == chatId ? "chat-list-item-info item-active": "chat-list-item-info"}>
                                <div className="chat-item-avatar">
                                    <img className='chat-item-avatar-img' src={`${baseUrl}${data.guide.image}`} alt="guide-image" />
                                </div>
                                <div className="chat-item-details">
                                    <div className="name-time">
                                        <span className='name-chat'>{data.guide.first_name}</span>
                                        <span className='time-chat'>{formattedDate}</span>
                                    </div>
                                    <div className="last-message"></div>
                                </div>
                            </a>
                        </li>
                    )
                })}
                
            </ul>
        </div>
    </div>

  )
}

export default ChatList
