import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import { containerStyle, inputStyle, imageStyle, textStyle } from './styles';

function Register() {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Insira seu nome.'),
    email: Yup.string()
      .email('E-mail inválido.')
      .required('Insira um e-mail.'),
    phone: Yup.string()
      .min(15, 'Número inválido.')
      .max(15, 'Número inválido.')
      .required('Insira um número.'),
    password: Yup.string()
      .min(8, 'Senha muito curta.')
      .required('Insira uma senha.')
  });

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { name: '', email: '', phone: '', password: '' },
    onSubmit: values => {
      console.log(unmaskPhone(values.phone));
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
            onChangeText={handleChange('name')}
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
            onChangeText={handleChange('email')}
          />
        </View>
        <View style={containerStyle.inputContainer}>
          <Icon
            style={imageStyle.inputIcon}
            name="smartphone"
            size={20} 
          />
          <TextInput
            style={inputStyle.defaultSignupInput}
            placeholder="Telefone"
            onChangeText={handleChange('phone')}
            value={maskPhone(values.phone)}
            keyboardType="phone-pad"
          />
        </View>
        <View style={containerStyle.inputContainer}>
          <Icon
            style={imageStyle.inputIcon}
            name="lock"
            size={20} 
          />
          <TextInput
            style={inputStyle.defaultSignupInput}
            placeholder="Senha" 
            secureTextEntry
            onChangeText={handleChange('password')}
          />
        </View>
        <TouchableHighlight underlayColor="#40916C" style={inputStyle.submitSignupForm}>
          <Text style={textStyle.submitText}>Cadastre-se</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Register;