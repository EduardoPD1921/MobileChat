import React, { useState } from 'react';
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { containerStyle } from './styles';

function OptionsButton() {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  function handleAnimation() {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"]
  });

  return (
    <Animated.View style={[containerStyle.mainIconContainer, { transform: [{ rotate: interpolateRotating }] }]}>
      <AntDesignIcon onPress={handleAnimation} name="plus" color="white" size={25} />
    </Animated.View>
  );
};

export default OptionsButton;