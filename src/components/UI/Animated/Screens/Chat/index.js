import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { chatStyles } from './styles';

function Chat({ isChatOpen, toggleChat }) {
  const translateXAnimation = useSharedValue(40);
  const opacityAnimation = useSharedValue(0);
  const zIndexAnimation = useSharedValue(-1);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      // console.log(event.translationX);
      if (event.translationX > 0) {
        translateXAnimation.value = event.translationX;
      }
    },
    onEnd: (event) => {
      if (event.translationX >= 100) {
        translateXAnimation.value = withTiming(40, { duration: 100 });
      } else {
        translateXAnimation.value = withTiming(0, { duration: 50 });
      }
    }
  });

  function openChat() {
    translateXAnimation.value = withTiming(0, { duration: 100 });
    opacityAnimation.value = withTiming(1, { duration: 200 });
    zIndexAnimation.value = 15;
  };

  function closeChat() {
    translateXAnimation.value = withTiming(40, { duration: 100 });
    opacityAnimation.value = withTiming(0, { duration: 100 });
    zIndexAnimation.value = withDelay(100, withTiming(-1, { duration: 0 }));
  };

  const chatScreenAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXAnimation.value }],
      opacity: opacityAnimation.value,
      zIndex: zIndexAnimation.value
    }
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[chatStyles.mainContainer, chatScreenAnimationStyle]}>
          <Text onPress={toggleChat} style={{ color: 'white' }}>Teste</Text>
        </Animated.View>
      </PanGestureHandler>
      {isChatOpen ? openChat() : closeChat()}
    </>
  );
};

export default Chat;