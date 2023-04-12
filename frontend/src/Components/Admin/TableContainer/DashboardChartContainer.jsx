import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import revenue from '../../../Assets/images/revenue-icon.png'
import profit from '../../../Assets/images/profit-icon.png'
import refund from '../../../Assets/images/refund-icon.png'
import expences from '../../../Assets/images/expences-icon.png'
import MainChart from '../Charts/MainChart'
import DashboardStats from './DashboardStats'
import axios from '../../../Utils/axios'
import { getAllPayments } from '../../../Utils/Urls'


function DashboardChartContainer() {

  const[payments, setPayments] = useState({})

  useEffect(()=>{
    const user_authTokens = JSON.parse(localStorage.getItem('authTokens'))
    const access = user_authTokens?.access
    axios.get(getAllPayments, {
        headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          setPayments(response.data)
          
        })
        .catch((error)=>{
          console.log(error.response.data)
        })
    },[])

    return (
        <div class="dashboard-Container">
          <div className='dashboard-cards'>

                <div className='dashboard-cards-divider'>

                <div className='dashboard-card'>
                  <div className='dash-card-icon-holder'>
                    <img src={revenue} alt="revenue" />
                  </div>
                  <div className='dashboard-cardHead-container'>
                  <div className='dashboard-cardHead'>
                    <span>Revenue</span>
                    <span>+24</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>{payments?.summary?.revenue}</span>
                  </div>
                  </div>
                </div>

                <div className='dashboard-card'>
                  <div className='dash-card-icon-holder'>
                    <img src={expences} alt="expences" />
                  </div>
                  <div className='dashboard-cardHead-container'>
                  <div className='dashboard-cardHead'>
                    <span>Expenses</span>
                    <span>+12</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>{payments?.summary?.expenses}</span>
                  </div>
                  </div>
                </div>

                </div>

                <div className='dashboard-cards-divider'>

                <div className='dashboard-card'>
                  <div className='dash-card-icon-holder'>
                    <img src={refund} alt="refund" />
                  </div>
                  <div className='dashboard-cardHead-container'>
                  <div className='dashboard-cardHead'>
                    <span>Refunds</span>
                    <span>+11</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>{payments?.summary?.refunds}</span>
                  </div>
                  </div>
                </div>

                <div className='dashboard-card'>
                  <div className='dash-card-icon-holder'>
                    <img src={profit} alt="profit" />
                  </div>
                  <div className='dashboard-cardHead-container'>
                  <div className='dashboard-cardHead'>
                    <span>Profit</span>
                    <span>+28</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>{payments?.summary?.profit}</span>
                  </div>
                  </div>
                </div>

                </div>

          </div>

          <div className='dashboard-main-chart'>
            <MainChart/>
          </div>
       
          <DashboardStats/>
            
        </div>
  )
}

export default DashboardChartContainer
