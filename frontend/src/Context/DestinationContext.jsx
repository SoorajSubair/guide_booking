import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../Utils/axios';
import { viewDestination } from '../Utils/Urls';
import { useParams } from 'react-router-dom';

const DestinationContext = createContext();

function DestinationProvider(props) {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState({});
  const url = `${viewDestination}${destinationId}`;

  useEffect(() => {

    window.scrollTo(0, 0);

    axios.get(url, {

        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 200) {
          setDestination(response.data);
        }
      });
  }, [url]);

  return (
    <DestinationContext.Provider value={destination}>
      {props.children}
    </DestinationContext.Provider>
  );
}

function useDestination() {
    return useContext(DestinationContext);
  }
  
  export { DestinationProvider, useDestination };