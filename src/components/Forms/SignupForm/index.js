import React from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';

import { signupFormStyles } from './styles';

function SignupForm() {
  return (
    <ScrollView style={signupFormStyles.formContainer}>
      <View style={{ marginTop: 20 }}>
        {/* <Text style={{ color : '#b3b3b3' }}>Nome</Text> */}
        <TextInput placeholder="Nome" style={{ borderBottomWidth: 1, width: '80%', borderColor: '#52B788' }} />
      </View>
    </ScrollView>
  );
};

export default SignupForm;