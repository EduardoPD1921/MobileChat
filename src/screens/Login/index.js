import React, { useState, useEffect, useCallback } from 'react';
import { 
  View,
  Text,
  Image,
  StatusBar, 
  KeyboardAvoidingView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import LoginHeader from '../../components/UI/LoginHeader';
import LoginForm from '../../components/Forms/LoginForm';
import Snackbar from '../../components/UI/Animated/Snackbar';
import SignupTab from '../../components/UI/Animated/SignupTab';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { containerStyle, textStyle } from './styles';

function Login() {
  const [openSnack, setOpenSnack] = useState(false);
  const [isSignupTabOpen, setIsSignupTabOpen] = useState(false);

  const isFocused = useIsFocused();

  useEffect(async () => {
    if (isFocused) {
      const snackbarOpen = await AsyncStorage.getItem('snackbarOpen');
      if (snackbarOpen) {
        setOpenSnack(true);
        AsyncStorage.removeItem('snackbarOpen');
      }
    }
  }, [isFocused]);

  const toggleSignupTabOpen = useCallback(() => {
    setIsSignupTabOpen(prevState => !prevState);
  }, []);

  return (
    <>
      <View style={containerStyle.mainContainer}>
        <LoginHeader />
        <StatusBar
          backgroundColor="#52B788"
        />
        <Snackbar
          openSnack={openSnack}
          setSnackbarStatus={setOpenSnack}
        />
        <KeyboardAvoidingView style={{ flex: 6, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={containerStyle.titleContainer}>
            <Image
              source={require('../../assets/images/loginIcon.png')} 
            />
            <Text style={textStyle.title}>MobileChat</Text>
          </View>
          <LoginForm toggleSignupTabOpen={toggleSignupTabOpen} />
        </KeyboardAvoidingView>
        <View style={{ flex: 1 }} />
      </View>
      <SignupTab toggleSignupTabOpen={toggleSignupTabOpen} isTabOpen={isSignupTabOpen} />
    </>
  );
};

export default Login;