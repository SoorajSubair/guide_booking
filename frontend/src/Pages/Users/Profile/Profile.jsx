import React,{useState} from 'react'
import NavBar from '../../../Components/Users/Navbar/Navbar'

import Footer from '../../../Components/Users/Footer/Footer'
import ProfileComponent from '../../../Components/Users/ProfileComponent/ProfileComponent'

function Profile() {
    const [update, setUpdate] = useState(false);
  return (
    <div>
        <NavBar update={update}/>
        <ProfileComponent update={update} setUpdate={setUpdate}/>
        <Footer/>
    </div>
  )
}

export default Profile