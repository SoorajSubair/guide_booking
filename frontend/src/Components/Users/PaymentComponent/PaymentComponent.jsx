import React, { useEffect, useState } from 'react'
import './PaymentComponent.css'
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from '../../../Utils/axios';
import { useNavigate } from 'react-router-dom';
import { paymentConfirmed, baseUrl, getBooking } from '../../../Utils/Urls';
import Swal from 'sweetalert2';

function PaymentComponent() {

    const navigate = useNavigate()
    const { id } = useSelector(state => state.user);
    const url = `${getBooking}${id}`
    const [booking, setBooking] = useState({})
    const [amount, setAmount] = useState('')
    const [paymentUrl, setPaymentUrl] = useState('') 
    

    useEffect(()=>{
        if(id){
        const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
        const access = user_authTokens?.access
        axios.get(url, {
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
          })
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data)
                setBooking(response.data)
                setAmount(response.data.destination.fee)
                setPaymentUrl(paymentConfirmed+response.data.id)
              }
            })
        }
    },[url])
    

    return (
        <div className='checkout-body'>
        <div className="checkout-body-container">
            <div className="checkout-main">
                <div className="booking-summary">
                    <div className="booking-summary-top">
                        <div className="booking-text-container">
                            <h3 class="Title-3a4H7">{booking?.destination?.name}</h3>
                            <div className="with-guide">With local guide <span class="HostName-yZEpk">{`${booking?.guide?.first_name} ${booking?.guide?.last_name}`}</span></div>
                        </div>
                        <div className="booking-image-container">
                            <img alt="picture of guide" src={`${baseUrl}${booking?.guide?.image}`}
                            class="Image-z5qgP" width="80" height="80"/>
                        </div>
                    </div>
                </div>
                <div class="checkoutPricingDetails-1UY0V">
                    <ul>
                        <li class="PriceRow-I3UVW">
                            <span class="Label-2CwWD">Booking Date</span>
                            <span class="Value-37DOt">{booking?.date}</span>
                        </li>
                        <li class="PriceRow-I3UVW">
                            <span class="Label-2CwWD">Subtotal</span>
                            <span class="Value-37DOt">€{booking?.destination?.fee}</span>
                        </li>
                        <li class="PriceRow-I3UVW">
                            <span class="Label-2CwWD Strong-3HSn_">Total</span>
                            <span class="Value-37DOt Strong-3HSn_">€{booking?.destination?.fee}</span>
                        </li>
                    </ul>
                </div>
                <h1 class="Title-lEYV8">Select payment</h1>
                <p class="SecureMessage-1Y4KG">
                    <svg fill="#6B9682" class="LockIcon-3H3-i" width="19px" height="22px" viewBox="0 0 19 22"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M13.379889,3.59538922 L13.3914,3.7975 L13.3912,6.26478662 L16.5397,6.2648 C17.8257991,6.2648 18.8853015,7.27285849 18.968004,8.53877208 L18.9732,8.6983 L18.9732,19.8043 C18.9732,21.1439865 17.8793865,22.2378 16.5397,22.2378 L16.5397,22.2378 L2.4337,22.2378 C1.09401347,22.2378 0.000199999999,21.1439865 0.000199999999,19.8043 L0.000199999999,19.8043 L0.000199999999,8.6983 C0.000199999999,7.35861347 1.09401347,6.2648 2.4337,6.2648 L2.4337,6.2648 L5.5832,6.26478662 L5.58364604,4.02818377 C5.51599375,1.87248372 7.20834959,0.0705661824 9.36471623,0.00174604111 C11.4528723,-0.0637865151 13.2093474,1.52222205 13.379889,3.59538922 Z M16.5397,7.2378 L2.4337,7.2378 C1.63138653,7.2378 0.9732,7.89598653 0.9732,8.6983 L0.9732,8.6983 L0.9732,19.8043 C0.9732,20.6066135 1.63138653,21.2648 2.4337,21.2648 L2.4337,21.2648 L16.5397,21.2648 C17.3420135,21.2648 18.0002,20.6066135 18.0002,19.8043 L18.0002,19.8043 L18.0002,8.6983 C18.0002,7.89598653 17.3420135,7.2378 16.5397,7.2378 L16.5397,7.2378 Z M5.5,17 C5.77614237,17 6,17.2238576 6,17.5 C6,17.7761424 5.77614237,18 5.5,18 C5.22385763,18 5,17.7761424 5,17.5 C5,17.2238576 5.22385763,17 5.5,17 Z M9.5,17 C9.77614237,17 10,17.2238576 10,17.5 C10,17.7761424 9.77614237,18 9.5,18 C9.22385763,18 9,17.7761424 9,17.5 C9,17.2238576 9.22385763,17 9.5,17 Z M13.5,17 C13.7761424,17 14,17.2238576 14,17.5 C14,17.7761424 13.7761424,18 13.5,18 C13.2238576,18 13,17.7761424 13,17.5 C13,17.2238576 13.2238576,17 13.5,17 Z M9.39634933,1.00124555 C7.84921434,1.0506222 6.62319859,2.29894066 6.5829486,3.8401009 L6.5832,6.26478662 L12.3912,6.26478662 L12.3916547,3.81345781 C12.3404495,2.2098802 10.9997121,0.950927324 9.39634933,1.00124555 Z" fill="#525252" fill-rule="nonzero"></path></g></svg>
                    <span>This checkout is encrypted and your information is always secure.</span>
                </p>
                <PayPalScriptProvider options={{"client-id":"AaZE31xv7HEfxaZNd1L36B_bJBJYgNh4yHBMCU7wKEh4EtvzOEnim1w5Q72uMcBTxvWG1BSdm9qY3p5e"}}>
                <PayPalButtons
                    className="mt-3"
                    style={{
                        layout: 'horizontal', // or 'vertical'
                        color: 'gold', // 'gold', 'blue', 'silver', or 'black'
                        shape: 'pill', // 'pill' or 'rect'
                        label: 'paypal', // 'paypal', 'checkout', 'pay', or 'credit'
                        tagline: false // true or false
                      }}
                    createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                        {
                            amount: {
                            currency_code: "USD",
                            value: amount,
                            },
                        },
                        ],
                    });
                    }}
                    onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
                        const access = user_authTokens?.access
                        axios.put(paymentUrl, {
                            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Enjoy your trip! ",
                                        showConfirmButton: false,
                                        timer: 1500,
                                      });
                                      navigate('/')
                                
                                }
                            })
                            .catch((err)=>{
                                console.log(err.response.data)
                            })
                        
                    });
                    }}
                />
                </PayPalScriptProvider> 
            </div>
        </div>
        </div>
    )
}

export default PaymentComponent
