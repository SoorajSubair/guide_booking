import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import UserAddFormContainer from '../FormContainer/UserAddFormContainer';
import Navbar from '../Navbar/Navbar';
import './ContainerAdd.css'

function UserAddContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <UserAddFormContainer/>
    </div>
  )
}

export default UserAddContainer
