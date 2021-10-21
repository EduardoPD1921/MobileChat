import React, { useCallback } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay
} from 'react-native-reanimated';
import { TouchableWithoutFeedback, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { containerStyle } from './styles';

function NotificationsTab({ isTabOpen, setIsTabOpen }) {
  const translateY = useSharedValue(-300);
  const modalBackgroundOpacity = useSharedValue(0);
  const modalBackgroundZIndex = useSharedValue(-1);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isTabOpen) {
          closeNotificationTab();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isTabOpen, closeNotificationTab])
  );

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
        modalBackgroundOpacity.value = withDelay(200, withTiming(0, { duration: 100 }));
        modalBackgroundZIndex.value = withDelay(200, withTiming(-1, { duration: 200 }));
        runOnJS(setIsTabOpen)(false);
      } else {
        translateY.value = withTiming(0, { duration: 250 });
        runOnJS(setIsTabOpen)(true);
      }
    }
  });

  function openNotificationTab() {
    translateY.value = withTiming(0, { duration: 250 });
    modalBackgroundOpacity.value = withTiming(0.4, { duration: 100 });
    modalBackgroundZIndex.value = withTiming(0, { duration: 0 });
  };

  function closeNotificationTab() {
    translateY.value = withTiming(-300, { duration: 200 });
    modalBackgroundOpacity.value = withDelay(200, withTiming(0, { duration: 200 }));
    modalBackgroundZIndex.value = withDelay(200, withTiming(-1, { duration: 200 }));
    setIsTabOpen(false);
  };
        
  const verticalGestureStyle = useAnimatedStyle(() => {
    return {
      bottom: translateY.value
    }
  });

  const modalBackgroundAnimation = useAnimatedStyle(() => {
    return {
      opacity: modalBackgroundOpacity.value,
      zIndex: modalBackgroundZIndex.value
    }
  });
        
  return (
    <>
      <TouchableWithoutFeedback onPress={() => closeNotificationTab()}>
        <Animated.View style={[containerStyle.modalBackground, modalBackgroundAnimation]} />
      </TouchableWithoutFeedback>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[containerStyle.notificationTabContainer, verticalGestureStyle]} />
      </PanGestureHandler>
      {isTabOpen ? openNotificationTab() : null}
    </>
  );
};

export default NotificationsTab;