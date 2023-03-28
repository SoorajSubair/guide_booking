import React,{useState, useEffect} from 'react';
import './LoginForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import  axios  from '../../../Utils/axios';
import { login } from '../../../Utils/Urls';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


const LoginForm = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() =>{
    if (localStorage.getItem("authTokens")){
      const prevUrl = localStorage.getItem("prevUrl");
      navigate(prevUrl);
    }
  },[navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      setUsernameError('Username is required');
    }
    else{
      setUsernameError('');
    }
    if (!password) {
      setPasswordError('Password is required');
    }
    else{
      setPasswordError('');
    }
    if (username && password) {

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
            const decoded_token = jwt_decode(response.data.access)
            if(decoded_token.is_superuser){
              localStorage.setItem('authTokens', JSON.stringify(response.data))
              // dispatch(setAuthToken(JSON.stringify(response.data)))
              navigate("/admin/dashboard");
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
            }else {
              Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Invalid Credentials",
                  showConfirmButton: false,
                  timer: 1500,
                  });
                }        
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
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="login-form">
      <h2 className="login-heading">ADMIN LOGIN</h2>
      <form className='login-fields' onSubmit={handleSubmit}>

        <div className="form-group">
          <input type="text" placeholder='Username' id="username" name="username"  value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ borderColor: usernameError ? 'red' : null }}/>
            {usernameError && <div className="error-message">{usernameError}</div>}
        </div>

        <div className="form-group">
          <div className="input-icon-wrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: passwordError ? 'red' : null }}
            />
            <div className="input-icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>
  
        <div className="form-group">
          {/* <a href=''>Forgot Password?</a> */}
        </div>
        <div className="form-group">
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
