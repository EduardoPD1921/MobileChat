import React, { useEffect, createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('authToken')
      .then(resp => {
        if (resp) {
          api.defaults.headers.Authorization = `${JSON.parse(resp)}`;
          setAuthenticated(true);
        }
      })
      .catch(error => console.log(error));
  });

  function handleAuth(authToken) {
    AsyncStorage.setItem('authToken', JSON.stringify(authToken))
      .then(_ => {
        api.defaults.headers.Authorization = `${authToken}`;
        setAuthenticated(true);
      })
      .catch(error => console.log(error));
  };

  function handleLogout() {
    AsyncStorage.removeItem('authToken')
      .then(_ => {
        setAuthenticated(false);
        api.defaults.headers.Authorization = null;
      })
      .catch(error => console.log(error));
  };

  return (
    <AuthContext.Provider value={{ authenticated, handleAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };