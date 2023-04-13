import React,{useEffect, useState, useContext} from 'react'
import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios'
import { verifyToken,baseUrl,getGuide } from '../../../Utils/Urls';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { change } from "../../../Redux/authenticationSlice";
import { UserRefreshToken } from '../../../Utils/UserRefreshToken';
import Swal from 'sweetalert2';
import logo from '../../../Assets/images/logo.svg'
import { useSelector } from 'react-redux';
import { UserIsLoggedIn } from '../../../Context/UserIsLoggedIn';


function NavBar(props) {

    const { image } = useSelector(state => state.user);
    const profileImage = `${baseUrl}${image}`
    const dispatch = useDispatch();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(UserIsLoggedIn);
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
                      setIsLoggedIn(true)
                  }
                })
                .catch((err) => {
                  localStorage.removeItem('user_authTokens');
                  localStorage.removeItem('user_prevUrl');
                  dispatch(change({ id: null ,username: null, image: null }));
                  setIsLoggedIn(false)
                  if(window.location.pathname.includes('/checkout')){
                    navigate('/login')
                  }
                });
            }else{
              localStorage.removeItem('user_authTokens');
              localStorage.removeItem('user_prevUrl');
              dispatch(change({ id: null ,username: null, image: null }));
              setIsLoggedIn(false)
              if(window.location.pathname.includes('/checkout')){
                navigate('/login')
              }
            }
    },[dispatch, props.update])
  
  
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
          // <Navbar.Text className={destinationPageUrl === window.location.pathname & !isScrolled ? "navbar-text-destination" : ""}>
          //   Profile
          // </Navbar.Text >
          <Navbar.Brand id="basic-nav-dropdown" ><img src={profileImage} alt='logo' style={{height:'50px', width:'50px', borderRadius:'50%', objectFit:'cover'}}></img>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/bookings')}>Bookings</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/chat')}>Chat</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className='logout-dropdown'>Logout</NavDropdown.Item>
          </NavDropdown>
          </Navbar.Brand>
          }
          {isLoggedIn ?
          ''
          // <Button onClick={handleLogout} className={destinationPageUrl === window.location.pathname & !isScrolled  ? "nav-button-destination nav-button" : "nav-button"}>Logout</Button>
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
