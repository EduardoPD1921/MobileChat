import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { containerStyle } from './styles';

function NotificationsTab({ isTabOpen, setIsTabOpen }) {
  const translateY = useSharedValue(-150);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      console.log(event.translationY);
      translateY.value = -event.translationY;
    },
    onEnd: (event) => {
      if (translateY.value < -74) {
        translateY.value = withTiming(-150, { duration: 100 });
        runOnJS(setIsTabOpen)(false);
      } else {
        translateY.value = withTiming(0, { duration: 100 });
        runOnJS(setIsTabOpen)(true);
      }
    }
  });

  function openNotificationTab() {
    translateY.value = withTiming(0, { duration: 100 });
  };
        
  const rStyle = useAnimatedStyle(() => {
    return {
      bottom: translateY.value
    }
  });
        
  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[containerStyle.notificationTabContainer, rStyle]} />
      </PanGestureHandler>
      {isTabOpen ? openNotificationTab() : null}
    </View>
  );
};

export default NotificationsTab;