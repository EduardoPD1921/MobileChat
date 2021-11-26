import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import { deleteAlertStyles } from './styles';

function DeleteAlert({ isAlertOpen }) {
  const scaleAnimation = useSharedValue(0);
  const opacityAnimation = useSharedValue(0);
  const zIndexAnimation = useSharedValue(-1);

  function openAlert() {
    scaleAnimation.value = withTiming(1, { duration: 200 });
    opacityAnimation.value = withTiming(0.3, { duration: 200 });
    zIndexAnimation.value = withTiming(1, { duration: 200 });
  };

  function closeAlert() {
    scaleAnimation.value = withTiming(0, { duration: 200 });
  };

  const alertContainerAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnimation.value }],
      zIndex: zIndexAnimation.value + 1
    }
  });

  const backdropAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation.value,
      zIndex: zIndexAnimation.value
    }
  });

  return (
    <>
      <Animated.View style={[deleteAlertStyles.backdropContainer, backdropAnimationStyle]} />
      <View style={[deleteAlertStyles.mainContainer, { zIndex: isAlertOpen ? 1 : 0 }]}>
        <Animated.View style={[deleteAlertStyles.alertContainer, alertContainerAnimationStyle]}>
          <Text onPress={() => console.log('test')} style={{ color: 'white' }}>Teste</Text>
        </Animated.View>
      </View>
      {isAlertOpen ? openAlert() : closeAlert()}
    </>
  );
};

export default DeleteAlert;