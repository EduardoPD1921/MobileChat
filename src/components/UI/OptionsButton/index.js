import React, { useState } from 'react';
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { containerStyle } from './styles';

function OptionsButton() {
  const [rotateAnimation] = useState(new Animated.Value(0));
  const [contactIconAnimation] = useState(new Animated.Value(0));
  const [groupIconXAnimation] = useState(new Animated.Value(0));
  const [groupIconYAnimation] = useState(new Animated.Value(0));
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  function openOptions() {
    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(contactIconAnimation, {
        toValue: -50,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(groupIconXAnimation, {
        toValue: -70,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(groupIconYAnimation, {
        toValue: -5,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  function closeOptions() {
    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(contactIconAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(groupIconXAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(groupIconYAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  function toggleOptions() {
    setIsOpenOptions(prevState => !prevState);
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"]
  });

  return (
    <>
      <Animated.View style={[containerStyle.contactIconContainer, { transform: [{ translateX: contactIconAnimation }, { translateY: contactIconAnimation }] }]}>
        <AntDesignIcon name="adduser" color="white" size={20} />
      </Animated.View>
      <Animated.View style={[containerStyle.contactIconContainer, { backgroundColor: '#5F66CD' }, { transform: [{ translateY: groupIconYAnimation }, { translateX: groupIconXAnimation }] }]}>
        <MaterialIcon name="group-add" color="white" size={20} />
      </Animated.View>
      <Animated.View style={[containerStyle.mainIconContainer, { transform: [{ rotate: interpolateRotating }] }]}>
        <AntDesignIcon onPress={toggleOptions} name="plus" color="white" size={25} />
        {isOpenOptions ? openOptions() : closeOptions()}
      </Animated.View>
    </>
  );
};

export default OptionsButton;