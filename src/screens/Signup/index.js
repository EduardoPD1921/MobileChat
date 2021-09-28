import React from 'react';
import { View, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { containerStyle, inputStyle, imageStyle } from './styles';

function Register() {
  return (
    <View style={containerStyle.mainContainer}>
      <View style={containerStyle.formContainer}>
        <View style={containerStyle.inputContainer}>
          <Icon
            style={imageStyle.inputIcon}
            name="user"
            size={20} 
          />
          <TextInput
            style={inputStyle.defaultSignupInput}
            placeholder="Nome" 
          />
        </View>
        <View style={containerStyle.inputContainer}>
          <Icon
            style={imageStyle.inputIcon}
            name="mail"
            size={20} 
          />
          <TextInput
            style={inputStyle.defaultSignupInput}
            placeholder="E-mail" 
          />
        </View>
      </View>
    </View>
  );
};

export default Register;