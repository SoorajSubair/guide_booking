import React from 'react'
import './Dashboard.css'
import revenue from '../../../Assets/images/revenue-icon.png'
import profit from '../../../Assets/images/profit-icon.png'
import refund from '../../../Assets/images/refund-icon.png'
import expences from '../../../Assets/images/expences-icon.png'
import booking from '../../../Assets/images/booking-icon.png'
import destination from '../../../Assets/images/destination-icon.png'
import payment from '../../../Assets/images/payment-icon.png'
import MainChart from '../Charts/MainChart'
import PieChart from '../Charts/PieChart'


function DashboardChartContainer() {
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
                    <span>123.00</span>
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
                    <span>+24</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>123.00</span>
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
                    <span>+24</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>123.00</span>
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
                    <span>+24</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>123.00</span>
                  </div>
                  </div>
                </div>

                </div>

          </div>

          <div className='dashboard-main-chart'>
          <div className="main-chart-title">
            <span>weekly Revenue</span>
            <div className='main-chat-filter'>
            <select>
              <option value="">Daily</option>
              <option value="">Monthy</option>
              {/* <option value="">1 year</option> */}
            </select>
          </div>
          </div>

            <MainChart/>
          </div>
       
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
                    <span>123</span>
                  </div>
                  <div className='dashboard-cardHead'>
                    <span>Cancelled Bookings</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span></span>
                    <span>123</span>
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
                    <span>123</span>
                  </div>
                  <div className='dashboard-cardHead'>
                    
                    <span>Total Guides</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span></span>
                    <span>123</span>
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
                    <span>123.00</span>
                  </div>
                  <div className='dashboard-cardHead'>
                    <span>Razorpay Payments</span>
                  </div>
                  <div className='dashboard-cardAmount'>
                    <span>$</span>
                    <span>123.00</span>
                  </div>
                  </div>
                </div>
                  <div className='transaction-pie-chart'>
                    <PieChart/>
                  </div>
                </div>

          </div>
            
        </div>
  )
}

export default DashboardChartContainer
