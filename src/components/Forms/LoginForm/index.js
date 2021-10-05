import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import api from '../../../api';

import { AuthContext } from '../../../contexts/AuthContext';

import { useFormik } from 'formik';

import Icon from 'react-native-vector-icons/Feather';

import ErrorText from '../SignupForm/ErrorText';

import { containerStyle, inputStyle, imageStyle, textStyle } from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginForm({ navigation }) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { handleAuth } = useContext(AuthContext);

  const { handleChange, handleSubmit } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => {
      const { email, password } = values;

      api.post('/user/tryAuth', { email, password })
        .then(resp => {
          if (resp.data.message === 'user-authenticated') {
            console.log('test');
            handleAuth(resp.data.token);
            navigation.replace('Home');
          }
        })
        .catch(error => onSubmitErrorHandler(error.response.data.message));
    }
  });

  function onSubmitErrorHandler(errorMessage) {
    setEmailError('');
    setPasswordError('');

    switch (errorMessage) {
      case 'wrong-email':
        return setEmailError('E-mail não cadastrado.');
      case 'email-required':
        return setEmailError('Digite seu e-mail.');
      case 'wrong-password':
        return setPasswordError('Senha incorreta.');
      case 'password-required':
        return setPasswordError('Digite sua senha.');
      default:
        console.log(errorMessage);
    }
  };

  function emailInputStyleHandler() {
    if (emailError) {
      return [inputStyle.defaultLoginInput, { borderBottomColor: 'red' }];
    }

    return inputStyle.defaultLoginInput;
  };

  function passwordInputStyleHandler() {
    if (passwordError) {
      return [inputStyle.defaultLoginInput, { borderBottomColor: 'red' }];
    }

    return inputStyle.defaultLoginInput;
  };

  function test() {
    AsyncStorage.getItem('authToken')
      .then(resp => console.log(resp))
      .catch(error => console.log(error));
    // AsyncStorage.removeItem('authToken');
  };

  return (
    <>
      <View style={containerStyle.formContainer}>
        <View style={containerStyle.inputContainer}>
          <Icon 
            name="user" 
            size={20}  
            style={
              emailError ?
              [imageStyle.inputIcon, { color: 'red' }] :
              imageStyle.inputIcon
            }
          />
          <TextInput
            placeholderTextColor="#9f9f9f"
            style={emailInputStyleHandler()}
            placeholder="E-mail"
            onChangeText={handleChange('email')} 
          />
          {emailError ? <ErrorText>{emailError}</ErrorText> : null}
        </View>
        <View style={containerStyle.inputContainer}>
          <Icon 
            name="lock" 
            size={20}  
            style={
              passwordError ?
              [imageStyle.inputIcon, { color: 'red' }] :
              imageStyle.inputIcon
            }
          />
          <TextInput
            placeholderTextColor="#9f9f9f"
            style={passwordInputStyleHandler()}
            secureTextEntry
            placeholder="Senha"
            onChangeText={handleChange('password')} 
          />
          {passwordError ? <ErrorText>{passwordError}</ErrorText> : null}
        </View>
      </View>
      <View style={containerStyle.formInfoContainer}>
        <View style={containerStyle.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={() => setRememberMe(prevState => !prevState)}
            tintColors={{ true: '#52B788', false: '#52B788' }}
            tintColor="#52B788"   
          />
          <Text style={textStyle.rememberMeText}>Lembrar-me</Text>
        </View>
        <TouchableOpacity onPress={test}>
          <Text style={[textStyle.rememberMeText, { color: '#95D5B2' }]}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={containerStyle.submitContainer}>
          <TouchableHighlight underlayColor="#40916C" onPress={handleSubmit} style={inputStyle.submitButton}>
            <Text style={textStyle.submitButtonText}>Entrar</Text>
          </TouchableHighlight>
          <Text style={textStyle.dividerText}>ou</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={textStyle.registerText}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginForm;