import React,{useState, useEffect} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import PaymentForm from './StripeForm.jsx';
import NavBar from '../Navbar/Navbar.jsx';



const stripePromise = loadStripe("pk_test_51Mt43MSIJzgxW7EBR4vD2tPStF7cjW5T7e63nfAqDiX2YFqtlJN1jOsPdYdqlEOeMUGbAPkDlBM0Lp3XvprJLEks00YdYnDypA");

const StripeCheckout = () => {
   
    const [clientsecret, setClientSecret]=useState('pi_3Mt6wbSIJzgxW7EB096OsgEH_secret_AypiE7eSJ9YhvRvCTKs5YZHHl')
    const {id}=useSelector(state => state.user);
    useEffect(()=>{
        if (id){
        console.log(id)
        fetch("http://127.0.0.1:8000/api/stripe_custom_checkout/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id),
          })
            .then((res) => {
                // res.json()
                console.log(res.json())
            })
            // .then((data) => setClientSecret(data.clientSecret));
            // console.log(clientsecret)
        }
    }, [])
    
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret:clientsecret
      };

      

     
  return (
    <>
    <NavBar/>
    <div className='container'>
        {clientsecret && (
        <Elements  stripe={stripePromise} options={options}>
             <PaymentForm/>
        </Elements>
      )}
    </div>
    </>
  )
}

export default StripeCheckout