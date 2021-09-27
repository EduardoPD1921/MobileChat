import React from 'react';
import { 
  View,
  Text,
  Image,
  StatusBar, 
  KeyboardAvoidingView
} from 'react-native';

import LoginForm from '../../components/Forms/LoginForm';

import { containerStyle, textStyle } from './styles';

function Login({ navigation }) {
  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar
        backgroundColor="#52B788"
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