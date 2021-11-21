import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';

import { useFormik } from 'formik';

import FeatherIcon from 'react-native-vector-icons/Feather';

import { signupFormStyles } from './styles';

function SignupForm() {
  const { handleChange, handleSubmit } = useFormik({
    initialValues: { userName: '', userEmail: '', userPhone: '', userPassword: '' },
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <ScrollView style={signupFormStyles.formContainer}>
      <View>
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
          <TextInput onChangeText={handleChange('userPassword')} secureTextEntry placeholder="Senha" style={[signupFormStyles.input, { paddingRight: 20 }]} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text onPress={handleSubmit}>Teste</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupForm;