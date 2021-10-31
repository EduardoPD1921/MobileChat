import React, { useCallback, useContext } from 'react';
import { NotificationContext } from '../../../../contexts/NotificationContext';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay
} from 'react-native-reanimated';
import { TouchableWithoutFeedback, BackHandler, View, StatusBar, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import NotificationCard from '../../NotificationCard';

import { containerStyle, textStyle } from './styles';

function NotificationsTab({ isTabOpen, setIsTabOpen }) {
  const { userNotifications } = useContext(NotificationContext);

  const translateY = useSharedValue(-400);
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
      if (translateY.value < -200) {
        translateY.value = withTiming(-400, { duration: 200 });
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
    translateY.value = withTiming(-400, { duration: 200 });
    modalBackgroundOpacity.value = withDelay(200, withTiming(0, { duration: 200 }));
    modalBackgroundZIndex.value = withDelay(200, withTiming(-1, { duration: 200 }));
    setIsTabOpen(false);
  };

  function statusBarColor() {
    if (isTabOpen) {
      return <StatusBar backgroundColor="#326e52" />
    }
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
      {statusBarColor()}
      <TouchableWithoutFeedback onPress={() => closeNotificationTab()}>
        <Animated.View style={[containerStyle.modalBackground, modalBackgroundAnimation]} />
      </TouchableWithoutFeedback>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[containerStyle.notificationTabContainer, verticalGestureStyle]} >
          <View style={containerStyle.gestureIndicatorContainer}>
            <View style={containerStyle.gestureIndicator} />
          </View>
          <View>
            <Text style={textStyle.notificationTitle}>Notificações</Text>
          </View>

          <FlatList
            data={userNotifications}
            renderItem={function({ item }) {
              // const date1 = new Date();
              // const date2 = new Date(item.date);

              // const t1 = date1.getTime();
              // const t2 = date2.getTime();

              // console.log(parseInt((t1 - t2) / 60000));
              return (
                <NotificationCard
                  senderName={item.senderName}
                  date={item.date} 
                />
              );
            }}
          />
        </Animated.View>
      </PanGestureHandler>
      {isTabOpen ? openNotificationTab() : null}
    </>
  );
};

export default NotificationsTab;