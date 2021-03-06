import React, { useState } from 'react';
import { Animated, Pressable } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import { containerStyle } from './styles';

function OptionsButton({ navigation, isOpenOptions, toggleOptions }) {
  const [rotateAnimation] = useState(new Animated.Value(0));
  const [contactIconAnimation] = useState(new Animated.Value(0));
  const [groupIconXAnimation] = useState(new Animated.Value(0));
  const [groupIconYAnimation] = useState(new Animated.Value(0));

  const AnimatedIcon = Animated.createAnimatedComponent(AntDesignIcon);

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

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"]
  });

  return (
    <>
      <Animated.View
        style={[containerStyle.contactIconContainer,
          { transform: [{ translateX: contactIconAnimation }, { translateY: contactIconAnimation }] }
        ]}
      >
        <Pressable 
          style={containerStyle.pressableContainer}
          onPress={() => navigation.navigate('AddContact')}
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <FontAwesomeIcon name="user-plus" color="white" size={13} />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[containerStyle.contactIconContainer,
          { backgroundColor: '#5F66CD' },
          { transform: [{ translateY: groupIconYAnimation }, { translateX: groupIconXAnimation }] }
        ]}
      >
        <Pressable 
          style={containerStyle.pressableContainer}
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <MaterialIcon name="group-add" color="white" size={20} />
        </Pressable>
      </Animated.View>
      <Pressable
        onPress={toggleOptions}
        android_ripple={{ color: '#D4EDE1', radius: 30, borderless: true }}
        style={containerStyle.mainIconContainer}
      >
        <AnimatedIcon 
          name="plus" 
          color="white" 
          size={25}
          style={{ transform: [{ rotate: interpolateRotating }] }} 
        />
        {isOpenOptions ? openOptions() : closeOptions()}
      </Pressable>
    </>
  );
};

export default OptionsButton;