import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import DestinationUpdateFormContainer from '../FormContainer/DestinationUpdateFormContainer';
import Navbar from '../Navbar/Navbar';
import './ContainerAdd.css'

function DestinationUpdateContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <DestinationUpdateFormContainer/>
    </div>
  )
}

export default DestinationUpdateContainer
