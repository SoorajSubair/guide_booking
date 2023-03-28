import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import Navbar from '../Navbar/Navbar';
import DestinationTableContainer from '../TableContainer/DestinationTableContainer';
import './Container.css'

function DestinationsContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <DestinationTableContainer/>
    </div>
  )
}

export default DestinationsContainer
