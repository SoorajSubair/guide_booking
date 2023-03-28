import React,{useState, useEffect} from 'react'
import './Auth.css'
import { SignUpModeContext } from '../../../Context/SignupModeContext'
import { useLocation, useNavigate} from "react-router-dom" 
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import MainPanel from '../Panels/MainPanel'


function Auth() {

  const [signUpState, setSignUpState] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (location.pathname === "/signup") {
      setSignUpState(true);
    } else if (location.pathname === "/login") {
      setSignUpState(false);
    }
  }, [location]);

  useEffect(() => {
    if (!isInitialRender) {
      if (!signUpState) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    } else {
      setIsInitialRender(false);
    }
  }, [signUpState]);


  return (
    <div className='body'>
      <div className={signUpState ? "container1 sign-up-mode": "container1"}>
      <div className="forms-container1">
        <div className="signin-signup">
         <Login/>
         <Signup/>
        </div>
      </div>
      <SignUpModeContext.Provider value={{ setSignUpState }}>
      <MainPanel/>
      </SignUpModeContext.Provider>
    </div>
        
  </div>
  )
}

export default Auth
