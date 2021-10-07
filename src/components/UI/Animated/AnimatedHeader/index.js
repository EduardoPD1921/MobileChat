import React, { useState, useEffect } from 'react';
import { Text, Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { containerStyle } from './styles';

function AnimatedHeader() {
  const [headerOpeningAnimation] = useState(new Animated.Value(0));

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      openHeader();
    }
    
    return () => {
      closeHeader();
    };
  });

  function openHeader() {
    Animated.timing(headerOpeningAnimation, {
      toValue: 60,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  function closeHeader() {
    Animated.timing(headerOpeningAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View style={[containerStyle.headerContainer, { transform: [{ translateY: headerOpeningAnimation }] }]}>
      <Text onPress={openHeader}>Teste</Text>
    </Animated.View>
  );
};

export default AnimatedHeader;