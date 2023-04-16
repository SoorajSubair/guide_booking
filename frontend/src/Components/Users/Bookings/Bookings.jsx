import React,{useState, useEffect} from 'react'
import './Bookings.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";    
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from '../../../Utils/axios'
import { createComment, getUserAllbookings,getUserCancelledbookings,getUserCompletedbookings,cancelBooking, createOrStartChat } from "../../../Utils/Urls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";


function Bookings() {

    const [customers, setCustomers] = useState(null);
    const [isMounted, setIsMounted] = useState(false)
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const { id } = useSelector(state => state.user);
    const url = id ? `${getUserAllbookings}${id}` : "";
    const [bookingUrl, setBookingUrl] = useState(url)
    const [bookingType, setBookingType] = useState('Bookings');
    const [bookingToggleType, setBookingToggleType] = useState('Cancelled Bookings')
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
    const access = user_authTokens?.access
    const navigate = useNavigate();
    const stars = Array(5).fill(0)
    const [currentStarValue, setCurrentStarValue] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverStarValue, setHoverStarValue] = useState(undefined);
    const colors = {
        pink: "#e71575",
        grey: "#a9a9a9"
        
    };


    useEffect(()=>{
        if(id){
        const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
        const access = user_authTokens?.access
        axios.get(bookingUrl, {
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
          })
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data)
                setCustomers((getCustomers(response.data)));
                setLoading(false);
               
              }
            })
            .catch((error)=>{
                setCustomers(null)
                
            })
        }
    },[isMounted,bookingUrl])

    useEffect(() => {
        setBookingUrl(url);
      }, [url]);

    
    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

   

    const deleteBodyTemplate = (rowData) => {
        const bookingId = rowData.id
        const tripStarted = rowData.trip_started

        return (
            <>
            {!tripStarted &&
            <div className="flex align-items-center gap-2" style={{display: 'flex',justifyContent: 'start',alignItems: 'center' }}>
                <button className="cancel-button" onClick={() => handleCancel(bookingId)}>Cancel</button>
            </div>
            }
            </>
        )
    }

    const [code, setCode] = useState(null);
    const showDialog = (code) => {
        setCode(code);
    }
    const hideDialog = () => {
        setCode(null);
    }

        const viewBodyTemplate = (rowData) => {
        const startCode = rowData.is_start_code;
        const endCode = rowData.is_end_code;
        const tripStarted = rowData.trip_started;
        
        

        return (
            <>
            {!tripStarted ? (
                <div className="flex align-items-center gap-2" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <button className="code-button" onClick={() => showDialog(startCode)}>Start Code</button>
                </div>
            ) :
             (
                <div className="flex align-items-center gap-2" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <button className="code-button" onClick={() => showDialog(endCode)}>End Code</button>
                </div>
            )}
            </>
        )
    }



    const [commentId, setCommentId] = useState(null);
    const showCommentDialog = (tripId) => {
        setCommentId(tripId);
    }
    const hideCommentDialog = () => {
        setCommentId(null);
        setCurrentStarValue(0)
        setHoverStarValue(undefined)
        setComment('')
    }

    const CommentBodyTemplate = (rowData) => {
        const tripId = rowData.id;
        
        return (
        
            <div className="flex align-items-center gap-2" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <button className="code-button" onClick={() => showCommentDialog(tripId)}>Rate</button>
            </div>
        )
    }

    const ChatBodyTemplate = (rowData) => {
        const userId = rowData.user.id;
        const guideId = rowData.guide.id;
        return (
        
            <div className="flex align-items-center gap-2" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <button className="chat-button" onClick={() =>handleChat(userId,guideId) }>Chat</button>
            </div>
        )
    }

    const handleChat = (userId, guideId) =>{
        const data = {
            userId,
            guideId
        }

        axios.post(createOrStartChat, data, {
            headers: {'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            navigate(`/chat/${response.data.id}`)
        })
        .catch((e) =>{
            console.log(e.response.data)
        })

    }


    const handleCancel = (bookingId) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
        
            const cancelUrl = `${cancelBooking}${bookingId}`
            axios
            .put(cancelUrl, { is_declined: true }, {
                headers: {
                    Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                  },
            })
            .then((response) => {
                if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Booking Canceled, Payment will Refunded to your wallet in 7 working days",
                    showConfirmButton: false,
                    timer: 2000,
                  });
              setIsMounted(!isMounted)
                }
            })
            .catch((error) => {
              console.log("error",error);
            });

          }
        });
        
      };


    const header = renderHeader();

    function formatDate(dateStr) {
        const dateObj = new Date(dateStr);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return dateObj.toLocaleDateString('en-IN', options);
      }
    
    // const verifiedBodyTemplate = (rowData) => {
    //     return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.is_accepted, 'false-icon pi-times-circle': !rowData.is_accepted })}></i>;
    // };

    const refundBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.payment.is_refunded, 'false-icon pi-times-circle': !rowData.payment.is_refunded })}></i>;
    };

    const handleBooking = (type) => {
        setBookingType(type)
        if(type === 'Cancelled Bookings'){
            setBookingToggleType('Completed Bookings')
            setBookingUrl(`${getUserCancelledbookings}${id}`)

        }
        else if(type === 'Completed Bookings'){
            setBookingToggleType('Bookings')
            setBookingUrl(`${getUserCompletedbookings}${id}`)

        }
        else if(type === 'Bookings'){
            setBookingToggleType('Cancelled Bookings')
            setBookingUrl(`${getUserAllbookings}${id}`)

        }
    }

    const handleStarClick = value => {
        setCurrentStarValue(value)
      }
    
      const handleStarMouseOver = newHoverValue => {
        setHoverStarValue(newHoverValue)
      };
    
      const handleStarMouseLeave = () => {
        setHoverStarValue(undefined)
      }
    
    const handleCommentSubmit = (commentId) =>{
        const createCommentUrl = `${createComment}${commentId}`
        const data = {
            rating:currentStarValue,
            comment:comment
        }
        axios.post(createCommentUrl, data,{
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
        })
        .then((response)=>{
            if(response.status == 201){
                setCommentId(null);
                setCurrentStarValue(0)
                setHoverStarValue(undefined)
                setComment('')
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thank you for your feedback",
                    showConfirmButton: false,
                    timer: 2000,
                  });
            }
            else{
                setCommentId(null);
                setCurrentStarValue(0)
                setHoverStarValue(undefined)
                setComment('')
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Sorry, something went wrong",
                    showConfirmButton: false,
                    timer: 2000,
                  });
            }
        })
        .catch((error)=>{
            setCommentId(null);
            setCurrentStarValue(0)
            setHoverStarValue(undefined)
            setComment('')
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Sorry, something went wrong",
                showConfirmButton: false,
                timer: 2000,
              });
        })

    }


  return (
    <div className='booking-container'>
        <div className="booking-master">
            <div className="bookings-header">
                <h3 class="Title-MBBEe">{bookingType}</h3>
                <span class="Action-24rBX" onClick={()=>handleBooking(bookingToggleType)}>{bookingToggleType}</span>
            </div>
            <div class="Scroller-3PXJ1">
                {customers===null ?
                <div class="Container-1G5cP">
                    <svg class="SVG-Xp0aR" viewBox="0 0 397.68 268.72" width="320" height="216">
                        <g fill="#E71575">
                            <path d="M106.52,58.9h37.17a.75.75,0,0,0,0-1.5H106.52a.75.75,0,0,0,0,1.5Z"></path>
                            <path d="M106.52,69h37.17a.75.75,0,0,0,0-1.5H106.52a.75.75,0,0,0,0,1.5Z"></path>
                            <path d="M106.52,79.16h37.17a.75.75,0,0,0,0-1.5H106.52a.75.75,0,0,0,0,1.5Z"></path>
                            <path d="M133.55,87.8h-27a.75.75,0,0,0,0,1.5h27a.75.75,0,0,0,0-1.5Z"></path>
                            <path d="M169.71,86.89a6,6,0,0,0,2.12.38c2.59,0,5.36-1.47,8.06-2.91s5.27-2.79,7.73-2.93c3.63-.2,5.51-1.85,5.77-3.39a2.21,2.21,0,0,0-1.5-2.45c-9.33-3.76-15.77-3.43-18.13.91a18.53,18.53,0,0,1-3.28,3.88c-1.69,1.68-3.15,3.13-2.85,4.6C167.81,85.79,168.49,86.42,169.71,86.89Zm1.83-5.45a19.8,19.8,0,0,0,3.54-4.22c1-1.81,3-2.72,5.89-2.72A29.19,29.19,0,0,1,191.33,77a.76.76,0,0,1,.58.81c-.13.74-1.42,2-4.37,2.14-2.79.16-5.62,1.66-8.35,3.11-3.31,1.75-6.43,3.41-8.94,2.45-.67-.26-1.09-.56-1.15-.83C169,84,170.33,82.64,171.54,81.44Z"></path>
                            <path d="M260.32,174.45l.38,0c2-.28,2.24-2,2.48-3.54a8.73,8.73,0,0,1,1-3.4l.65-1c1.69-2.67,2.61-4.23,1.87-5.21-.61-.81-1.82-.45-2.28-.32l-.05,0c-.68.25-6.67,2.54-7.09,5.65-.24,1.78-.28,5.56,1.33,7.16A2.36,2.36,0,0,0,260.32,174.45Zm-1.53-7.66c.23-1.67,3.86-3.6,6.11-4.44a3.9,3.9,0,0,1,.57-.12,18.36,18.36,0,0,1-1.88,3.42c-.22.35-.44.7-.65,1a10,10,0,0,0-1.24,4c-.27,1.73-.44,2.18-1.22,2.29a.85.85,0,0,1-.78-.26C258.77,171.76,258.51,168.91,258.79,166.79Z"></path>
                            <path d="M304.73,113.91h-17a12.25,12.25,0,0,0-12.24,12.23V180a12.25,12.25,0,0,0,12.24,12.24h17A12.24,12.24,0,0,0,317,180V126.14A12.24,12.24,0,0,0,304.73,113.91ZM315.46,180a10.75,10.75,0,0,1-10.73,10.74h-17A10.75,10.75,0,0,1,277,180V126.14a10.75,10.75,0,0,1,10.74-10.73h17a10.74,10.74,0,0,1,10.73,10.73Z"></path>
                            <path d="M301.73,146a6.36,6.36,0,0,0-5.69,3.53,6.36,6.36,0,1,0,0,5.68,6.36,6.36,0,1,0,5.68-9.21Zm-11.37,11.24a4.86,4.86,0,1,1,4.86-4.86A4.87,4.87,0,0,1,290.36,157.22Zm11.37,0a4.86,4.86,0,1,1,4.86-4.86A4.87,4.87,0,0,1,301.73,157.2Z"></path>
                            <path d="M320.53,105h0a.75.75,0,0,0,.75-.75l.2-21.58a.74.74,0,0,0-.74-.75.76.76,0,0,0-.76.74l-.2,21.58A.76.76,0,0,0,320.53,105Z"></path>
                            <path d="M325.57,110.43a.74.74,0,0,0,.74.65h.11l21.36-3a.75.75,0,1,0-.21-1.49l-21.36,3A.74.74,0,0,0,325.57,110.43Z"></path>
                            <path d="M324.85,106.58a.75.75,0,0,0,.55-.24L340,90.49a.74.74,0,0,0,0-1.06.75.75,0,0,0-1.06,0L324.3,105.33a.74.74,0,0,0,.55,1.25Z"></path>
                            <path d="M273.83,63.3c.21.1.42.17.64.26A5.69,5.69,0,0,1,276.8,65a7.38,7.38,0,0,1,1.72,2.71c.06.16.12.31.19.46a.75.75,0,0,0,.68.45h0a.75.75,0,0,0,.68-.44A10.57,10.57,0,0,1,282,65.09a7.19,7.19,0,0,1,3.23-1.79.75.75,0,0,0,0-1.41,8.81,8.81,0,0,1-3.13-2h0a9.72,9.72,0,0,1-2-3.33.77.77,0,0,0-.72-.48.76.76,0,0,0-.69.52,9.42,9.42,0,0,1-2.12,3.51,8.73,8.73,0,0,1-2.79,1.78.75.75,0,0,0,0,1.37Zm3.84-2.09a10.41,10.41,0,0,0,1.79-2.49A9.43,9.43,0,0,0,281.11,61a9.25,9.25,0,0,0,2,1.52A7.66,7.66,0,0,0,281,64a9.74,9.74,0,0,0-1.52,2.08,8.35,8.35,0,0,0-1.58-2.18,6.87,6.87,0,0,0-1.93-1.39A8.18,8.18,0,0,0,277.67,61.21Z"></path>
                            <path d="M200,50.72l12.16-12.9A8.15,8.15,0,0,0,200,27a8.13,8.13,0,0,0-14,5.73,7.33,7.33,0,0,0,1.56,4.8ZM194.25,26a6.7,6.7,0,0,1,5.19,2.54l.58.72.58-.72a6.64,6.64,0,0,1,11.87,4.14A6.56,6.56,0,0,1,211,36.85L200,48.53,188.73,36.46a5.84,5.84,0,0,1-1.16-3.78A6.69,6.69,0,0,1,194.25,26Z"></path>
                            <path d="M60.12,107.89c.28.12.56.22.84.33a7.76,7.76,0,0,1,3.2,2,9.78,9.78,0,0,1,2.33,3.69c.09.2.17.41.26.61a.77.77,0,0,0,.68.45h0a.76.76,0,0,0,.68-.44,14.44,14.44,0,0,1,2.65-4.19,9.63,9.63,0,0,1,4.4-2.43.76.76,0,0,0,.52-.7.76.76,0,0,0-.48-.72A11.78,11.78,0,0,1,71,103.8a13.28,13.28,0,0,1-2.76-4.52.72.72,0,0,0-.71-.48.74.74,0,0,0-.69.52,12.93,12.93,0,0,1-2.89,4.77,11.68,11.68,0,0,1-3.79,2.42.77.77,0,0,0-.44.69A.76.76,0,0,0,60.12,107.89ZM65,105.15a13.49,13.49,0,0,0,2.56-3.69,13,13,0,0,0,2.37,3.4,12.59,12.59,0,0,0,3,2.22,10.11,10.11,0,0,0-3.23,2.17,13.35,13.35,0,0,0-2.22,3.14,10.57,10.57,0,0,0-2.27-3.26,8.64,8.64,0,0,0-2.94-2A11.4,11.4,0,0,0,65,105.15Z"></path>
                            <path d="M394.49,159l-71.88-.1V119.71a12.25,12.25,0,0,0-12.23-12.23H282.09A12.24,12.24,0,0,0,272.6,112a8,8,0,0,0-1.26-2.54l-.69-1.11a80.39,80.39,0,0,0-112.72-29l-.12,0c-1.11.66-2.19,1.36-3.24,2.08V44.64a.75.75,0,0,0-.75-.75H96.38a.75.75,0,0,0-.53.22.77.77,0,0,0-.22.53c.05,21.38.07,42.94.08,61.79v3.39a.74.74,0,0,0,.23.54l9.53,9.12a.75.75,0,0,0,1,0l5.86-5.58,5.84,5.58a.74.74,0,0,0,1,0l5.87-5.59,1.64,1.57a81.72,81.72,0,0,0-4.88,15.23H76.7a9.38,9.38,0,0,0-9.37,9.37v19.22l-65-.1h0a.75.75,0,0,0,0,1.5l65,.1v11.34a9.38,9.38,0,0,0,9.37,9.37h6.8l.32,7.14,9.74-7.14h34a81.43,81.43,0,0,0,8.95,14.84,80.63,80.63,0,0,0,64.07,31.73h1.2A73.61,73.61,0,0,0,224,224.68a.84.84,0,0,0,.41-.28,80.51,80.51,0,0,0,21.7-10.59h.08a.73.73,0,0,0,.34-.14c.17-.13,1.32-1,3-2.39a80.39,80.39,0,0,0,10.79-10,60.59,60.59,0,0,0,9.69-13.07,12.26,12.26,0,0,0,12,10.08h28.29A12.25,12.25,0,0,0,322.61,186V160.4l71.87.1h0a.75.75,0,0,0,0-1.5Zm-135.35-9.47.49.64c1.35,1.75,2.87,3.73,2.52,5.13-.18.69-.86,1.31-2,1.83-1.63.73-3,.67-3.87-.18-1.16-1.09-1.39-3.28-.58-5.43s.88-2.89.5-3.52a2.12,2.12,0,0,0-1.75-.78,6.56,6.56,0,0,1-1.8-.4c-.86-.35-1-2.2-1.2-3.83-.21-2.16-.44-4.61-2.58-4.53-2.3.08-2.67,1.77-3,3-.31,1.41-.58,2.63-2.79,3.1-3.88.83-4.17,2.41-4.15,4.74a9.67,9.67,0,0,1-.21,2.45,3.7,3.7,0,0,1-2.34,2.51,1,1,0,0,1-1-.12c-.18-.17-.71-.92-.09-3.41.23-.93.47-1.84.71-2.73,1.72-6.48,3.34-12.59-2.56-14.77s-7.51-4-9.33-7.5a6.81,6.81,0,0,0-4.47-3.74,6,6,0,0,0-5.06,1.19,4.77,4.77,0,0,0-1.73,5,5.13,5.13,0,0,0,4.54,3.69c3.6.49,5.87,1.86,6.4,3.88a4.52,4.52,0,0,1-1.75,4.55,3.07,3.07,0,0,1-3.43.37c-2.76-1.6-5.57-1.41-7-.56a2.1,2.1,0,0,0-1.17,1.86c0,.66.41,1.63,2.17,2.55,2.73,1.41,4.15,2.75,4.1,3.86-.09,2-5.1,4.13-6.74,4.81a16.84,16.84,0,0,0-8.23,8.52,6.41,6.41,0,0,0-.14,5c.34.76.72,1.47,1.09,2.16.88,1.66,1.71,3.22,1.31,4.12-.25.57-1.06,1-2.39,1.36-5.18,1.3-5.77,2-7.43,4.77l-.32.52c-2.82,4.63-6.41,9.88-9.16,9.53-1.65-.21-3.2-2.57-4.47-6.83-2.65-8.84-1.61-12.13-.7-15a17.4,17.4,0,0,0,.79-3.18,8.74,8.74,0,0,0-1.25-5.49,7.81,7.81,0,0,1-1.08-5.62,6,6,0,0,0-1.29-5.33,9.71,9.71,0,0,0-7.14-3h-.4c-2.32.1-5.66,0-7.87-2.21-1.73-1.73-2.53-4.52-2.37-8.3.33-8.07,4.64-12.11,7.78-15.06a17.86,17.86,0,0,0,2.57-2.72c2-3,4.3-6.33,12.17-4.93,8.4,1.5,8.35,1.88,7.95,4.83a4.11,4.11,0,0,0,1.1,3.49c2.45,2.63,8.22,3,11.24,2.81s5-1.31,5.21-3c.24-1.5-1-2.92-3.21-3.81-3.52-1.39-6.29-4.52-8.74-7.29-3.11-3.5-6.05-6.81-9.83-5.67a13.06,13.06,0,0,0-2.32,1.12c-2.75,1.52-4.81,2.44-6.28.51-.55-.73-1.13-1.74-.75-2.43s2-1.44,5.44-1.21a3.14,3.14,0,0,0,2.55-.66,3.06,3.06,0,0,0,.55-2.53c0-.59-.1-1.21.15-1.46s.6-.37,1.93-.24c9.11.87,15.77-.34,16.2-3,.13-.77-.21-2.2-3.87-3.06-2.86-.67-4.21-2-4.5-3a1.09,1.09,0,0,1,.22-1.12c.65-.69,2.16-.83,4-.38,4.19,1,6.64-.61,8.61-1.9,1.4-.92,2.51-1.65,4-1.41.55.09,1.23.29,1.36.73.21.67-.54,2.31-3.26,4.9-1.35,1.28-1,2.23-.72,2.68,1.84,2.68,14.62,1.22,16.79.19a4.34,4.34,0,0,0,1.84-1.9,3.83,3.83,0,0,1,2.08-1.94c3.34-1.29,7.31-.43,10.88,2.37,1.54,1.21,5.45,2.22,9.58,3.3s8.7,2.27,10.21,3.54c3,2.53,6.29,7.84,9.21,12.53l.08.12c.35.62.7,1.25,1,1.89-.33-.24-.68-.48-1-.72-3.12-2.27-5.64-4-7.25-3.54a1.67,1.67,0,0,0-1.13,1c-1.28,2.88,2.32,5.7,5.5,8.19a26,26,0,0,1,3.58,3.14c0,.33,0,.66,0,1v10.4l-.34-.07c-1.88-.44-3.66-.84-4.37.26-.6.93-.06,2.36,1.87,4.9,1.24,1.64,2.2,4.18,1.53,5.67a2.64,2.64,0,0,1-2.45,1.33c-3.69.29-6.65,1.74-7.53,3.71A3.38,3.38,0,0,0,259.14,149.53Zm9.07-15.23c-1.89-2.48-1.81-3.15-1.84-3.15h0a7.67,7.67,0,0,1,2.81.35l.67.15v5.8A10.83,10.83,0,0,0,268.21,134.3Zm2-17.44c-.82-.79-1.84-1.6-2.95-2.47-2.75-2.15-5.86-4.59-5.06-6.4a.24.24,0,0,1,.15-.15c1.05-.28,4.25,2.06,6,3.32a12.07,12.07,0,0,0,3.13,2c.05.11.1.22.16.33A12.08,12.08,0,0,0,270.2,116.86ZM158.26,86a19.59,19.59,0,0,0-1.5,5.28c-.22,2.4-.63,4.77-2.15,5.91-1,.75-2.4.94-4.3.57a20.65,20.65,0,0,0-10.74.64l-.93.26a82.57,82.57,0,0,1,6.68-7.48,80.25,80.25,0,0,1,7.36-6.35q2.73-2.08,5.6-3.9C159.77,81.67,159.45,82.93,158.26,86Zm-32.63,26.34a.77.77,0,0,0-1,0l-5.86,5.59-5.84-5.58a.74.74,0,0,0-1,0L106,117.9l-8.79-8.4v-3.07c0-18.63,0-39.91-.07-61h55.93V82.52a77.14,77.14,0,0,0-8.79,7.55A79.69,79.69,0,0,0,127.39,114ZM93.07,180l-7.88,5.77L84.93,180H76.7a7.88,7.88,0,0,1-7.87-7.87V140.06a7.88,7.88,0,0,1,7.87-7.87h58.47a7.88,7.88,0,0,1,7.87,7.87v32.06a7.88,7.88,0,0,1-7.87,7.87Zm44.61,15.44a79.33,79.33,0,0,1-8.47-13.94h6a9.38,9.38,0,0,0,9.37-9.37V140.06a9.38,9.38,0,0,0-9.37-9.37H123.41a78.2,78.2,0,0,1,13.72-30.19,28.15,28.15,0,0,0,2.85-.69A19.14,19.14,0,0,1,150,99.2c2.3.45,4.14.17,5.48-.84,2-1.49,2.49-4.23,2.74-7a18.37,18.37,0,0,1,1.41-4.87c1-2.44,1.93-5,0-6.48a78.11,78.11,0,0,1,40.64-11.39,79.87,79.87,0,0,1,10.77.73,78.55,78.55,0,0,1,46.69,24c-2.11-.79-4.88-1.51-7.76-2.26-3.8-1-7.74-2-9-3C237,85,232.5,84,228.65,85.51a5.35,5.35,0,0,0-2.83,2.56,2.86,2.86,0,0,1-1.19,1.32c-1.81.85-11.67,1.81-14.47.61-.39-.17-.45-.3-.45-.3s0-.23.53-.74c2.93-2.79,4.12-4.89,3.65-6.42q-.44-1.41-2.55-1.77c-2-.33-3.56.67-5,1.64-1.9,1.25-3.87,2.54-7.43,1.69-2.44-.59-4.44-.29-5.48.81a2.59,2.59,0,0,0-.57,2.58c.55,1.81,2.64,3.31,5.6,4,2.17.51,2.76,1.18,2.73,1.36-.15.9-4.56,2.67-14.58,1.7-1.51-.14-2.5.07-3.12.67a3.17,3.17,0,0,0-.6,2.65c.05.56.09,1.14-.12,1.36s-.4.27-1.38.21c-3.6-.24-6,.47-6.86,2-.42.78-.61,2.11.87,4,2.37,3.13,5.88,1.18,8.2-.1a11.92,11.92,0,0,1,2-1c2.86-.86,5.36,2,8.26,5.23,2.57,2.89,5.47,6.16,9.32,7.69,1.5.59,2.4,1.44,2.28,2.17s-1.36,1.58-3.82,1.74c-3.58.22-8.25-.41-10-2.35a2.61,2.61,0,0,1-.71-2.26c.62-4.58-1.23-5.09-9.18-6.51-8.82-1.57-11.62,2.56-13.67,5.57a17.76,17.76,0,0,1-2.36,2.47c-3.14,3-7.89,7.41-8.25,16.09-.18,4.21.77,7.38,2.81,9.42,2.64,2.62,6.39,2.76,9,2.65a8.24,8.24,0,0,1,6.33,2.43,4.56,4.56,0,0,1,1,4.06,9.29,9.29,0,0,0,1.2,6.58,7.35,7.35,0,0,1,1.12,4.63,16.76,16.76,0,0,1-.74,2.93c-1,3.11-2.08,6.64.69,15.92,1.5,5,3.37,7.59,5.71,7.89l.46,0c3.43,0,6.91-4.91,10.18-10.26l.32-.54c1.44-2.39,1.74-2.88,6.52-4.09,1.83-.46,2.94-1.18,3.39-2.2.7-1.57-.26-3.36-1.36-5.43-.35-.68-.72-1.37-1-2.09a5.12,5.12,0,0,1,.18-3.88,15.38,15.38,0,0,1,7.41-7.67c3.72-1.56,7.55-3.5,7.66-6.14.07-1.81-1.48-3.48-4.91-5.25-1-.52-1.35-1-1.36-1.27s.3-.44.44-.52c1.08-.64,3.37-.66,5.48.57a4.49,4.49,0,0,0,5.09-.48,6,6,0,0,0,2.3-6.12c-.4-1.53-1.93-4.21-7.65-5a3.63,3.63,0,0,1-3.29-2.58,3.28,3.28,0,0,1,1.19-3.46,4.58,4.58,0,0,1,3.82-.92,5.35,5.35,0,0,1,3.47,3c2,3.82,3.89,5.91,10.14,8.23,4.41,1.63,3.54,5.78,1.63,13-.24.9-.48,1.82-.72,2.75-.58,2.34-.41,4,.51,4.87a2.45,2.45,0,0,0,2.48.47,5.17,5.17,0,0,0,3.37-3.6,11.15,11.15,0,0,0,.25-2.81c0-1.86,0-2.63,3-3.26,3.16-.67,3.61-2.73,4-4.24.29-1.33.45-1.8,1.54-1.83h0c.66,0,.83,1.32,1,3.18.2,2.05.43,4.39,2.15,5.07a7.61,7.61,0,0,0,2.17.5,5.83,5.83,0,0,1,.64.1,6.79,6.79,0,0,1-.61,2.18c-1,2.71-.64,5.55.95,7,.78.74,2.54,1.78,5.51.46a4.49,4.49,0,0,0,2.88-2.84c.53-2.09-1.16-4.29-2.79-6.41l-.48-.63a2,2,0,0,1-.42-2.1c.65-1.42,3.23-2.59,6.29-2.82a4,4,0,0,0,3.64-2.11v43.7l-.57,1c-1.76-1-7.23-2.35-9.32.72s-3.22,3.42-8.5,4.42a28.79,28.79,0,0,1-6.16.15c-3.34-.14-6.5-.28-8,1.17a3,3,0,0,0-.9,2.22c0,4.61,4.08,5.27,7.07,5.76,2.4.38,3.86.7,4,1.81s-.94,1.89-2.79,2.92c-2.11,1.17-4.73,2.63-4.16,5.88.26,1.47,1.55,2.14,2.94,2.39a79.18,79.18,0,0,1-19.22,9.11c-1.34-2-6-5.53-9-5.63a26.09,26.09,0,0,0-6.23,1c-4.62,1.13-9.4,2.3-12-.81-3.58-4.34-7.21-6.66-10.78-6.88a8,8,0,0,0-4.19,1.3,14.26,14.26,0,0,1-8,2c-.85,0-1.84-.12-2.9-.21-5.49-.45-9.46-.64-10.62,1.17a1.81,1.81,0,0,0-.27.81A78.86,78.86,0,0,1,137.68,195.43ZM260.3,199.1a116,116,0,0,1-12.07,11.32c-.87.66-1.75,1.3-2.65,1.93-1.17.08-3.34,0-3.56-1.24-.36-2.05,1-3,3.41-4.31,1.82-1,3.89-2.16,3.54-4.45s-2.86-2.68-5.28-3.07c-3.52-.57-5.82-1.18-5.81-4.27a1.5,1.5,0,0,1,.43-1.14c.71-.68,2.27-.84,4.09-.84.9,0,1.88,0,2.84.08a29.52,29.52,0,0,0,6.5-.17c5.61-1.07,7.15-1.66,9.46-5.05a3.55,3.55,0,0,1,2.89-1.25,9.31,9.31,0,0,1,4.44,1A78.85,78.85,0,0,1,260.3,199.1Zm-59.93,27.44a86.51,86.51,0,0,1-38.33-10c-.16-.32-.28-.7-.13-.93.76-1.19,6.07-.75,9.24-.48,1.07.09,2.09.17,2.95.21a15.61,15.61,0,0,0,8.71-2.15,6.94,6.94,0,0,1,3.42-1.14c3.14.19,6.41,2.32,9.71,6.34,3.16,3.83,8.64,2.49,13.48,1.31a23.65,23.65,0,0,1,5.82-1c2.52.09,6.28,3.18,7.51,4.6A78.28,78.28,0,0,1,200.37,226.54ZM321.11,186a10.75,10.75,0,0,1-10.73,10.74H282.09A10.75,10.75,0,0,1,271.35,186V119.71A10.75,10.75,0,0,1,282.09,109h28.29a10.74,10.74,0,0,1,10.73,10.73Z"></path>
                        </g>
                    </svg>
                <div class="TextContainer-2_LWV">
                    <h2 class="Title-1gcCM">No {bookingType}</h2>
                    <p class="Paragraph-3uxbv Text-1tW9S">
                        <a class="Link-1XBPn">Explore things to do.</a>
                    </p>
                </div>
                </div>
                :
                <div className="guide-schedule-card user-card">
                    <DataTable value={customers} paginator rows={5} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                            globalFilterFields={['guide.first_name','guide.last_name', 'destination.name', 'date', 'destination.fee']} header={header} emptyMessage="No Bookings found.">
                        <Column field='guide.first_name' header="Guide" style={{ minWidth: '12rem' }} body={rowData => rowData.guide.first_name + ' ' + rowData.guide.last_name}/>
                        <Column field="destination.name" header="Destination" style={{ minWidth: '12rem' }} />
                        <Column field="date" header="Date" style={{ minWidth: '6rem' }} body={rowData => formatDate(rowData.date)}/>
                        <Column field="destination.fee" header="Amount" style={{ minWidth: '6rem' }} body={rowData => '$ ' + rowData.destination.fee}/>
                        {bookingType === 'Cancelled Bookings' &&
                        <Column field="payment.is_refunded" header="Refunded" dataType="boolean" style={{ minWidth: '6rem' }} body={refundBodyTemplate} />
                        }
                        {bookingType === 'Bookings' &&
                        <Column header=""  style={{ minWidth: '7rem' }} body={viewBodyTemplate} />
                        }
                        {bookingType === 'Bookings' &&
                        <Column header=""  style={{ minWidth: '7rem' }} body={ChatBodyTemplate} />
                        }
                        {bookingType === 'Completed Bookings' &&
                        <Column header=""  style={{ minWidth: '7rem' }} body={CommentBodyTemplate} />
                        }
                        {bookingType === 'Bookings' &&
                        <Column header=""  style={{ minWidth: '7rem' }} body={deleteBodyTemplate} />
                        }
                    </DataTable>

                    <Dialog visible={code !== null} onHide={hideDialog}>
                        <p>Don't share this code to the guide unnecessarily!</p>
                        <strong style={{display:'flex', justifyContent:'center'}}>{code}</strong>
                    </Dialog>

                    <Dialog visible={commentId !== null} onHide={hideCommentDialog}>
                        <p style={{display:"flex", justifyContent:"center"}}>Rate your trip</p>
                            <div className='star-container'>
                                {stars.map((_, index) => {
                                return (
                                    <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleStarClick(index + 1)}
                                    onMouseOver={() => handleStarMouseOver(index + 1)}
                                    onMouseLeave={handleStarMouseLeave}
                                    color={(hoverStarValue || currentStarValue) > index ? colors.pink : colors.grey}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                    />
                                )
                                })}
                            </div>
                        <textarea className='comment-box' value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="What's your experience?"/>
                        <button className='comment-submit-button' onClick={()=>handleCommentSubmit(commentId)}>Submit</button>
                    </Dialog>
                </div>
                }
            </div>
        </div>
      
    </div>
  )
}

export default Bookings
