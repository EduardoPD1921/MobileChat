import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import { containerStyle, textStyle } from './styles';

function SplashScreen() {
  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar
        backgroundColor="#52B788" 
      />
      <Text style={textStyle.title}>MobileChat</Text>
    </View>
  );
};

export default SplashScreen;