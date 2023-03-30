import React, {useContext} from 'react'
import { ResizeContext } from '../../../Context/ResizeContext';
import GuideNavbar from '../Navbar/GuideNavbar';
import ProfileImageCard from '../ProfileImageCard/ProfileImageCard';
import './Container.css'
import ProfileBioCard from '../ProfileBioCard/ProfileBioCard';

function GuideProfileContainer() {
    const { isExpanded } = useContext(ResizeContext);

    return (
      <div className={ isExpanded ? "containers" : "containers containers-NX" } >
          <GuideNavbar/>
          <div class="guide-Table-Container">
            <ProfileImageCard/>
            <ProfileBioCard/>
       
        </div>
      </div>
    )
}

export default GuideProfileContainer
