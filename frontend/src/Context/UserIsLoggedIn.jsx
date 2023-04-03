import React, { useState, createContext } from 'react';

export const UserIsLoggedIn = createContext();

export const UserIsLoggedInProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserIsLoggedIn.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          {children}
        </UserIsLoggedIn.Provider>
      );

}