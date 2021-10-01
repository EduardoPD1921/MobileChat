import React, { useRef } from 'react';
import { View, Text, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { containerStyle, iconStyle, textStyle } from './styles';

function Snackbar({ openSnack, setSnackbarStatus }) {
  const verticalAnim = useRef(new Animated.Value(0)).current;

  function verticalDown() {
    Animated.timing(verticalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  function verticalUp() {
    Animated.timing(verticalAnim, {
      toValue: -50,
      duration: 300,
      useNativeDriver: true
    }).start();

    setTimeout(() => {
      verticalDown();
      setSnackbarStatus(false);
    }, 4000);
  };

  return (
    <Animated.View
      style={
        [
          containerStyle.animatedContainer,
          { transform: [{ translateY: verticalAnim }] }
        ]
      }
    >
      {openSnack ? verticalUp() : null}
      <View style={containerStyle.snackbarContainer}>
        <Icon
          name="verified"
          size={25}
          style={iconStyle.verifiedIcon}
        />
        <Text style={textStyle.snackbarText}>Conta criada com sucesso!</Text>
        <Icon
          name="close"
          size={15}
          style={iconStyle.closeIcon}
          onPress={() => verticalDown()}
        />
      </View>
    </Animated.View>
  );
};

export default Snackbar;