import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import Navbar from '../Navbar/Navbar';
import DashboardChartContainer from '../TableContainer/DashboardChartContainer';
import './Container.css'

function DashboardContainer() {
    const { isExpanded } = useContext(ResizeContext);

    return (
      <div className={ isExpanded ? "containers" : "containers containers-NX" } >
          <Navbar/>
          <DashboardChartContainer/>
      </div>
    )
}

export default DashboardContainer
