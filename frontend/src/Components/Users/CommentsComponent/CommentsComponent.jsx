import React,{useState, useEffect} from 'react'
import './Comments.css'
import { getDestinationComments,baseUrl } from '../../../Utils/Urls'
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios';


function CommentsComponent(props) {

    const { destinationId } = useParams();
    const { guideId } = useParams();
    const[comments, setComments] = useState([])
    let url = ''
    if(props.commentsFor == 'destination'){
        url = `${getDestinationComments}${destinationId}`
    }
    if(props.commentsFor == 'guide'){
        url = `${getDestinationComments}${guideId}`
    }
    const [commentsToShow, setCommentsToShow] = useState(4);
    const [additionalToShow, setAdditionalToShow] = useState(2);
    const commentsFor = props.commentsFor
    const navigate = useNavigate()

    useEffect(() => {
        if(url){
        const data = {
            commentsFor,
        }
        axios.post(url, data,{
    
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => {
            if (response.status === 200) {
                console.log(response.data)
              setComments(response.data);
            }
          });
        }
      }, [url]);


      const handleShowMoreClick = () => {
        const remainingComments = comments.length - commentsToShow;
        if (remainingComments > 0) {
          const numToAdd = Math.min(remainingComments, additionalToShow);
          setCommentsToShow(commentsToShow + numToAdd);
        } else {
          setAdditionalToShow(0);
        }
      };
    
      const visibleComments = comments.slice(0, commentsToShow)

  return (
    <div className='comment-block'>
        <div className="content-block">
        {visibleComments.length > 0 && (
            <div>
                <h2 class="Title-2wUUr">What other travelers love about our local experts</h2>
                {visibleComments.map((comment)=>{
                    return(
                        <div key={comment.id} className="review-container review">
                            <div className="review-header">
                                <div className="review-avatars">
                                    <img src={`${baseUrl}${comment.booking.user.image}`} alt="user" className='Avatar-2ov6K' style={{width:56, height:56,opacity:1, transition: 'opacity 0.3s ease 0s', objectFit:"cover"}}/>
                                    <img src={`${baseUrl}${comment.booking.guide.image}`} alt="guide" className="Avatar-2ov6K AvatarSecond-1NLDl"  style={{width:56, height:56,opacity:1, transition: 'opacity 0.3s ease 0s', objectFit:"cover"}}/>
                                </div>
                                <div className="review-details">
                                    <div className="GuestName"><span>{comment.booking.user.first_name}</span></div>
                                    <div className="About-QkGWM">
                                        <span data-translatekey="Common.Review.aboutHost">About native <a onClick={()=>navigate(`/guide/${comment.booking.guide.id}`)} className="LocalLink-2ABRd">{comment.booking.guide.first_name}</a></span>
                                    </div>
                                    <div>
                                        <div class="Rating-OD72C">
                                            {Array.from({length: comment.rating}, (_, i) => (
                                                <svg key={i} class="Icon-3Pf3U" width="11" height="10" viewBox="0 0 11 10">
                                                    <g><path d="M10.2290238,3.67144 C10.1620238,3.46544 9.97002377,3.32544 9.75302377,3.32544 L6.58302377,3.32544 L5.60202377,0.30944 C5.46702377,-0.10256 4.78602377,-0.10256 4.65102377,0.30944 L3.67002377,3.32544 L0.500023773,3.32544 C0.283023773,3.32544 0.0910237727,3.46544 0.0240237727,3.67144 C-0.0419762273,3.87744 0.0310237727,4.10344 0.206023773,4.23044 L2.77102377,6.09444 L1.79102377,9.11044 C1.72502377,9.31744 1.79802377,9.54244 1.97302377,9.66944 C2.14902377,9.79644 2.38502377,9.79644 2.56102377,9.66944 L5.12602377,7.80544 L7.69202377,9.66944 C7.78002377,9.73344 7.88202377,9.76544 7.98602377,9.76544 C8.08902377,9.76544 8.19202377,9.73344 8.28002377,9.66944 C8.45502377,9.54244 8.52802377,9.31744 8.46102377,9.11044 L7.48202377,6.09444 L10.0470238,4.23044 C10.2220238,4.10344 10.2950238,3.87744 10.2290238,3.67144"></path></g>
                                                </svg>
                                            ))}
                                            {Array.from({length: 5 - comment.rating}, (_, i) => (
                                                <svg key={i + comment.rating} class="grey-Icon-3Pf3U" width="11" height="10" viewBox="0 0 11 10">
                                                    <g><path d="M10.2290238,3.67144 C10.1620238,3.46544 9.97002377,3.32544 9.75302377,3.32544 L6.58302377,3.32544 L5.60202377,0.30944 C5.46702377,-0.10256 4.78602377,-0.10256 4.65102377,0.30944 L3.67002377,3.32544 L0.500023773,3.32544 C0.283023773,3.32544 0.0910237727,3.46544 0.0240237727,3.67144 C-0.0419762273,3.87744 0.0310237727,4.10344 0.206023773,4.23044 L2.77102377,6.09444 L1.79102377,9.11044 C1.72502377,9.31744 1.79802377,9.54244 1.97302377,9.66944 C2.14902377,9.79644 2.38502377,9.79644 2.56102377,9.66944 L5.12602377,7.80544 L7.69202377,9.66944 C7.78002377,9.73344 7.88202377,9.76544 7.98602377,9.76544 C8.08902377,9.76544 8.19202377,9.73344 8.28002377,9.66944 C8.45502377,9.54244 8.52802377,9.31744 8.46102377,9.11044 L7.48202377,6.09444 L10.0470238,4.23044 C10.2220238,4.10344 10.2950238,3.87744 10.2290238,3.67144"></path></g>
                                                </svg>
                                            ))}
                                        </div>
                                        <span class="Created-3AwJh">{comment.date}</span>
                                    </div>                                  
                                </div>
                            </div>
                            <div className="review-content">
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    )
                })} 
                 {commentsToShow < comments.length && (
                <div class="ButtonRow-32zCk"><a onClick={handleShowMoreClick} class="MoreButton-2Fxly">Show more reviews</a></div>
                )}
            </div>
             )} 
        </div> 
    </div>
  )
}

export default CommentsComponent
