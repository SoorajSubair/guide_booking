import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import Navbar from '../Navbar/Navbar';
import UserTableContainer from '../TableContainer/UserTableContainer';
import './Container.css'

function UsersContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <UserTableContainer/>
    </div>
  )
}

export default UsersContainer
