import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext'
import GuideSidebar from '../../../Components/Guide/Sidebar/GuideSidebar';
import GuideChatContainer from '../../../Components/Guide/Container/GuideChatContainer';


function GuideChat() {
  const { isSmallScreen } = useContext(ResizeContext);

  return (
    <div className='guide-dashboard'>
        <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
            <GuideSidebar/> 
        </div>
        <GuideChatContainer/>
    </div>
  )
}

export default GuideChat