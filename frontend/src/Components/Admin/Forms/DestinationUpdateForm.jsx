import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Forms.css'
import axios from '../../../Utils/axios'
import Swal from 'sweetalert2';
import { updateDestination } from '../../../Utils/Urls';
import { useNavigate,useParams } from 'react-router-dom';
import { viewDestination } from '../../../Utils/Urls';

function DestinationUpdateForm() {

    const {destinationId} = useParams()
    const [validated, setValidated] = useState(false);
    // const [destination, setDestination] = useState({})
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [about, setAbout] = useState('')
    const [shortInfo, setShortInfo] = useState('')
    const [fee, setFee] = useState('')
    const [destinationType, setDestinationtype] = useState('')
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [extraImages, setExtraImages] = useState([])
    const navigate = useNavigate()
    const formData = new FormData();
    const url = `${viewDestination}${destinationId}`
    const updateUrl = `${updateDestination}${destinationId}`


    useEffect(() => {

        axios.get(url,{
            headers: {'Content-Type': 'application/json' },
          })
            .then((response) => {
              if (response.status === 200) {
                // setDestination(response.data)
                console.log(response.data.type)
                setName(response.data.name)
                setCountry(response.data.country)
                setAbout(response.data.about)
                setDestinationtype(response.data.type)
                setShortInfo(response.data.short_info)
                setFee(response.data.fee)
              } 
            })    
      },[url])

    const handleExtraImagesChange = (e) => {
        const files = e.target.files;
        setExtraImages(Array.from(files));
    };


    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false ) {
        event.preventDefault();
        event.stopPropagation();
        }
        else{
        event.preventDefault();
        console.log(name)
    
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to update the destination!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
            formData.append('name', name);
            formData.append('country', country);
            formData.append('about', about);
            if (image){
                formData.append('image', image);
            }
            if (video){
              formData.append('video', video);
          }
            formData.append('type', destinationType)
            //   formData.append('extra_images', extraImages);
            if (extraImages){
                extraImages.forEach((image) => {
                    formData.append('extra_images', image);
                });
            }
        
            const authTokens = JSON.parse(localStorage.getItem('authTokens'))
            const access = authTokens.access;
        
            axios.put(updateUrl, formData, {
                headers: {"Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
            })
                .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                    title: 'Success!',
                    text: 'The Destination Updated successfully.',
                    icon: 'success'
                    }).then(() => {
                    // redirect to dashboard after success
                    navigate('/admin/destinations');
                    });
                } else {
                    console.log(response.data)
                    Swal.fire({
                    title: 'Error!',
                    text: 'Sorry something went wrong',
                    icon: 'error'
                    })
                }
                })
                .catch((error) => {
                console.log(error.response.data.image);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.image,
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
          <Form.Label>Destination</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Destination"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please Enter a Destination</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Country"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please choose a Country</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomUsername10">
          <Form.Label>Short Info</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              as="textarea"
              rows={1}
              type="text"
              placeholder="Short info for the destination..."
              aria-describedby="inputGroupPrepend"
              required
              defaultValue={shortInfo}
              onChange={(e) => setShortInfo(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please write s short info
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Fee</Form.Label>
            <Form.Control
              required
              type="number"
              step="0.01"
              placeholder="Fee"
              defaultValue={fee}
              onChange={(e) => setFee(parseFloat(e.target.value))}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please choose a Fee</Form.Control.Feedback>
        </Form.Group>

        </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>About</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              as="textarea"
              rows={6}
              type="text"
              placeholder="Description for the destination..."
              aria-describedby="inputGroupPrepend"
              required
              defaultValue={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please write about the destination
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        </Row>
        <Row className='mb-3 mt-5' >
          <Form.Group as={Col} md="12" controlId="validationCustom06">
            {destinationType === 'Mega City' ? <Form.Select className='destination-select' size="sm" aria-label="Destination select"  required onChange={(e) => setDestinationtype(e.target.value)}>
              <option selected value="Mega City">Mega City</option>
              <option value="Nature Friendly">Nature Friendly</option>
            </Form.Select>:
             <Form.Select className='destination-select' size="sm" aria-label="Destination select"  required onChange={(e) => setDestinationtype(e.target.value)}>
             <option value="Mega City">Mega City</option>
             <option selected value="Nature Friendly">Nature Friendly</option>
           </Form.Select>}                            
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please select a destination type
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom04">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" size='sm' accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide an image.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom04">
          <Form.Label>Video</Form.Label>
          <Form.Control type="file" size='sm' accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a video.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom04">
          <Form.Label>Extra Images </Form.Label>
          <Form.Control type="file" size='sm' accept="image/*" multiple onChange={handleExtraImagesChange}/>
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

export default DestinationUpdateForm;