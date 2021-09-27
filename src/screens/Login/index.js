import React from 'react';
import { View, Text, Image, TextInput, Button, StatusBar } from 'react-native';

import { useFormik } from 'formik';

import { containerStyle, imageStyle, textStyle } from './styles';

function Login() {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => alert(`Email: ${values.email}, Password: ${values.password}`)
  });

  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar
        backgroundColor="#52B788"
      />
      <Image
        source={require('../../assets/images/wave.png')}
        style={imageStyle.background} 
      />
      <View style={containerStyle.titleContainer}>
        <Image
          source={require('../../assets/images/loginIcon.png')} 
        />
        <Text style={textStyle.title}>MobileChat</Text>
      </View>
      <View style={containerStyle.formContainer}>
        <TextInput
          placeholder="E-mail"
          onChangeText={handleChange('email')} 
        />
        <TextInput
          secureTextEntry
          placeholder="Senha"
          onChangeText={handleChange('password')} 
        />
        <Button title="Enviar" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Login;