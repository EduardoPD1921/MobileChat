import React from 'react';
import { Text } from 'react-native';

import { signupFormStyles } from './styles';

function ErrorText({ children }) {
  return <Text style={signupFormStyles.errorText}>{children}</Text>
};

export default ErrorText;