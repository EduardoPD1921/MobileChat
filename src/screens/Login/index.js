import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  Image,
  StatusBar, 
  KeyboardAvoidingView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import LoginForm from '../../components/Forms/LoginForm';
import Snackbar from '../../components/UI/Animated/Snackbar';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { io } from 'socket.io-client';
const socket = io('http://127.0.0.1:8000');

import { containerStyle, textStyle } from './styles';

function Login({ navigation }) {
  const [openSnack, setOpenSnack] = useState(false);

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

  return (
    <View style={containerStyle.mainContainer}>
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
        <LoginForm navigation={navigation} />
      </KeyboardAvoidingView>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default Login;