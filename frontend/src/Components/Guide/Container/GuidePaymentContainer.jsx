import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import GuideNavbar from '../Navbar/GuideNavbar';
import './Container.css'
import GuidePaymentTable from '../Tables/GuidePaymentTable';

function GuidePaymentContainer() {
    const { isExpanded } = useContext(ResizeContext);

    return (
      <div className={ isExpanded ? "containers" : "containers containers-NX" } >
          <GuideNavbar/>
          <div class="guide-Table-Container">
            <GuidePaymentTable/>
       
        </div>
      </div>
    )
}

export default GuidePaymentContainer
