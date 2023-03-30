

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Forms.css'
import axios from '../../../Utils/axios'
import Swal from 'sweetalert2';
import { createUser } from '../../../Utils/Urls';
import { useNavigate } from 'react-router-dom';

function UserAddForm() {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const phonePrefix = "+91"
  const navigate = useNavigate()

  const handleSubmit = (event) => {

    const form = event.currentTarget;

    if (form.checkValidity() === false ) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      event.preventDefault();
      const fullPhone = phonePrefix + phone;
      
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to create an user .',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create it!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("confirmed")
          const formData = new FormData();
          formData.append('username', username);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('phone', fullPhone);
          formData.append('first_name', firstName);
          formData.append('last_name', lastName);
          
    
          // const authTokens = JSON.parse(localStorage.getItem('authTokens'))
          // const access = authTokens.access;
    
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
                  // redirect to dashboard after success
                  navigate('/admin/users');
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
    setValidated(true);
    
  };

  return (
    <>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <Form className='px-5' noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please choose a Last Name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please choose a Last Name</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" required defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="tel" placeholder="Phone" pattern="[0-9]{10}" required defaultValue={phone} onChange={(e) => setPhone(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Phone.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="ml-4 mr-4 mt-5">
      <Button className='my-button' type="submit">Submit form</Button>
      </Row>
    </Form>
    </>
  );
}

export default UserAddForm;