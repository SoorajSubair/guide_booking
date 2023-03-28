import React, { createContext, useState, useEffect } from 'react';

export const ResizeContext = createContext();

export const ResizeProvider = ({ children }) => {
  const [isExpanded, setExpendState] = useState(false);
  const [isSmallScreen, setIsSmaillScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setExpendState(window.innerWidth > 768);
      setIsSmaillScreen(window.innerWidth > 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpandedState = () => {
    setExpendState(prevState => !prevState);
    setIsSmaillScreen(prevState => !prevState);
  };

  const toggleIsSmallScreen = () => {
    setIsSmaillScreen(prevState => !prevState);
    setExpendState(prevState => !prevState);
  };

  return (
    <ResizeContext.Provider value={{ isExpanded, toggleExpandedState, isSmallScreen, toggleIsSmallScreen }}>
      {children}
    </ResizeContext.Provider>
  );
};

