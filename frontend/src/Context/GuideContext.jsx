import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../Utils/axios';
import { getGuide } from '../Utils/Urls';
import { useParams } from 'react-router-dom';

const GuideContext = createContext();

function GuideProvider(props) {
  const { guideId } = useParams();
  const [guide, setGuide] = useState({});
  const url = `${getGuide}${guideId}`;

  useEffect(() => {

    window.scrollTo(0, 0);

    axios.get(url, {

        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 200) {
          setGuide(response.data);
        }
      });
  }, [url]);

  return (
    <GuideContext.Provider value={guide}>
      {props.children}
    </GuideContext.Provider>
  );
}

function useGuide() {
    return useContext(GuideContext);
  }
  
  export { GuideProvider, useGuide };