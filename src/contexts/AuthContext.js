import React, { useEffect, createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import socket from '../socket';
import api from '../api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [authUserInfo, setAuthUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      console.log(authToken);

      if (authToken) {
        api.defaults.headers.Authorization = `${JSON.parse(authToken)}`;
        const userInfo = await AsyncStorage.getItem('userInfo');
        
        setAuthUserInfo(JSON.parse(userInfo));
        setAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  async function handleAuth(authToken, userInfo) {
    try {
      await AsyncStorage.setItem('authToken', JSON.stringify(authToken));
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  
      api.defaults.Authorization = `${authToken}`;
      setAuthUserInfo(userInfo);
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleLogout() {
    try {
      socket.disconnect();

      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userInfo');

      api.defaults.Authorization = null;
      setAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, authUserInfo, isLoading, handleAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };