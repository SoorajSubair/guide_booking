import React from 'react'
import GuideAddForm from '../Forms/GuideAddForm'
import './FormContainer.css'

function GuideAddFormContainer() {

  return (
        <div className="Form-Container">
            <div className = "heading-container">
            <h1 className='Form-Heading'>Guide Details</h1>
            </div>
            <GuideAddForm/>
        </div>
  )
}

export default GuideAddFormContainer
