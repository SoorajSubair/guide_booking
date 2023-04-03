import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import Navbar from '../Navbar/Navbar';
import './Container.css'
import PaymentsTableContainer from '../TableContainer/PaymentsTableContainer';

function PaymentsContainer() {

    const { isExpanded } = useContext(ResizeContext);

  return (
    <div className={ isExpanded ? "containers" : "containers containers-NX" } >
        <Navbar/>
        <PaymentsTableContainer/>
    </div>
  )
}

export default PaymentsContainer