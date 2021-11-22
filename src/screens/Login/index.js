import React, { useState, useCallback } from 'react';
import { 
  View,
  Text,
  Image,
  StatusBar, 
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import LoginHeader from '../../components/UI/LoginHeader';
import LoginForm from '../../components/Forms/LoginForm';
import Snackbar from '../../components/UI/Animated/Snackbar';
import SignupTab from '../../components/UI/Animated/SignupTab';

import { containerStyle, textStyle } from './styles';

function Login() {
  const [openSnack, setOpenSnack] = useState(false);
  const [isSignupTabOpen, setIsSignupTabOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isSignupTabOpen) {
          toggleSignupTabOpen();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isSignupTabOpen, toggleSignupTabOpen])
  );

  const toggleSignupTabOpen = useCallback(() => {
    setIsSignupTabOpen(prevState => !prevState);
  }, []);

  const toggleSnackbarOpen = useCallback(() => {
    setOpenSnack(prevState => !prevState);
  }, []);

  function getStatusBarColor() {
    if (isSignupTabOpen) {
      return <StatusBar backgroundColor="#326e52" />
    }

    return <StatusBar backgroundColor="#52B788" />
  };

  return (
    <>
      <View style={containerStyle.mainContainer}>
        <LoginHeader />
        {getStatusBarColor()}
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
      <SignupTab 
        toggleSnackbarOpen={toggleSnackbarOpen} 
        toggleSignupTabOpen={toggleSignupTabOpen} 
        isTabOpen={isSignupTabOpen} 
      />
    </>
  );
};

export default Login;