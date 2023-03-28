import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import DestinationAddFormContainer from '../FormContainer/DestinationAddFormContainer';
import Navbar from '../Navbar/Navbar';
import './ContainerAdd.css'

function DestinationAddContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <DestinationAddFormContainer/>
    </div>
  )
}

export default DestinationAddContainer
