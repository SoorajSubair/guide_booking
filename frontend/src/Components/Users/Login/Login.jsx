import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios';
import Swal from 'sweetalert2';
import { login,userOtp,otpConfirm } from '../../../Utils/Urls';
// import jwt_decode from "jwt-decode";
// import { useDispatch } from "react-redux";



function Login() {

    const navigate = useNavigate()
    // const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpLogin, setOtpLogin] = useState(false);
    const [otpRequest, setOtpRequest] = useState(false);
    const phonePrefix = "+91"

    useEffect(() =>{
      if (localStorage.getItem("user_authTokens")){
        const prevUrl = localStorage.getItem("user_prevUrl");
        navigate(prevUrl);
      }
    },[navigate])

    const handleLogin = (e) => {
        e.preventDefault();
          const body = JSON.stringify({
            username,
            password,
          });
    
          axios
            .post(login, body, {
              headers: { "Content-Type": "application/json" },
            })
            .then ((response) => {
    
              if (response.status === 200) {
                  localStorage.setItem('user_authTokens', JSON.stringify(response.data))
                  navigate("/");
                  Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Login Successfully",
                      showConfirmButton: false,
                      timer: 1500,
                    });
              }
            else {
                  Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: "Invalid Credentials",
                      showConfirmButton: false,
                      timer: 1500,
                      });
                    }
            }).catch((err) => {
              console.log(err)
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Invalid Credentials",
                  showConfirmButton: false,
                  timer: 1500,
                  });
            });      
    }

    const handleLoginOtp = (e) => {

      e.preventDefault();
      const fullPhone = phonePrefix + phone;
          const body = JSON.stringify({ phone:fullPhone });

          axios
            .post(userOtp, body, {
              headers: { "Content-Type": "application/json" },
            })
            .then ((response) => {
    
              if (response.status === 200) {

                  setOtpRequest(true)
                  Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "OTP sends successfully!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
              }
            else if (response.status === 201) {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "Sorry, OTP service is currently unavailable",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            else {
                  Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: "Invalid Credentials",
                      showConfirmButton: false,
                      timer: 1500,
                      });
                    }
            }).catch((err) => {
              console.log(err)
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Invalid Credentials",
                  showConfirmButton: false,
                  timer: 1500,
                  });
            });      
    }

    const handleOtp = (e) =>{
      e.preventDefault()
      const fullPhone = phonePrefix + phone;
      const body = JSON.stringify({ phone:fullPhone, otp:otp });

      axios
            .post(otpConfirm, body, {
              headers: { "Content-Type": "application/json" },
            })
            .then ((response) => {
    
              if (response.status === 200) {
                console.log(response.data)
                console.log(response)
                  localStorage.setItem('user_authTokens', JSON.stringify(response.data))
                  navigate("/");
                  Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Login Successfully",
                      showConfirmButton: false,
                      timer: 1500,
                    });
              }
            else {
              setOtpRequest(false)
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Invalid OTP",
                  showConfirmButton: false,
                  timer: 1500,
                  });
                }
            }).catch((err) => {
              setOtpRequest(false)
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Invalid OTP",
                  showConfirmButton: false,
                  timer: 1500,
                  });
            });            
      
    }

  return (
    <>
    {! otpRequest ? 
    <form onSubmit={otpLogin ? handleLoginOtp : handleLogin} className="sign-in-form form">
            <h2 className="title">Sign in</h2>
            { !otpLogin ?
            <>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                        }} 
                />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              />
            </div>
            </>
            : 
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="tel"
                placeholder="Phone"
                pattern="[0-9]{10}"
                required
                value={phone}
                onChange={(e) => {
                    setPhone(e.target.value);
                        }} 
                />
            </div>
            }

            <input
            type="submit"
            value="Login"
            className="btn solid"
            />

            <hr class="hr-text" data-content="OR"/>

            <p>Login with <a className='otp-link' onClick={()=> setOtpLogin(!otpLogin)}>{!otpLogin ? 'OTP' : 'CREDENTIALS'}</a></p>

          </form>
          :
          <form onSubmit={handleOtp} className="sign-in-form form">
            <h2 className="title">Enter the OTP send to your number </h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => {
                    setOtp(e.target.value);
                        }} 
                />
            </div>

            <input
            type="submit"
            value="Submit"
            className="btn solid"
            />

          </form>
          }
    </>
  )
}

export default Login
