import React, { useState, useEffect } from 'react';
import { Animated, TextInput, Keyboard, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '../../../../api';

import { useFormik } from 'formik';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { containerStyle, inputStyle } from './styles';

function AnimatedHeader({ handleSetSearchedUsers, isLoadingTrue, isLoadingFalse }) {
  const [headerOpeningAnimation] = useState(new Animated.Value(0));
  const [iconOpacity] = useState(new Animated.Value(0));
  const [searchInputWidth] = useState(new Animated.Value(1));

  const { handleChange, handleSubmit } = useFormik({
    initialValues: { search: '' },
    onSubmit: values => {
      isLoadingTrue();

      api.get(`/user/searchUsers/${values.search}`)
        .then(resp => {
          handleSetSearchedUsers(resp.data);
          isLoadingFalse();
        })
        .catch(error => {
          console.log(error.response.data);
          isLoadingFalse();
        });
    }
  });

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
      <Animated.View style={{ width: interpolateWidth }}>
        <TextInput 
          placeholder="Pesquisar" 
          placeholderTextColor="white" 
          style={inputStyle.search}
          onChangeText={handleChange('search')}
          onSubmitEditing={handleSubmit}
        />
      </Animated.View>
      <AnimatedPressable
        android_ripple={{ color: '#D4EDE1', borderless: true, radius: 17 }}
        style={[containerStyle.searchContainer, { opacity: iconOpacity }]}
        onPress={handleSubmit}
      >
        <IonIcon name="search" color="white" size={20} />
      </AnimatedPressable>
    </Animated.View>
  );
};

export default AnimatedHeader;