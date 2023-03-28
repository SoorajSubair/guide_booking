import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import GuideAddFormContainer from '../FormContainer/GuideAddFormContainer';
import Navbar from '../Navbar/Navbar';
import './ContainerAdd.css'

function GuideAddContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <GuideAddFormContainer/>
    </div>
  )
}

export default GuideAddContainer