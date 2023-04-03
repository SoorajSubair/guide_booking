import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import Navbar from '../Navbar/Navbar';
import './Container.css'
import BookingsTableContainer from '../TableContainer/BookingsTableContainer';

function BookingsContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <BookingsTableContainer/>
    </div>
  )
}

export default BookingsContainer