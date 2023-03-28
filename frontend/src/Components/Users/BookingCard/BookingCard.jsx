import React,{useState} from 'react'
import './BookingCard.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function BookingCard() {
    
    const disabledDatesList = ["2023-03-27", "2023-03-28", "2023-03-31"];
    const [selectedDate, setSelectedDate] = useState(null);
    const isDateDisabled = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        return date < new Date() || disabledDatesList.includes(formattedDate);
      };
  return (
    // <div className='book-block-container book-block-container-fixed'>
    //     <div className="book-block">
    //         <div className="book-price">
    //             <div className="price-detail">€17.79 per person</div>
    //         </div>
    //         <div>
    //             <div className="date-selector">
    //                 <button className='date-selector-button'>
    //                     <div className="button-text">Select date</div>
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
      
    // </div>

    <div className='chat-card-holder'>
    <div className="chat-card-container">
        <div className="chat-card-header">
            <div>
                <h1 className="book-card-title"><strong>€77.79</strong> for a day</h1>
            </div>
            {/* <div className="chat-card-image">
                <div className="chat-card-image-container">
                    <img className='chat-card-avatar' src={avatar} />
                </div>
            </div> */}
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
        <button className='chat-with-me'>Book Now</button>

    </div> 
</div>
  )
}

export default BookingCard
