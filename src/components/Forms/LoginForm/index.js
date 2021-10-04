import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { AuthContext } from '../../../contexts/AuthContext';

import { useFormik } from 'formik';
import LoginSchema from '../../../validations/LoginValidation';

import Icon from 'react-native-vector-icons/Feather';

import { containerStyle, inputStyle, imageStyle, textStyle } from './styles';

function LoginForm({ navigation }) {
  const [rememberMe, setRememberMe] = useState(false);

  const { handleAuth } = useContext(AuthContext);

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => console.log(values),
    validationSchema: LoginSchema
  });

  return (
    <>
      <View style={containerStyle.formContainer}>
        <View style={containerStyle.inputContainer}>
          <Icon name="user" size={20} style={imageStyle.inputIcon} />
          <TextInput
            placeholderTextColor="#9f9f9f"
            style={inputStyle.defaultLoginInput}
            placeholder="E-mail"
            onChangeText={handleChange('email')} 
          />
        </View>
        <View style={containerStyle.inputContainer}>
          <Icon name="lock" size={20} style={imageStyle.inputIcon} />
          <TextInput
            placeholderTextColor="#9f9f9f"
            style={inputStyle.defaultLoginInput}
            secureTextEntry
            placeholder="Senha"
            onChangeText={handleChange('password')} 
          />
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
        <TouchableOpacity>
          <Text style={[textStyle.rememberMeText, { color: '#95D5B2' }]}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={containerStyle.submitContainer}>
          <TouchableHighlight underlayColor="#40916C" onPress={handleAuth} style={inputStyle.submitButton}>
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