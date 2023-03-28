import React,{useEffect, useState} from 'react'
import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios'
import { verifyToken } from '../../../Utils/Urls';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { change } from "../../../Redux/authenticationSlice";
import { UserRefreshToken } from '../../../Utils/UserRefreshToken';
import Swal from 'sweetalert2';
import logo from '../../../Assets/images/logo.svg'



function NavBar() {

    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
      
    setIsScrolled(window.pageYOffset < 550 ? false : true);
    return () => (window.onscroll = null);
  };
    const {destinationId} = useParams()
    const navigate = useNavigate();
    const destinationPageUrl = `/destination/${destinationId}`

    useEffect(()=>{

      window.scrollTo(0, 0);

      const user_authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
          const refresh = user_authTokens?.refresh
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
                      localStorage.setItem("user_prevUrl", window.location.pathname);
                      const access = user_authTokens?.access
                      const decodedToken = jwt_decode(access)
                      dispatch(change({ username: decodedToken.username, image: decodedToken.image }));
                      setIsLoggedIn(true)
                  }
                })
                .catch((err) => {
                  localStorage.removeItem('user_authTokens');
                  localStorage.removeItem('user_prevUrl');
                  dispatch(change({ username: null, image: null }));
                  setIsLoggedIn(false)
                });
            }else{
              localStorage.removeItem('user_authTokens');
              localStorage.removeItem('user_prevUrl');
              dispatch(change({ username: null, image: null }));
              setIsLoggedIn(false)
            }
    },[dispatch])
  
  
    useEffect(() => {
      const intervalId = setInterval(async () => {
        await UserRefreshToken(setIsLoggedIn);
      }, 3600000 );
      
      return () => clearInterval(intervalId);
      }, []);

    
    const handleLogout = () =>{
      Swal.fire({
				title: 'Are you sure to log out?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes',
			  }).then((result) => {
				if (result.isConfirmed) {
				  localStorage.removeItem('user_authTokens');
          localStorage.removeItem('user_prevUrl');
				  dispatch(change({ username: null, image: null }));
				  navigate('/login')
				}
			  })
    }

  return (
    <>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <Navbar className={destinationPageUrl === window.location.pathname & !isScrolled ? "navbar-destination" : ""}>
      <Container className='nav-container'>
        <Navbar.Brand onClick={()=>navigate('/')}><img src={logo} alt='logo' style={{height:'60px'}}></img></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn && 
          <Navbar.Text className={destinationPageUrl === window.location.pathname & !isScrolled ? "navbar-text-destination" : ""}>
            Profile
          </Navbar.Text >
          }
          {isLoggedIn ?
          <Button onClick={handleLogout} className={destinationPageUrl === window.location.pathname & !isScrolled  ? "nav-button-destination nav-button" : "nav-button"}>Logout</Button>
          :
          <Button onClick={() => navigate('/login')} className={destinationPageUrl === window.location.pathname & !isScrolled  ? "nav-button-destination nav-button" : "nav-button"}>Login</Button>
          }
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}


export default NavBar
