import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { containerStyle } from './styles';

function NotificationsTab({ isTabOpen, setIsTabOpen }) {
  const translateY = useSharedValue(-300);
  const backgroundOpacity = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      if (event.translationY > 0) {
        translateY.value = -event.translationY;
      }
    },
    onEnd: (event) => {
      if (translateY.value < -150) {
        translateY.value = withTiming(-300, { duration: 200 });
        backgroundOpacity.value = withDelay(200, withTiming(0, { duration: 100 }));
        runOnJS(setIsTabOpen)(false);
      } else {
        translateY.value = withTiming(0, { duration: 100 });
        runOnJS(setIsTabOpen)(true);
      }
    }
  });

  function openNotificationTab() {
    translateY.value = withTiming(0, { duration: 100 });
    backgroundOpacity.value = withTiming(0.3, { duration: 100 });
  };
        
  const rStyle = useAnimatedStyle(() => {
    return {
      bottom: translateY.value
    }
  });

  const blackenedBackground = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value
    }
  });
        
  return (
    <>
      <Animated.View style={[containerStyle.modalBackground, blackenedBackground]} />
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[containerStyle.notificationTabContainer, rStyle]} />
      </PanGestureHandler>
      {isTabOpen ? openNotificationTab() : null}
    </>
  );
};

export default NotificationsTab;