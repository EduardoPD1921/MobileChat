import React from 'react';
import { View, Text } from 'react-native';

import { loginHeaderStyles } from './styles';

function LoginHeader() {
  return (
    <View style={loginHeaderStyles.headerContainer}>
      <Text style={loginHeaderStyles.headerTitle}>Entrar</Text>
    </View>
  );
};

export default LoginHeader;