import React, {useContext} from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import '../Dashboard/Dashboard.css'
import { ResizeContext } from '../../../Context/ResizeContext'
import DestinationsContainer from '../../../Components/Admin/Container/DestinationsContainer';


function Destinations() {
    const { isSmallScreen } = useContext(ResizeContext);

    return (
      <div className='dashboard'>
          <div className={isSmallScreen ? 'dashboard-container': "dashboard-container dashboard-container-NX"}>
              <Sidebar/> 
          </div>
          <DestinationsContainer/>
      </div>
    )
}

export default Destinations