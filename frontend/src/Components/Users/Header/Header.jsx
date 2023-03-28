import React from 'react'
import './Header.css'
// import image1 from '../../../Assets/images/Amsterdam1.jpg'
import {FaSearch} from "react-icons/fa";
// import axios from '../../../Utils/axios'
// import { getDestinations, baseUrl } from '../../../Utils/Urls';
import { motion } from 'framer-motion';
import travel1 from '../../../Assets/images/travel1.jpg'
import travel2 from '../../../Assets/images/travel2.jpg'
import travel3 from '../../../Assets/images/travel3.jpg'
import travel4 from '../../../Assets/images/travel4.jpg'
import travel5 from '../../../Assets/images/travel5.jpg'

function Header() {

    // const [destinationImages, setDestinationImages] = useState([]);
    // const [mainImageIndex, setMainImageIndex] = useState(0);
    // const [extraImages, setExtraImages] = useState([]);


    // useEffect(() => {
    //     axios.get(getDestinations,{
    //       headers: {'Content-Type': 'application/json' },
    //     })
    //     .then((response) => {
    //       if (response.status === 200) {
    //         const images = response.data.map((destination) => ({
    //           image: destination.image,
    //           extraImages: destination.extra_images
    //         }));
    //         setDestinationImages(images);
    //         // set the first extra image of each destination as the initial extra images
    //         const initialExtraImages = images.map((destination) => destination.extraImages[0]);
    //         setExtraImages(initialExtraImages);

    //       } 
    //     })    
    //   },[]);


      

      // useEffect(() => {
      //   // const interval = setInterval(() => {
      //     setExtraImages((prevExtraImages) =>
      //       destinationImages.map((destination, index) => {
      //         const currentIndex = destination.extraImages.indexOf(prevExtraImages[index]);
      
      //         // if all extra images have been shown, reset to the first image
      //         if (currentIndex === destination.extraImages.length - 1) {
      //           return destination.extraImages[0];
      //         }
      
      //         // otherwise, show the next image
      //         return destination.extraImages[currentIndex + 1];
      //       })
      //     );
      //   // }, 5000);
      
      //   // clear the interval on unmount
      //   // return () => clearInterval(interval);
      // }, [destinationImages]);


    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //       setMainImageIndex((prevIndex) => {
    //         // If we've reached the last image, reset to the first one
    //         if (prevIndex === destinationImages.length - 1) {
    //           return 0;
    //         }
    //         // Otherwise, move to the next image
    //         return prevIndex + 1;
    //       });
    //     }, 5000);
      
    //     return () => clearInterval(interval);
    //   }, [destinationImages]);

      
  return (
   <div className='header-container'>
    <div className='header-position'>
    <div className='header-flex-container'>
        
        <div className='header-titles'>
            <p className='header-subtitle'>Private & Sustainable Tours</p>
            <h1 className='header-headind'>Travel Better,
                <br/>
                <span className='header-heading highlight'>Go Native!</span>
            <p className='header-paragraph'>Book unique and memorable travel<br/> experience guided by natives</p>
            </h1>
            <div className='search-form-elem flex flex-sb bg-white'>
                <input type = "text" className='form-control1' placeholder='Where are you going?' r/>
                    <button type = "submit" className='flex flex-c' onClick=''>
                        <FaSearch className='text-purple' size = {32} />
                    </button>
            </div>
        </div>
     
        <motion.div initial={{y:'-100vw'}} animate={{y:'0'}} transition={{type:"spring", duration:2}} className='header-images'>
        {/* <div className='header-images'> */}
            <div className='grid-images'>
                <div className='column1 images' style={{ backgroundImage: `url(${travel1})` }}></div>
                <div className='column2-1 images images-none' style={{ backgroundImage: `url(${travel2})` }}></div>
                <div className='column2-2 images images-none' style={{ backgroundImage: `url(${travel3})` }}></div>
                <div className='column3-1 images images-none' style={{ backgroundImage: `url(${travel4})` }}></div>
                <div className='column3-2 images images-none' style={{ backgroundImage: `url(${travel5})` }}></div>
                
            </div>
        </motion.div>

    </div>
    </div>
   </div>
  )
}

export default Header
