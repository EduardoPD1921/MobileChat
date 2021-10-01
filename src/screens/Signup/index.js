import React from 'react';
import { View } from 'react-native';

import { containerStyle } from './styles';

import SignupForm from '../../components/Forms/SignupForm';

function Signup({ navigation }) {
  return (
    <View style={containerStyle.mainContainer}>
      <SignupForm
        navigation={navigation} 
      />
    </View>
  );
};

export default Signup;