import React, {useContext} from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import '../Dashboard/Dashboard.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import GuideAddContainer from '../../../Components/Admin/Container/GuideAddContainer';


function GuideAdd() {
    const { isSmallScreen } = useContext(ResizeContext);

    return (
      <div className='dashboard'>
          <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
              <Sidebar/> 
          </div>
          <GuideAddContainer/>
      </div>
    )
}

export default GuideAdd

