import React,{useState} from 'react'
import './Header.css'
// import image1 from '../../../Assets/images/Amsterdam1.jpg'
import {FaSearch} from "react-icons/fa";
import axios from '../../../Utils/axios'
import { getDestinationSearch } from '../../../Utils/Urls';
import { motion } from 'framer-motion';
import travel1 from '../../../Assets/images/travel1.jpg'
import travel2 from '../../../Assets/images/travel2.jpg'
import travel3 from '../../../Assets/images/travel3.jpg'
import travel4 from '../../../Assets/images/travel4.jpg'
import travel5 from '../../../Assets/images/travel5.jpg'
import { useNavigate } from 'react-router-dom';

function Header() {

    const [input, setInput] = useState("");
    const [results, setResults] = useState([])
    const navigate = useNavigate();

    const handleChange = (value) => {
        setInput(value);
        axios.get(getDestinationSearch,{
            headers: {'Content-Type': 'application/json' },
            })
            .then((response) => {
            if (response.status === 200) {
                
                const filteredData = response.data.filter(item => {
                    if(value){
                    return (
                        value &&
                        item &&
                        item.name &&
                        item.name.toLowerCase().includes(value)||item.country.toLowerCase().includes(value)
                    );
                    }
                  });
                  
                setResults(filteredData);
            } 
            })    

      };
      
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
                <input type = "text" className='form-control1' placeholder='Where are you going?' value={input} onChange={(e) => handleChange(e.target.value)}/>
                    <button type = "submit" className='flex flex-c' onClick=''>
                        <FaSearch className='text-purple' size = {32} />
                    </button>
            </div>
            {results && results.length > 0 &&
            <div className="results-list">
                {results.map((result) => (
                    <div onClick={()=>navigate(`/destination/${result.id}`)} key={result.id} className="search-result">{result.name}, {result.country}</div>
                ))}
            </div>
            }
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
