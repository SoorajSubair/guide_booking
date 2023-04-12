import React,{useEffect, useState} from 'react'
import booking from '../../../Assets/images/booking-icon.png'
import destination from '../../../Assets/images/destination-icon.png'
import payment from '../../../Assets/images/payment-icon.png'
import PieChart from '../Charts/PieChart'
import axios from '../../../Utils/axios'
import { getAllStats } from '../../../Utils/Urls'

function DashboardStats() {

    const[stats, setStats] = useState({})

  useEffect(()=>{
    const user_authTokens = JSON.parse(localStorage.getItem('authTokens'))
    const access = user_authTokens?.access
    axios.get(getAllStats, {
        headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          console.log(response.data)
          setStats(response.data)
          
        })
        .catch((error)=>{
          console.log(error.response.data)
        })
    },[])

  return (
    <div className='dashboard-cards-bottom'>

        <div className='dashboard-cards-divider-bottom'>

        <div className='dashboard-card-bottom'>
            <div className='dash-card-icon-holder'>
            <img src={booking} alt="revenue" />
            </div>
            <div className='dashboard-cardHead-container'>
            <div className='dashboard-cardHead'>
            <span>Total Bookings</span>
            </div>
            <div className='dashboard-cardAmount'>
            <span></span>
            <span>{stats?.total_bookings}</span>
            </div>
            <div className='dashboard-cardHead'>
            <span>Cancelled Bookings</span>
            </div>
            <div className='dashboard-cardAmount'>
            <span></span>
            <span>{stats?.total_canceled_bookings}</span>
            </div>
            </div>
        </div>

        <div className='dashboard-card-bottom'>
            <div className='dash-card-icon-holder'>
            <img src={destination} alt="revenue" />
            </div>
            <div className='dashboard-cardHead-container'>
            <div className='dashboard-cardHead'>
            
            <span>Total Destinations</span>
            </div>
            <div className='dashboard-cardAmount'>
            <span></span>
            <span>{stats?.total_destinations}</span>
            </div>
            <div className='dashboard-cardHead'>
            
            <span>Total Guides</span>
            </div>
            <div className='dashboard-cardAmount'>
            <span></span>
            <span>{stats?.total_guides}</span>
            </div>
            </div>
        </div>

        </div>

        <div className='transaction-card-container'>
        <div className='transaction-card-bottom'>
            <div className='dash-card-icon-holder'>
            <img src={payment} alt="revenue" />
            </div>
            <div className='dashboard-cardHead-container'>
            <div className='dashboard-cardHead'>
            <span>Paypal Payments</span>
            </div>
            <div className='dashboard-cardAmount'>
            <span>$</span>
            <span>{stats?.paypal_payments}</span>
            </div>
            <div className='dashboard-cardHead'>
            <span>Razorpay Payments</span>
            </div>
            <div className='dashboard-cardAmount'>
            <span>$</span>
            <span>{stats?.razorpay_payments}</span>
            </div>
            </div>
        </div>
            <div className='transaction-pie-chart'>
            <PieChart paypal={stats?.paypal_payments} razorpay={stats?.razorpay_payments}/>
            </div>
        </div>

    </div>
  )
}

export default DashboardStats
