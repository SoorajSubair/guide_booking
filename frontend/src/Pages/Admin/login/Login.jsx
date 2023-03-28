import React from 'react';
import './Login.css';
import LoginImage from '../../../Components/Admin/LoginImage/LoginImage';
import LoginForm from '../../../Components/Admin/LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image-container">
        <LoginImage />    
      </div>
      <div className="login-form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;


