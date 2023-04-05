import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext'
import GuideSidebar from '../../../Components/Guide/Sidebar/GuideSidebar';
import GuidePaymentContainer from '../../../Components/Guide/Container/GuidePaymentContainer';


function Payment() {
  const { isSmallScreen } = useContext(ResizeContext);

  return (
    <div className='guide-dashboard'>
        <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
            <GuideSidebar/> 
        </div>
        <GuidePaymentContainer/>
    </div>
  )
}

export default Payment