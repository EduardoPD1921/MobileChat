import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import { signupTabStyles } from './styles';

function SignupTab() {
  const verticalPositionAnimation = useSharedValue('-95%');

  const [isTabOpen, setIsTabOpen] = useState(false);

  function openTab() {
    verticalPositionAnimation.value = withTiming('0%', { duration: 300 });
  };

  function closeTab() {
    verticalPositionAnimation.value = withTiming('-95%', { duration: 100 });
  };

  function toggleIsTabOpen() {
    setIsTabOpen(prevState => !prevState);
  };

  const verticalPositionStyle = useAnimatedStyle(() => {
    return {
      bottom: verticalPositionAnimation.value
    }
  });

  return (
    <>
      <View>
        <Text onPress={toggleIsTabOpen}>Salve</Text>
      </View>
      <Animated.View style={[signupTabStyles.signupTabContainer, verticalPositionStyle]}>
        <Text>Teste</Text>
      </Animated.View>
      {isTabOpen ? openTab() : closeTab()}
    </>
  );
};

export default SignupTab;