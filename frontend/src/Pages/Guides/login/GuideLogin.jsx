import React from 'react';
import GuideLoginForm from '../../../Components/Guide/GuideLoginForm/GuideLoginForm';
import GuideLoginImage from '../../../Components/Guide/GuideLoginImage/GuideLoginImage';
import './GuideLogin.css';


const GuideLogin = () => {
  return (
    <div className="guide-login-container">
      <div className="login-image-container">
        <GuideLoginImage />    
      </div>
      <div className="login-form-container">
        <GuideLoginForm />
      </div>
    </div>
  );
};

export default GuideLogin;

