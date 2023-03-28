import React,{useState} from 'react'
// import { register } from "../../utils/Constants";
import { useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios';
import { createUser } from '../../../Utils/Urls';
import Swal from "sweetalert2";

function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const phonePrefix = "+91"
    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();
        const fullPhone = phonePrefix + phone;
      
      Swal.fire({
        title: 'Are you sure?',
        text: 'The Details are valid?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append('username', username);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('phone', fullPhone);
          formData.append('first_name', firstName);
          formData.append('last_name', lastName);
    
          axios.post(createUser, formData, {
            headers: {'Content-Type': 'application/json' },
          })
            .then((response) => {
              if (response.status === 201) {
                Swal.fire({
                  title: 'Success!',
                  text: 'The user details have been updated.',
                  icon: 'success'
                }).then(() => {
                  // redirect to login after success
                  navigate('/login');
                });
              } else {
                console.log(response)
                Swal.fire({
                  title: 'Error!',
                  text: 'Invalid Details',
                  icon: 'error'
                })
              }
            })
            .catch((error) => {
              console.log(error.response.data.username);
              Swal.fire({
                title: 'Error!',
                text: error.response.data.username,
                icon: 'error'
              });
            });
        }
      });
    }

  return (
    <>
    <form  onSubmit={handleSubmit} className="sign-up-form form">
        <h2 className="title">Sign up</h2>
        <div className="input-field">
            <i className="fas fa-user"></i>
            <input
            type="text"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(e) => {
              setFirstName(e.target.value);
                  }}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
                  }}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-lock"></i>
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
            <i className="fas fa-user"></i>
            <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
                  }}
            />
        </div>
        <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
            type="tel"
            placeholder="phone"
            value={phone}
            pattern="[0-9]{10}"
            required
            onChange={(e) => {
              setPhone(e.target.value);
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
        <input type="submit" className="btn" value="Sign up" />
    </form>
    </>
  )
}

export default Signup
