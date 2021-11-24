import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';

import { useFormik } from 'formik';
import SignupSchema from '../../../validations/SignupValidation';

import api from '../../../api';

import ErrorText from './ErrorText';

import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { signupFormStyles } from './styles';

function SignupForm({ toggleSignupTabOpen, toggleSnackbarOpen }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { handleChange, handleSubmit, resetForm, values, errors, touched } = useFormik({
    initialValues: { userName: '', userEmail: '', userPhone: '', userPassword: '' },
    onSubmit: async values => {
      setIsLoading(true);

      try {
        const requestResp = await api.post('/user/store', values);
        toggleSnackbarOpen();
        cancelForm();
      } catch (error) {
        console.warn(error.response.data);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: SignupSchema
  });

  function getSecurePasswordIcon() {
    if (hidePassword) {
      return (
        <TouchableOpacity onPress={toggleHidePassword} style={signupFormStyles.eyeIcon}>
          <IonIcon name="eye-off" color="#52B788" size={20} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={toggleHidePassword} style={signupFormStyles.eyeIcon}>
        <IonIcon name="eye" color="#52B788" size={20} />
      </TouchableOpacity>
    );
  };

  function toggleHidePassword() {
    setHidePassword(prevState => !prevState);
  };

  function cancelForm() {
    resetForm({ values: '' });
    toggleSignupTabOpen();
  };

  function renderErrorText(touched, error) {
    if (touched && error) {
      return <ErrorText>{error}</ErrorText>
    }
  };

  function getIconStyle(touched, error) {
    if (touched && error) {
      return [signupFormStyles.icon, { color: 'red' }];
    }

    return signupFormStyles.icon;
  };

  function getInputStyle(touched, error) {
    if (touched && error) {
      return [signupFormStyles.input, { borderBottomColor: 'red' }];
    }

    return signupFormStyles.input;
  };

  function maskPhone(rawValue) {
    return rawValue
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  };

  function getActionButtons() {
    if (isLoading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <ActivityIndicator
            color="#52B788"
            size={20} 
          />
        </View>
      );
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableHighlight 
          underlayColor="#bd3734" 
          onPress={cancelForm} 
          style={[signupFormStyles.formActionButton, { backgroundColor: '#F34642' }]}
        >
          <Text style={signupFormStyles.buttonTitle}>Cancelar</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor="#40916C" 
          onPress={handleSubmit} 
          style={[signupFormStyles.formActionButton, { backgroundColor: '#52B788' }]}
        >
          <Text style={signupFormStyles.buttonTitle}>Cadastrar</Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={signupFormStyles.formContainer}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={signupFormStyles.inputContainer}>
          <FeatherIcon 
            name="user"  
            size={20} 
            style={getIconStyle(touched.userName, errors.userName)} 
          />
          <TextInput 
            value={values.userName} 
            onChangeText={handleChange('userName')} 
            placeholder="Nome" 
            style={getInputStyle(touched.userName, errors.userName)} 
          />
          {renderErrorText(touched.userName, errors.userName)}
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 40 }]}>
          <FeatherIcon
            name="mail" 
            size={20} 
            style={getIconStyle(touched.userEmail, errors.userEmail)} 
          />
          <TextInput 
            keyboardType="email-address"
            value={values.userEmail}
            onChangeText={handleChange('userEmail')} 
            placeholder="E-mail"
            style={getInputStyle(touched.userEmail, errors.userEmail)} 
          />
          {renderErrorText(touched.userEmail, errors.userEmail)}
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 40 }]}>
          <FeatherIcon 
            name="smartphone" 
            size={20} 
            style={getIconStyle(touched.userPhone, errors.userPhone)} 
          />
          <TextInput 
            value={maskPhone(values.userPhone)}
            onChangeText={handleChange('userPhone')} 
            placeholder="Telefone" 
            keyboardType="phone-pad"
            style={getInputStyle(touched.userPhone, errors.userPhone)} 
          />
          {renderErrorText(touched.userPhone, errors.userPhone)}
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 40 }]}>
          <FeatherIcon 
            name="lock"  
            size={20} 
            style={getIconStyle(touched.userPassword, errors.userPassword)} 
          />
          <TextInput 
            value={values.userPassword}
            onChangeText={handleChange('userPassword')} 
            secureTextEntry={hidePassword} 
            placeholder="Senha" 
            style={touched.userPassword && errors.userPassword ? [signupFormStyles.input, { borderBottomColor: 'red', paddingRight: 60 }] : [signupFormStyles.input, { paddingRight: 60 }]}
          />
          {getSecurePasswordIcon()}
          {renderErrorText(touched.userPassword, errors.userPassword)}
        </View>
        {getActionButtons()}
      </View>
    </View>
  );
};

export default SignupForm;