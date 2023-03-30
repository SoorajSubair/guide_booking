import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext'
import GuideSidebar from '../../../Components/Guide/Sidebar/GuideSidebar';
import GuideProfileEditContainer from '../../../Components/Guide/Container/GuideProfileEditContainer';



function ProfileEdit() {
  const { isSmallScreen } = useContext(ResizeContext);

  return (
    <div className='guide-dashboard'>
        <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
            <GuideSidebar/> 
        </div>
            <GuideProfileEditContainer/>
    </div>
  )
}

export default ProfileEdit