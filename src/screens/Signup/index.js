import React, { useRef } from 'react';
import { View, Animated, Text, Button } from 'react-native';

import { containerStyle } from './styles';

import SignupForm from '../../components/Forms/SignupForm';

function Register() {
  // const window = Dimensions.get('window');
  const verticalAnim = useRef(new Animated.Value(0)).current;

  function verticalUp() {
    Animated.timing(verticalAnim, {
      toValue: -20,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={containerStyle.mainContainer}>
      <SignupForm />
      {/* <Button title="teste" onPress={verticalUp} />
      <Animated.View style={{ position: 'absolute', backgroundColor: 'blue', width: '100%', height: 20, transform: [{ translateY: verticalAnim }], bottom: -20 }}>
        <Text>Teste</Text>
      </Animated.View> */}
    </View>
  );
};

export default Register;