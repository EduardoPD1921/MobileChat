import React, { useState, useEffect } from 'react';
import { View, Animated, Button } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

function NotificationsTab({ isTabOpen }) {
  const [test] = useState(new Animated.Value(0));

  function openNotificationsTab() {
    Animated.timing(test, {
      toValue: -150,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View style={[{
        position: 'absolute',
        width: '100%',
        height: 150,
        backgroundColor: 'blue',
        bottom: -150
      }, { transform: [{ translateY: test }] }]}>
        {/* <PanGestureHandler>
          
        </PanGestureHandler> */}
      </Animated.View>
      {isTabOpen ? openNotificationsTab() : null}
    </View>
  );
};

export default NotificationsTab;