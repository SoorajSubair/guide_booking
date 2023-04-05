import React,{useEffect, useState} from 'react'
import './BookingCard.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGuide } from '../../../Context/GuideContext'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { draftBooking,guideBookingDates } from '../../../Utils/Urls';
import axios from '../../../Utils/axios'
import moment from 'moment';



function BookingCard() {
    
    const guide = useGuide()
    const { id } = useSelector(state => state.user);
    const navigate = useNavigate()
    const [disabledDatesList, setDisabeledDatesList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null)

    useEffect(()=>{
      // if(guide){
        const url = `${guideBookingDates}${guide.id}`
        axios.get(url,{
          headers: {'Content-Type': 'multipart/form-data' },
        })
        .then((response)=>{
          setDisabeledDatesList(response.data)
        })
      // }
    },[guide])



    const handleBooking = (guideId)=>{

        const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
        const access = user_authTokens?.access
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        const data = {
            guide: guide.id,
            user: id,
            destination: guide.destination.id,
            date: formattedDate,
          };
          axios.post(draftBooking, data, {
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
          })
            .then((response) => {
              if (response.status === 201 || response.status === 200) {
                navigate(`/checkout`)
              }
              
            })
            .catch((error) => {
                console.log(error.response.data);
                navigate('/login')
            })
    }
  return (


    <div className='chat-card-holder'>
    <div className="chat-card-container">
        <div className="chat-card-header">
            <div>
                <h1 className="book-card-title"><strong>${guide?.destination?.fee}</strong> for a day</h1>
            </div>
        </div>
        <div className="date-selector">
           
            <DatePicker className='date-selector-button'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                excludeDates={disabledDatesList.map((date) => new Date(date))}
                placeholderText="Select date"
            />
       </div>
       {selectedDate ?
        <button onClick={()=>handleBooking(guide?.id)} className='chat-with-me'>Book Now</button>
        :
        ""}
    </div> 
</div>
  )
}

export default BookingCard
