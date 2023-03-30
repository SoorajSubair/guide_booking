import React, {useContext, useEffect, useState } from "react";
import { ResizeContext } from "../../../Context/ResizeContext";
import "./Sidebar.css";
import dashboard from "../../../Assets/images/dashboard.svg"
import users from "../../../Assets/images/users.svg"
import guides from "../../../Assets/images/guides.svg"
import bookings from "../../../Assets/images/bookings.png"
import payments from "../../../Assets/images/transactions.png"
import destinations from "../../../Assets/images/location.svg"
import logout from "../../../Assets/images/logout.svg"
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "../../../Utils/axios"
import { verifyToken } from "../../../Utils/Urls";
import { RefreshToken } from "../../../Utils/RefreshToken";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { change } from "../../../Redux/authenticationSlice";
import { useSelector } from 'react-redux';


const Sidebar = () => {

	const dispatch = useDispatch();
	const [shouldNavigate, setShouldNavigate] = useState(false);
	const { destinationId } = useParams();
	const navigate = useNavigate()
	const { isExpanded, toggleExpandedState } = useContext(ResizeContext);
	const { username } = useSelector(state => state.user);
	//-----To verify the token-----//

	useEffect(()=>{
		const authTokens = JSON.parse(localStorage.getItem('authTokens'))
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
					localStorage.setItem("prevUrl", window.location.pathname);
					const access = authTokens?.access
                    const decodedToken = jwt_decode(access)
                    console.log(decodedToken)
					// dispatch(change(decodedToken.username))
					dispatch(change({ id: decodedToken.user_id, username: decodedToken.username, image: decodedToken.image }));

                    // const token = JSON.parse(response.config.data).token;
                    // const decodedToken = jwt_decode(token)
                    // dispatch(change(decodedToken.image))
                    // dispatch(setAuthToken(JSON.stringify(localStorage.getItem('authTokens'))))
                }
              })
              .catch((err) => {
                console.log(err)
				console.log("not-verified")
                localStorage.removeItem('authTokens');
                localStorage.removeItem('prevUrl');
                dispatch(change({ id:null, username: null, image: null }));
                // dispatch(setAuthToken(null))
                setShouldNavigate(true);
              });
          }else{
            localStorage.removeItem('authTokens');
            localStorage.removeItem('prevUrl');
            dispatch(change({id:null, username: null, image: null }));
            // dispatch(setAuthToken(null))
			setShouldNavigate(true);
          }
	},[dispatch])

	//-----To force logout-----//

	useEffect(() => {
		if (shouldNavigate) {
		  navigate('/admin')
		}
	  }, [shouldNavigate, navigate])

	//----Refreshing Tokens-----//

	useEffect(() => {
		const intervalId = setInterval(async () => {
			await RefreshToken(navigate);
		}, 3600000 );
		
		return () => clearInterval(intervalId);
		}, [navigate]);

	const menuItems = [
		{
			text: "Dashboard",
			icon: dashboard,
			url: '/admin/dashboard',
			url2: ''
		},
		{
			text: "Users",
			icon: users,
			url: '/admin/users',
			url2: '/admin/users/add'
		},
		{
			text: "Guides",
			icon: guides,
			url: '/admin/guides',
			url2: '/admin/guides/add'
		},
		{
			text: "Bookings",
			icon: bookings,
			url: '/admin/bookings',
			url2: ''
		},
		{
			text: "Payments",
			icon: payments,
			url: '/admin/payments',
			url2: ''
		},
		{
			text: "Destinations",
			icon: destinations,
			url: '/admin/destinations',
			url2: '/admin/destination/add',
			url3: `/admin/destinations/${destinationId}`,
			
		},
		{
			text: "Logout",
			icon: logout,
			url: '/admin',
			url2: ''
		}
	];

	const handleNavigation = (url)=>{

		if (url !== '/admin'){
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
					localStorage.removeItem('authTokens');
					localStorage.removeItem('prevUrl');
					dispatch(change({id:null, username: null, image: null }));
					navigate(url)
				}
			  })
		}
	}

	return (
		<div className={ isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX" } style={{boxSizing: 'unset'}}>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							{/* <img src={logo} alt="" srcset="" /> */}
							<h2 className="username">{username}</h2>
						</div>
					)}
					<button className={ isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out" }
						onClick={toggleExpandedState}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon, url, url2, url3 }) => (
						 <div
							className={url === window.location.pathname || url2 ===  window.location.pathname || url3 ===  window.location.pathname ? "menu-item menu-item-active" : "menu-item"}
							onClick={() => handleNavigation(url)}
      						key={url}
						>
							<img className="menu-item-icon" src={icon} alt="" srcset="" />
							{isExpanded && <span className="menu-item-text">{text}</span>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;