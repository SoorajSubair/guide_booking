import React, {useContext, useEffect, useState } from "react";
import { ResizeContext } from "../../../Context/ResizeContext";
import "./GuideSidebar.css";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "../../../Utils/axios"
import { verifyToken,getGuide } from "../../../Utils/Urls";
import { GuideRefreshToken } from "../../../Utils/GuideRefreshToken";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { change } from "../../../Redux/authenticationSlice";
import { useSelector } from 'react-redux';


const GuideSidebar = () => {

	const dispatch = useDispatch();
	const [shouldNavigate, setShouldNavigate] = useState(false);
	// const { destinationId } = useParams();
	const navigate = useNavigate()
	const { isExpanded, toggleExpandedState } = useContext(ResizeContext);
	const { username } = useSelector(state => state.user);
	//-----To verify the token-----//

	useEffect(()=>{
		const authTokens = JSON.parse(localStorage.getItem('guide_authTokens'))
        const refresh = authTokens?.refresh
        if (refresh) {
            const body = JSON.stringify({
                token: refresh,
              });
            axios
              .post(verifyToken, body, {
                headers: { "Content-Type": "application/json" },
              })
              .then((response) => {
                if (response.status === 200){
					localStorage.setItem("guide_prevUrl", window.location.pathname);
					const access = authTokens?.access
                    const decodedToken = jwt_decode(access)
					dispatch(change({id: decodedToken.user_id}));
                    const url = `${getGuide}${decodedToken.user_id}`;
                    axios.get(url, {
                        headers: { 'Content-Type': 'application/json' },
                      })
                      .then((response) => {
                        if (response.status === 200) {
                            dispatch(change({id:decodedToken.user_id, username: response.data.username, image: response.data.image }));
                        }
                      });


                }
              })
              .catch((err) => {
                localStorage.removeItem('guide_authTokens');
                localStorage.removeItem('guide_prevUrl');
                dispatch(change({id: null, username: null, image: null }));
                setShouldNavigate(true);
              });
          }else{
            localStorage.removeItem('guide_authTokens');
            localStorage.removeItem('guide_prevUrl');
            dispatch(change({id: null, username: null, image: null }));
			setShouldNavigate(true);
          }
	},[dispatch])

	//-----To force logout-----//

	useEffect(() => {
		if (shouldNavigate) {
		  navigate('/guide')
		}
	  }, [shouldNavigate, navigate])

	//----Refreshing Tokens-----//

	useEffect(() => {
		const intervalId = setInterval(async () => {
			await GuideRefreshToken(navigate);
		}, 3600000 );
		
		return () => clearInterval(intervalId);
		}, [navigate]);

	const menuItems = [
		{
			text: "Profile",
			url: '/guide/profile',
			url2: '/guide/profile/edit'
		},
		{
			text: "Bookings",
			url: '/guide/bookings',
			url2: ''
		},
		{
			text: "Payments",
			url: '/guide/payments',
			url2: ''
		},
		{
			text: "Chat",
			url: '/guide/chat',
			url2: ''
		},
		{
			text: "Logout",
			url: '/guide',
			url2: ''
		}
	];

	const handleNavigation = (url)=>{

		if (url !== '/guide'){
			navigate(url)
		}
		else{
			Swal.fire({
				title: 'Are you sure to log out?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			  }).then((result) => {
				if (result.isConfirmed) {
					localStorage.removeItem('guide_authTokens');
					localStorage.removeItem('guide_prevUrl');
					dispatch(change({id: null, username: null, image: null }));
					navigate(url)
				}
			  })
		}
	}

	return (
		<div className={ isExpanded ? "guide-side-nav-container" : "guide-side-nav-container guide-side-nav-container-NX" } style={{boxSizing: 'unset'}}>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="guide-nav-brand">
							{/* <img src={logo} alt="" srcset="" /> */}
							<h2 className="username">{username}</h2>
						</div>
					)}
					<button className={ isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out" }
						onClick={toggleExpandedState}
					>
						<span className="guide-hamburger-span"></span>
						<span className="guide-hamburger-span"></span>
						<span className="guide-hamburger-span"></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, url, url2, url3 }) => (
						 <div
							className={url === window.location.pathname || url2 ===  window.location.pathname || url3 ===  window.location.pathname ? "guide-menu-item guide-menu-item-active" : "guide-menu-item"}
							onClick={() => handleNavigation(url)}
      						key={url}
						>
							{/* <img className="menu-item-icon" src={icon} alt="" srcset="" /> */}
							{isExpanded && <span className="menu-item-text">{text}</span>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GuideSidebar;