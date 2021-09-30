import React, { useRef } from 'react';
import { View, Animated, Text, Button } from 'react-native';

import { containerStyle } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignupForm from '../../components/Forms/SignupForm';

function Register() {
  const verticalAnim = useRef(new Animated.Value(0)).current;

  function verticalUp() {
    Animated.timing(verticalAnim, {
      toValue: -50,
      duration: 300,
      useNativeDriver: true
    }).start();

    setTimeout(() => {
      verticalDown();
    }, 4000);
  };

  function verticalDown() {
    Animated.timing(verticalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={containerStyle.mainContainer}>
      {/* <SignupForm /> */}
      <Button title="teste" onPress={verticalUp} />
      <Animated.View style={{ position: 'absolute', width: '100%', transform: [{ translateY: verticalAnim }], bottom: -40, alignItems: 'center' }}>
        <View style={{ backgroundColor: '#3BBD9F', width: '90%', height: 40, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="verified"
            color="#B7E4C7"
            size={25}
            style={{marginLeft: 20, marginRight: 10 }}
          />
          <Text style={{ color: '#B7E4C7', fontFamily: 'Poppins-Regular' }}>Conta criada com sucesso!</Text>
          <Icon
            onPress={() => verticalDown()}
            name="close"
            size={15}
            color="#B7E4C7" 
            style={{ marginLeft: '20%' }}
          />
        </View>
      </Animated.View>
      {/* <Animated.View style={{ position: 'absolute', backgroundColor: '#2B354F', width: '100%', height: 40, transform: [{ translateY: verticalAnim }], bottom: -40, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
        <Icon
          name="verified" 
        />
        <Text>Teste</Text>
      </Animated.View> */}
    </View>
  );
};

export default Register;