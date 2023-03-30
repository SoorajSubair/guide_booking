import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import GuideNavbar from '../Navbar/GuideNavbar';
import GuideSchedulesTable from '../Tables/GuideSchedulesTable';
import './Container.css'

function GuideScheduleContainer() {
    const { isExpanded } = useContext(ResizeContext);

    return (
      <div className={ isExpanded ? "containers" : "containers containers-NX" } >
          <GuideNavbar/>
          <div class="guide-Table-Container">
            <GuideSchedulesTable/>
       
        </div>
      </div>
    )
}

export default GuideScheduleContainer
