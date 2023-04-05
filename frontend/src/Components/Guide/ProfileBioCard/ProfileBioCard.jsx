import React,{useState, useEffect} from 'react'
import './ProfileBioCard.css'
import { useSelector } from 'react-redux';
import { getGuide } from '../../../Utils/Urls';
import axios from '../../../Utils/axios'

function ProfileBioCard() {

    const { id } = useSelector(state => state.user);
    const url = `${getGuide}${id}`
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [destination, setDestination] = useState('');
    const [country, setCountry] = useState('');
    const [wallet, setwallet] = useState('');

    useEffect(() => {

      axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 200) {
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setEmail(response.data.email)
            setPhone(response.data.phone)
            setBio(response.data.bio)
            setDestination(response.data.destination.name)
            setCountry(response.data.destination.country)
            setwallet(response.data.wallet)
        }
      });

    })


  return (
    <div className='about-bio-holder'>
        <div className="about-card">
            <h5 className='guide-about-h5'>ABOUT</h5>
            <p className='guide-about-details'><strong>Full Name:</strong> {`${firstName} ${lastName}`}</p>
            <p className='guide-about-details'><strong>Destination:</strong> {destination}</p>
            <p className='guide-about-details'><strong>Country:</strong> {country}</p>
            <p className='guide-about-details'><strong>Email:</strong> {email}</p>
            <p className='guide-about-details'><strong>Phone:</strong> {phone}</p>
            <p className='guide-about-details'><strong>Wallet:</strong> {`$ ${wallet}`}</p>
        </div>
        <div className="bio-card">
            <h4 className='guide-bio-h4'>BIO</h4>
            <p className="guide-bio-details">{bio}</p>

        </div>
      
    </div>
  )
}

export default ProfileBioCard
