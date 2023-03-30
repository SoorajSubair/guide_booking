import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Form.css'
import axios from '../../../Utils/axios'
import Swal from 'sweetalert2';
import { GuideRefreshToken } from '../../../Utils/GuideRefreshToken';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGuide,updateGuide } from '../../../Utils/Urls';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { change } from '../../../Redux/authenticationSlice';

function GuideProfileEditForm() {

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user);
  const url = `${getGuide}${id}`;
  const updateUrl = `${updateGuide}${id}`
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState(null)
  const phonePrefix = "+91"
  const navigate = useNavigate()


  useEffect(() => {

    axios.get(url, {

        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 200) {
            console.log(response.data)
          setFirstName(response.data.first_name)
          setLastName(response.data.last_name)
          setEmail(response.data.email)
          setPhone(response.data.phone.slice(3))
          setBio(response.data.bio)
        }
      });
  }, [url]);


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
        text: 'You are about to update your details.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append('email', email);
          formData.append('phone', fullPhone);
          formData.append('first_name', firstName);
          formData.append('last_name', lastName);
          formData.append('bio', bio)
          if (image){
            formData.append('image', image);
        }
          
          const authTokens = JSON.parse(localStorage.getItem('guide_authTokens'))
          const access = authTokens.access;
    
          axios.put(updateUrl, formData, {
            headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
              if (response.status === 200) {
  
                Swal.fire({
                  title: 'Success!',
                  text: 'You details updated succesffully',
                  icon: 'success'
                }).then(() => {
                  // redirect to dashboard after success
                  navigate('/guide/profile');
                });
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: 'Invalid Details',
                  icon: 'error'
                })
              }
            })
            .catch((error) => {
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
            className='guide-form-control'
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
            className='guide-form-control'
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
       
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control className='guide-form-control' type="email" placeholder="Email" required defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Phone</Form.Label>
          <Form.Control className='guide-form-control' type="tel" placeholder="Phone" pattern="[0-9]{10}" required defaultValue={phone} onChange={(e) => setPhone(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Phone.
          </Form.Control.Feedback>
        </Form.Group>
       
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>BIO</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
                className='guide-form-control'
              as="textarea"
              rows={6}
              type="text"
              placeholder="Description for the destination..."
              aria-describedby="inputGroupPrepend"
              required
              defaultValue={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please write about the destination
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom04">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control className='guide-form-control' type="file" size='sm' accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide an image.
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

export default GuideProfileEditForm;