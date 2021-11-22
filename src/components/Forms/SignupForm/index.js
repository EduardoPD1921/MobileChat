import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';

import { useFormik } from 'formik';

import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { signupFormStyles } from './styles';

function SignupForm() {
  const [hidePassword, setHidePassword] = useState(true);

  const { handleChange, handleSubmit, resetForm, values } = useFormik({
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

  function cancelForm() {
    resetForm({ values: '' });
  };

  return (
    <ScrollView style={signupFormStyles.formContainer}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={signupFormStyles.inputContainer}>
          <FeatherIcon name="user" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput 
            value={values.userName} 
            onChangeText={handleChange('userName')} 
            placeholder="Nome" 
            style={signupFormStyles.input} 
          />
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 40 }]}>
          <FeatherIcon name="mail" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput 
            value={values.userEmail}
            onChangeText={handleChange('userEmail')} 
            placeholder="E-mail" 
            style={signupFormStyles.input} 
          />
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 40 }]}>
          <FeatherIcon name="smartphone" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput 
            value={values.userPhone}
            onChangeText={handleChange('userPhone')} 
            placeholder="Telefone" 
            style={signupFormStyles.input} 
          />
        </View>
        <View style={[signupFormStyles.inputContainer, { marginTop: 40 }]}>
          <FeatherIcon name="lock" color="#52B788" size={20} style={signupFormStyles.icon} />
          <TextInput 
            value={values.userPassword}
            onChangeText={handleChange('userPassword')} 
            secureTextEntry={hidePassword} 
            placeholder="Senha" 
            style={[signupFormStyles.input, { paddingRight: 35 }]} 
          />
          {getSecurePasswordIcon()}
        </View>
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
      </View>
    </ScrollView>
  );
};

export default SignupForm;