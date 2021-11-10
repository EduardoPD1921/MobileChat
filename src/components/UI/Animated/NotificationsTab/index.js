import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay
} from 'react-native-reanimated';
import { TouchableWithoutFeedback, BackHandler, View, StatusBar, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import api from '../../../../api';
import socket from '../../../../socket';

import NotificationCard from '../NotificationCard';
import NotificationAdvice from '../../NotificationAdvice';

import { containerStyle, textStyle } from './styles';

function NotificationsTab({ isTabOpen, closeTab, openTab }) {
  const { authUserInfo } = useContext(AuthContext);

  const [localNotifications, setLocalNotifications] = useState([]);

  const translateY = useSharedValue(-400);
  const modalBackgroundOpacity = useSharedValue(0);
  const modalBackgroundZIndex = useSharedValue(-1);

  useEffect(() => {
    function getUpdatedNotificationList(userInfoUpdated) {
      setLocalNotifications(userInfoUpdated.notifications);
    };

    socket.on('getUpdatedNotificationList', getUpdatedNotificationList);

    return () => {
      socket.off('getUpdatedNotificationList', getUpdatedNotificationList);
    };
  });

  useEffect(() => {
    api.get(`/user/getUserNotifications/${authUserInfo.id}`)
      .then(resp => setLocalNotifications(resp.data.notifications))
      .catch(error => console.log(error.response.data));
  }, [isTabOpen]);

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

  const handleSetLocalNotifications = useCallback((data) => {
    setLocalNotifications(data);
  }, []);

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
        runOnJS(closeTab)();
      } else {
        translateY.value = withTiming(0, { duration: 250 });
        runOnJS(openTab)();
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
    closeTab();
  };

  function renderNotifications() {
    if (localNotifications.length > 0) {
      return (
        <ScrollView>
          {localNotifications.map(notification => {
            return (
              <View style={{ marginBottom: 15 }} key={notification.senderId}>
                <NotificationCard
                  key={notification.senderId}
                  senderName={notification.senderName}
                  senderId={notification.senderId}
                  senderEmail={notification.senderEmail}
                  senderPhone={notification.senderPhone} 
                  date={notification.date}
                  handleSetLocalNotifications={handleSetLocalNotifications}
                />
              </View>
            );
          })}
        </ScrollView>
      );
    }

    return <NotificationAdvice />
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
      <PanGestureHandler activeOffsetY={localNotifications.length > 0 ? [-20, 20] : []} onGestureEvent={panGestureEvent}>
        <Animated.View style={[containerStyle.notificationTabContainer, verticalGestureStyle]} >
          <View style={containerStyle.gestureIndicatorContainer}>
            <View style={containerStyle.gestureIndicator} />
          </View>
          <View>
            <Text style={textStyle.notificationTitle}>Notificações</Text>
          </View>
          {renderNotifications()}
        </Animated.View>
      </PanGestureHandler>
      {isTabOpen ? openNotificationTab() : null}
    </>
  );
};

export default NotificationsTab;