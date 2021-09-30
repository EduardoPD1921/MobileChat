import React, { useState } from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';

import api from '../../../api';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import ErrorText from './ErrorText';

import { containerStyle, inputStyle, imageStyle, textStyle } from './styles';

function SignupForm() {
  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Insira seu nome.'),
    userEmail: Yup.string()
      .email('E-mail inválido.')
      .required('Insira um e-mail.'),
    userPhone: Yup.string()
      .min(15, 'Número inválido.')
      .max(15, 'Número inválido.')
      .required('Insira um número.'),
    userPassword: Yup.string()
      .min(8, 'Senha muito curta.')
      .required('Insira uma senha.')
  });

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { userName: '', userEmail: '', userPhone: '', userPassword: '' },
    onSubmit: values => {
      const { userEmail, userName, userPhone, userPassword } = values;
      api.post('/user/store', { userName, userEmail, userPhone, userPassword })
        .then(resp => console.log(resp))
        .catch(error => console.warn(error.response.data));
    },
    validationSchema: SignupSchema
  });

  function maskPhone(rawValue) {
    return rawValue
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  };

  function unmaskPhone(maskedValue) {
    return maskedValue
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '');
  };

  function inputStyleHandler(touched, error) {
    if (touched && error) {
      return [inputStyle.defaultSignupInput, { borderBottomColor: 'red' }];
    }

    return inputStyle.defaultSignupInput;
  };

  function renderErrorText(touched, error) {
    if (touched && error) {
      return <ErrorText>{error}</ErrorText>
    }
  };

  return (
    <View style={containerStyle.formContainer}>
      <View style={containerStyle.inputContainer}>
        <Icon
          style={
            touched.userName && errors.userName ?
            [imageStyle.inputIcon, { color: 'red' }] :
            imageStyle.inputIcon
          }
          name="user"
          size={20} 
        />
        <TextInput
          style={inputStyleHandler(touched.userName, errors.userName)}
          placeholder="Nome" 
          onChangeText={handleChange('userName')}
        />
        {renderErrorText(touched.userName, errors.userName)}
      </View>
      <View style={containerStyle.inputContainer}>
        <Icon
          style={
            touched.userEmail && errors.userEmail ?
            [imageStyle.inputIcon, { color: 'red' }] :
            imageStyle.inputIcon
          }
          name="mail"
          size={20} 
        />
        <TextInput
          style={inputStyleHandler(touched.userEmail, errors.userEmail)}
          placeholder="E-mail" 
          onChangeText={handleChange('userEmail')}
        />
        {renderErrorText(touched.userEmail, errors.userEmail)}
      </View>
      <View style={containerStyle.inputContainer}>
        <Icon
          style={
            touched.userPhone && errors.userPhone ?
            [imageStyle.inputIcon, { color: 'red' }] :
            imageStyle.inputIcon
          }
          name="smartphone"
          size={20} 
        />
        <TextInput
          style={inputStyleHandler(touched.userPhone, errors.userPhone)}
          placeholder="Telefone"
          onChangeText={handleChange('userPhone')}
          value={maskPhone(values.userPhone)}
          keyboardType="phone-pad"
        />
        {renderErrorText(touched.userPhone, errors.userPhone)}
      </View>
      <View style={containerStyle.inputContainer}>
        <Icon
          style={
            touched.userPassword && errors.userPassword ?
            [imageStyle.inputIcon, { color: 'red' }] :
            imageStyle.inputIcon
          }
          name="lock"
          size={20} 
        />
        <TextInput
          style={inputStyleHandler(touched.userPassword, errors.userPassword)}
          placeholder="Senha" 
          secureTextEntry
          onChangeText={handleChange('userPassword')}
        />
        {renderErrorText(touched.userPassword, errors.userPassword)}
      </View>
      <TouchableHighlight onPress={handleSubmit} underlayColor="#40916C" style={inputStyle.submitSignupForm}>
        <Text style={textStyle.submitText}>Cadastre-se</Text>
      </TouchableHighlight>
    </View>
  );
};

export default SignupForm;