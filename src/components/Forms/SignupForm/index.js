import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';

import { useFormik } from 'formik';

import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { signupFormStyles } from './styles';

function SignupForm() {
  const [hidePassword, setHidePassword] = useState(true);

  const { handleChange, handleSubmit } = useFormik({
    initialValues: { userName: '', userEmail: '', userPhone: '', userPassword: '' },
    onSubmit: values => {
      console.log(values);
    }
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

  return (
    <ScrollView style={signupFormStyles.formContainer}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={signupFormStyles.inputContainer}>
          <FeatherIcon name="user" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput onChangeText={handleChange('userName')} placeholder="Nome" style={signupFormStyles.input} />
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 30 }]}>
          <FeatherIcon name="mail" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput onChangeText={handleChange('userEmail')} placeholder="E-mail" style={signupFormStyles.input} />
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 30 }]}>
          <FeatherIcon name="smartphone" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput onChangeText={handleChange('userPhone')} placeholder="Telefone" style={signupFormStyles.input} />
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 30 }]}>
          <FeatherIcon name="lock" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput onChangeText={handleChange('userPassword')} secureTextEntry={hidePassword} placeholder="Senha" style={[signupFormStyles.input, { paddingRight: 35 }]} />
          {getSecurePasswordIcon()}
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight style={{ width: 100, height: 40, backgroundColor: '#52B788', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 40 }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium' }}>Cadastrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupForm;