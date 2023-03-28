import React, {useContext} from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import '../Dashboard/Dashboard.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import DestinationViewContainer from '../../../Components/Admin/Container/DestinationViewContainer';


function DestinationView() {
    const { isSmallScreen } = useContext(ResizeContext);

    return (
      <div className='dashboard'>
          <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
              <Sidebar/> 
          </div>
        <DestinationViewContainer/>
      </div>
    )
}

export default DestinationView
