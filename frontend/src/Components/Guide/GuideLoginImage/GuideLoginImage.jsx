import React from 'react';
import './GuideLoginImage.css';
import guideLogin from '../../../Assets/images/guide_login.png'

const GuideLoginImage = () => {
  return (
    <div className="image-container">
      <img src={guideLogin} alt="Login UI" className="login-image" />
    </div>
  );
};

export default GuideLoginImage;