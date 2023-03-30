import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import GuideProfileEditForm from '../Forms/GuideProfileEditForm';
import GuideNavbar from '../Navbar/GuideNavbar';
import './ContainerForm.css'

function GuideProfileEditContainer() {
    const { isExpanded } = useContext(ResizeContext);

    return (
      <div className={ isExpanded ? "containers" : "containers containers-NX" } >
          <GuideNavbar/>
          <div className="guide-Form-Container">
            <div className = "heading-container">
            <h1 className='guide-Form-Heading'>UPDATE YOUR DETAILS</h1>
            </div>
            <GuideProfileEditForm/>
        </div>
      </div>
    )
}

export default GuideProfileEditContainer