import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import Navbar from '../Navbar/Navbar';
import GuideTableContainer from '../TableContainer/GuideTableContainer';
import './Container.css'

function GuidesContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <GuideTableContainer/>
    </div>
  )
}

export default GuidesContainer
