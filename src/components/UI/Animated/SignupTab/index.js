import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { signupTabStyles } from './styles';

function SignupTab({ isTabOpen, toggleSignupTabOpen }) {
  const verticalPositionAnimation = useSharedValue('-85%');

  function openTab() {
    verticalPositionAnimation.value = withTiming('0%', { duration: 300 });
  };

  function closeTab() {
    verticalPositionAnimation.value = withTiming('-85%', { duration: 100 });
  };

  const verticalPositionStyle = useAnimatedStyle(() => {
    return {
      bottom: verticalPositionAnimation.value
    }
  });

  return (
    <>
      <TouchableWithoutFeedback>
        <View style={signupTabStyles.modalBackground} />
      </TouchableWithoutFeedback>
      <Animated.View style={[signupTabStyles.signupTabContainer, verticalPositionStyle]}>
        <IonIcon onPress={toggleSignupTabOpen} color="white" name="close-outline" size={25} />
      </Animated.View>
      {isTabOpen ? openTab() : closeTab()}
    </>
  );
};

export default SignupTab;