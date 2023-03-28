import React from 'react';
import './LoginImage.css';
import loginImage from '../../../Assets/images/boy-with-rocket-light.png'

const LoginImage = () => {
  return (
    <div className="image-container">
      <img src={loginImage} alt="Login UI" className="login-image" />
    </div>
  );
};

export default LoginImage;
