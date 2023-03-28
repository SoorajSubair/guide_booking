import React, {useContext} from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import '../Dashboard/Dashboard.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import DestinationAddContainer from '../../../Components/Admin/Container/DestinationAddContainer';



function DestinationAdd() {
    const { isSmallScreen } = useContext(ResizeContext);

    return (
      <div className='dashboard'>
          <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
              <Sidebar/> 
          </div>
        <DestinationAddContainer/>
      </div>
    )
}

export default DestinationAdd
