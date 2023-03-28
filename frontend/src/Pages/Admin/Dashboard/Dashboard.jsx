import React, {useContext} from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import './Dashboard.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import DashboardContainer from '../../../Components/Admin/Container/DashboardContainer';

function Dashboard() {
  const { isSmallScreen } = useContext(ResizeContext);

  return (
    <div className='dashboard'>
        <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
            <Sidebar/> 
        </div>
        <DashboardContainer/>
    </div>
  )
}

export default Dashboard
