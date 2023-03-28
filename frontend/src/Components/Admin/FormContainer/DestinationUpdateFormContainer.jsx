import React from 'react'
import DestinationUpdateForm from '../Forms/DestinationUpdateForm'
import './FormContainer.css'

function DestinationUpdateFormContainer() {

  return (
        <div className="Form-Container">
            <div className = "heading-container">
            <h1 className='Form-Heading'>Destination Details</h1>
            </div>
            <DestinationUpdateForm/>
        </div>
  )
}

export default DestinationUpdateFormContainer
