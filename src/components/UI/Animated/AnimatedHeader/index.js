import React, { useState, useEffect } from 'react';
import { Animated, TextInput, Keyboard, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { containerStyle, inputStyle } from './styles';

function AnimatedHeader() {
  const [headerOpeningAnimation] = useState(new Animated.Value(0));
  const [iconOpacity] = useState(new Animated.Value(0));
  const [searchInputWidth] = useState(new Animated.Value(1));

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      openHeader();
    }

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      onKeyboardOpening();
    });

    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      onKeyboardClose();
    });
    
    return () => {
      closeHeader();
      keyboardDidShowListener.remove();
      keyboardDidHide.remove();
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

  function onKeyboardOpening() {
    Animated.parallel([
      Animated.timing(searchInputWidth, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 200,
        delay: 200,
        useNativeDriver: true
      }),
    ]).start();
  };

  function onKeyboardClose() {
    Animated.parallel([
      Animated.timing(searchInputWidth, {
        toValue: 1,
        duration: 200,
        delay: 150,
        useNativeDriver: false
      }),
      Animated.timing(iconOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  const interpolateWidth = searchInputWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['75%', '95%']
  });

  return (
    <Animated.View style={[containerStyle.headerContainer, { transform: [{ translateY: headerOpeningAnimation }] }]}>
      <AnimatedPressable 
        android_ripple={{ color: '#D4EDE1', borderless: true, radius: 15 }} 
        style={[containerStyle.arrowBackContainer, { opacity: iconOpacity }]}
        onPress={Keyboard.dismiss}
      >
        <MaterialIcon name="arrow-back" color="white" size={20} />
      </AnimatedPressable>
      <AnimatedTextInput 
        placeholder="Pesquisar" 
        placeholderTextColor="white" 
        style={[inputStyle.search, { width: interpolateWidth }]} 
      />
      <AnimatedPressable
        android_ripple={{ color: '#D4EDE1', borderless: true, radius: 17 }}
        style={[containerStyle.searchContainer, { opacity: iconOpacity }]}
      >
        <IonIcon name="search" color="white" size={20} />
      </AnimatedPressable>
    </Animated.View>
  );
};

export default AnimatedHeader;