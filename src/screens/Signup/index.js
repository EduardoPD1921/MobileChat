import React from 'react';
import { View } from 'react-native';

import { containerStyle } from './styles';

import SignupForm from '../../components/Forms/SignupForm';

function Register() {
  return (
    <View style={containerStyle.mainContainer}>
      <SignupForm />
    </View>
  );
};

export default Register;