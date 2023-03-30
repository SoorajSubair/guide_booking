import React, {useContext} from 'react'
import './GuideHome.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import GuideSidebar from '../../../Components/Guide/Sidebar/GuideSidebar';
import GuideProfileContainer from '../../../Components/Guide/Container/GuideProfileContainer';

function GuideHome() {
  const { isSmallScreen } = useContext(ResizeContext);

  return (
    <div className='guide-dashboard'>
        <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
            <GuideSidebar/> 
        </div>
        <GuideProfileContainer/>
    </div>
  )
}

export default GuideHome