import React, { useState } from 'react';
import { 
  View,
  Text,
  Image,
  TextInput,
  StatusBar, KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/Feather';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { containerStyle, imageStyle, textStyle, inputStyle } from './styles';

function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido.')
      .required('Insira seu e-mail.'),
    password: Yup.string()
      .min(8)
      .required('Insira sua senha.')
  });

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => console.log(values),
    validationSchema: LoginSchema
  });

  return (
    <KeyboardAvoidingView behavior="height" style={containerStyle.mainContainer}>
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
        <View style={containerStyle.inputContainer}>
          <Icon name="user" size={20} style={imageStyle.inputIcon} />
          <TextInput
            style={inputStyle.defaultLoginInput}
            placeholder="E-mail"
            onChangeText={handleChange('email')} 
          />
        </View>
        <View style={containerStyle.inputContainer}>
          <Icon name="lock" size={20} style={imageStyle.inputIcon} />
          <TextInput
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
    </KeyboardAvoidingView>
  );
};

export default Login;