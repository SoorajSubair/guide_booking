import React, {useContext} from 'react'
import './Navbar.css'
// import profile from '../../../Assets/images/profile.jpg'
import { ResizeContext } from '../../../Context/ResizeContext';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../Utils/Urls';

function Navbar() {

  const { isSmallScreen, toggleIsSmallScreen } = useContext(ResizeContext);
  const { image } = useSelector(state => state.user);
  const profileImage = `${baseUrl}${image}`

  return (
        <div class={isSmallScreen ? "flex-item-right flex-item-right-NX" : "flex-item-right "}>
          { !isSmallScreen &&
          <div> 
          <button className={ isSmallScreen ? "hamburger hamburger-in" : "hamburger hamburger-out" }
						onClick={toggleIsSmallScreen}>
              
						<span></span>
						<span></span>
						<span></span>
					</button>
          </div>
          }
          <div>
            <img src={profileImage} alt="profile" class="profile-image" />
          </div>
        </div>
  )
}

export default Navbar
