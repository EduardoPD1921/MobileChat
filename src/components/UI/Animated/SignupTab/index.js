import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import SignupForm from '../../../Forms/SignupForm';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { signupTabStyles } from './styles';

function SignupTab({ isTabOpen, toggleSignupTabOpen }) {
  const verticalPositionAnimation = useSharedValue('-85%');
  const opacityAnimation = useSharedValue(0);
  const zIndexAnimation = useSharedValue(-1);

  function openTab() {
    verticalPositionAnimation.value = withTiming('0%', { duration: 300 });
    opacityAnimation.value = withTiming(0.4, { duration: 300 });
    zIndexAnimation.value = withTiming(5, { duration: 300 });
  };

  function closeTab() {
    verticalPositionAnimation.value = withTiming('-85%', { duration: 100 });
    opacityAnimation.value = withTiming(0, { duration: 300 });
    zIndexAnimation.value = withTiming(-1, { duration: 100 });
  };

  const verticalPositionStyle = useAnimatedStyle(() => {
    return {
      bottom: verticalPositionAnimation.value
    }
  });

  const modalBackgroundAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation.value,
      zIndex: zIndexAnimation.value
    }
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleSignupTabOpen}>
        <Animated.View style={[signupTabStyles.modalBackground, modalBackgroundAnimation]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[signupTabStyles.signupTabContainer, verticalPositionStyle]}>
        <View style={signupTabStyles.closeButtonContainer}>
          <IonIcon onPress={toggleSignupTabOpen} color="black" name="close-outline" size={25} />
        </View>
        <View style={signupTabStyles.tabTitleContainer}>
          <Text style={signupTabStyles.tabTitle}>Cadastre-se</Text>
          <Text style={signupTabStyles.tabDesc}>Insira suas informações para continuar</Text>
        </View>
        <SignupForm toggleSignupTabOpen={toggleSignupTabOpen} />
      </Animated.View>
      {isTabOpen ? openTab() : closeTab()}
    </>
  );
};

export default SignupTab;