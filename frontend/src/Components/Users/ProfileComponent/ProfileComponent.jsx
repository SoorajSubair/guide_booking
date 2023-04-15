import React,{useState, useEffect} from 'react'
import './Profile.css'
import { useSelector } from 'react-redux';
import { getGuide, baseUrl, updateUser } from '../../../Utils/Urls';
import axios from '../../../Utils/axios'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';

function ProfileComponent(props) {

    const { id } = useSelector(state => state.user);
    const url = `${getGuide}${id}`
    const updateUrl = `${updateUser}${id}`
    const { image } = useSelector(state => state.user);
    const profileImage = `${baseUrl}${image}`
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [wallet, setwallet] = useState('');
    const [userImage, setImage] = useState(null)
    const [updateClicked, setUpdateClicked] = useState(false)
    
    const [validated, setValidated] = useState(false);
    const phonePrefix = "+91"

    useEffect(() => {

        axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (response.status === 200) {
              setFirstName(response.data.first_name)
              setLastName(response.data.last_name)
              setEmail(response.data.email)
              setPhone(response.data.phone.slice(3))
              setUsername(response.data.username)
              setwallet(response.data.wallet)
          }
        });
  
      },[props.update])

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
            if (userImage){
            formData.append('image', userImage);
        }
            
            const authTokens = JSON.parse(localStorage.getItem('user_authTokens'))
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
                    props.setUpdate(!props.update)
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
                console.log(error.response.data)
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
    <div className='profile-container'>
        <div className="booking-master">
            <div className="bookings-header">
                {!updateClicked ?
                <>
                <h3 class="Title-MBBEe">PROFILE</h3>
                <span class="Action-24rBX" onClick={()=>setUpdateClicked(!updateClicked)}>Update</span>
                </>:
                <>
                <h3 class="Title-MBBEe">UPDATE FORM</h3>
                <span class="Action-24rBX" onClick={()=>setUpdateClicked(!updateClicked)}>Cancel</span>
                </>
                }
            </div>
            {!updateClicked ?
            <div class="profile-scroller">
                <div class="Container-3OyhV">
                    <img alt="profile photo" height="200" width="200" sizes="200px" class="Avatar-2iH7z img-responsive" src={profileImage}/>
                </div>
                <div className='profile-details-wrapper'>
                <div className='profile-details-container'>
                        <span><strong>First Name :</strong> {firstName}</span>
                        <span><strong>Last Name :</strong> {lastName}</span>
                </div>
                <div className='profile-details-container'>
                        <span><strong>Email :</strong> {email}</span>
                        <span><strong>Phone :</strong> {phone}</span>
                </div>
                <div className='profile-details-container'>
                        <span><strong>Username :</strong> {username}</span>
                        <span><strong>Wallet :</strong> $ {wallet}</span>
                </div>
                </div>
            </div>
            :
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
            <Button className='roundedButton--gradient roundedButton' type="submit">Submit form</Button>
            </Row>
            </Form>
            </>
            }
        </div>
    </div>
  )
}

export default ProfileComponent
