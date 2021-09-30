import React from 'react';
import { Text } from 'react-native';

import { textStyle } from './styles';

function ErrorText({ children }) {
  return <Text style={textStyle.errorText}>{children}</Text>
};

export default ErrorText;