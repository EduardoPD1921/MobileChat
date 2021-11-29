import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import { deleteAlertStyles } from './styles';

function DeleteAlert({ isAlertOpen }) {
  const backdropOpacity = useSharedValue(0);
  const alertOpacity = useSharedValue(0);
  const verticalPosition = useSharedValue(30);

  function openAlert() {
    backdropOpacity.value = withTiming(0.3, { duration: 300 });
    alertOpacity.value = withTiming(1, { duration: 200 });
    verticalPosition.value = withTiming(0, { duration: 250 });
  };

  function closeAlert() {
    // scaleAnimation.value = withTiming(0, { duration: 200 });
  };

  const alertContainerAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: alertOpacity.value,
      transform: [{ translateY: verticalPosition.value }]
    }
  });

  const backdropAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value
    }
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={() => console.log('pressed')}>
        <Animated.View style={[deleteAlertStyles.backdropContainer, backdropAnimationStyle, { zIndex: isAlertOpen ? 1 : 0 }]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[deleteAlertStyles.alertContainer, alertContainerAnimationStyle, { zIndex: isAlertOpen ? 1: 0 }]}>
        <Text onPress={() => console.log('test')} style={{ color: 'white' }}>Teste</Text>
      </Animated.View>
      {isAlertOpen ? openAlert() : closeAlert()}
    </>
  );
};

export default DeleteAlert;