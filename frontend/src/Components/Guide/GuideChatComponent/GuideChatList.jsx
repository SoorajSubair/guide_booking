import React,{useState, useEffect} from 'react'
import './GuideChat.css'
import axios from '../../../Utils/axios'
import { guideChatList, baseUrl } from '../../../Utils/Urls';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

function GuideChatList(props) {

    const [chats, setChats] = useState([]);
    const { id } = useSelector(state => state.user);
    const [url, setUrl] = useState('')
    const navigate = useNavigate()
    const { chatId } = useParams();

    useEffect(() => {
        if(url){
        const user_authTokens = JSON.parse(localStorage.getItem('guide_authTokens'))
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
            setUrl(`${guideChatList}${id}`)
        }
    },[id])

    const handleChatList = (id) =>{
        if(window.innerWidth < 950){
            navigate(`guide/chat/${id}`)
            props.setIsListClicked(true)
            props.setIsSmallScreen(false)
        }
        navigate(`/guide/chat/${id}`)
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
                    <a onClick={()=>handleChatList(data.id)} className={data.id == chatId ? "chat-list-item-info guide-item-active" : "chat-list-item-info"}>
                        <div className="chat-item-avatar">
                            <img className='chat-item-avatar-img' src={`${baseUrl}${data.user.image}`} alt="user image" />
                        </div>
                        <div className="chat-item-details">
                            <div className="guide-name-time">
                                <span className='name-chat'>{data.user.first_name}</span>
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

export default GuideChatList
