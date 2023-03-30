import React, {useContext} from 'react'
import './GuideSchedule.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import GuideSidebar from '../../../Components/Guide/Sidebar/GuideSidebar';
import GuideScheduleContainer from '../../../Components/Guide/Container/GuideScheduleContainer';


function GuideSchedule() {
  const { isSmallScreen } = useContext(ResizeContext);

  return (
    <div className='guide-dashboard'>
        <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
            <GuideSidebar/> 
        </div>
        <GuideScheduleContainer/>
    </div>
  )
}

export default GuideSchedule