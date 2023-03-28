import React from 'react'
import Auth from '../../../Components/Users/Auth/Auth'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Authentication() {

  const navigate = useNavigate()

  useEffect(() =>{
    // if (localStorage.getItem("authTokens")){
    //   navigate("/");
    // }
  })


  return (
    <>
    <Auth/>
    </>
  )
}

export default Authentication