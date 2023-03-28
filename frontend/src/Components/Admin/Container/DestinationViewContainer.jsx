import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import Navbar from '../Navbar/Navbar';
import DestinationViewFormContainer from '../ViewContainer/DestinationViewFormContainer';
import './ContainerAdd.css'

function DestinationViewContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <DestinationViewFormContainer/>
        {/* <DestinationAddFormContainer/> */}
    </div>
  )
}

export default DestinationViewContainer
