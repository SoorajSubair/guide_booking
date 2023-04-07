import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import GuideNavbar from '../Navbar/GuideNavbar';
import './Container.css'
import GuideChatComponent from '../GuideChatComponent/GuideChatComponent';


function GuideChatContainer() {
    const { isExpanded } = useContext(ResizeContext);

    return (
      <div className={ isExpanded ? "containers" : "containers containers-NX" } >
          <GuideNavbar/>
          {/* <div class="guide-Table-Container"> */}
            <GuideChatComponent/>     
       
        {/* </div> */}
      </div>
    )
}

export default GuideChatContainer
