import React, { useState, useEffect } from 'react';
import AllDestinationsSlider from '../../../Components/Users/AllDestinationsSlider/AllDestinationsSlider';
import Certification from '../../../Components/Users/Certification/Certification';
import Footer from '../../../Components/Users/Footer/Footer';
import Header from '../../../Components/Users/Header/Header';
import NavBar from '../../../Components/Users/Navbar/Navbar';
import Services from '../../../Components/Users/Services/Services';
import Top5Destinations from '../../../Components/Users/Top5Destinations/Top5Destinations';
import Top5NatureFriendly from '../../../Components/Users/Top5NatureFriendly/Top5NatureFriendly';

function Landing() {
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  useEffect(() => {
    setComponentsLoaded(true);
  }, []);

  return (
    <>
      {componentsLoaded ? (
        <div>
          <NavBar />
          <Header />
          <AllDestinationsSlider />
          <Services />
          <Top5Destinations />
          <Certification />
          <Top5NatureFriendly />
          <Footer />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Landing;

