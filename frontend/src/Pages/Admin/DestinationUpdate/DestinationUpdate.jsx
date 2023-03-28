import React, {useContext} from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import '../Dashboard/Dashboard.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import DestinationUpdateContainer from '../../../Components/Admin/Container/DestinationUpdateContainer';




function DestinationUpdate() {
    const { isSmallScreen } = useContext(ResizeContext);

    return (
      <div className='dashboard'>
          <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
              <Sidebar/> 
          </div>
        <DestinationUpdateContainer/>
      </div>
    )
}

export default DestinationUpdate
