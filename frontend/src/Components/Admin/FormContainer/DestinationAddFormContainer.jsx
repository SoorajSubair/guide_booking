import React from 'react'
import DestinationAddForm from '../Forms/DestinationAddForm'
import './FormContainer.css'

function DestinationAddFormContainer() {

  return (
        <div className="Form-Container">
            <div className = "heading-container">
            <h1 className='Form-Heading'>Destination Details</h1>
            </div>
            <DestinationAddForm/>
        </div>
  )
}

export default DestinationAddFormContainer
