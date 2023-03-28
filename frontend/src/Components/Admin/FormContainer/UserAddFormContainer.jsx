import React from 'react'
import UserAddForm from '../Forms/UserAddForm'
import './FormContainer.css'

function UserAddFormContainer() {

  return (
        <div className="Form-Container">
            <div className = "heading-container">
            <h1 className='Form-Heading'>User Details</h1>
            </div>
            <UserAddForm/>
        </div>
  )
}

export default UserAddFormContainer
