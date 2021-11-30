import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { containerStyle, textStyle, iconStyle } from './styles';

function ContactsHeader({ navigation, selectedContact, clearSelectedContact, toggleAlertOpen }) {
  const menuOpacityAnimation = useSharedValue(1);
  const closeOpacityAnimation = useSharedValue(0);
  const closeZindexAnimation = useSharedValue(-10);
  const headerTitleAnimation = useSharedValue(0);
  const iconScaleAnimation = useSharedValue(0);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  function selectModeOn() {
    menuOpacityAnimation.value = withTiming(0, { duration: 200 });
    closeOpacityAnimation.value = withTiming(1, { duration: 200 });
    closeZindexAnimation.value = withTiming(1, { duration: 200 });
    headerTitleAnimation.value = withTiming(10, { duration: 150 });
    iconScaleAnimation.value = withTiming(1, { duration: 250 });
  };

  function selectModeOff() {
    menuOpacityAnimation.value = withTiming(1, { duration: 200 });
    closeOpacityAnimation.value = withTiming(0, { duration: 200 });
    closeZindexAnimation.value = withTiming(-10, { duration: 200 });
    headerTitleAnimation.value = withTiming(0, { duration: 150 });
    iconScaleAnimation.value = withTiming(0);
  };

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: menuOpacityAnimation.value
    }
  });

  const closeStyle = useAnimatedStyle(() => {
    return {
      opacity: closeOpacityAnimation.value,
      zIndex: closeZindexAnimation.value,
      transform: [{ scaleY: iconScaleAnimation.value }]
    }
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: menuOpacityAnimation.value,
      transform: [{ translateY: headerTitleAnimation.value }]
    }
  });

  return (
    <View style={containerStyle.headerContainer}>
      <View style={containerStyle.titleContainer}>
        <AnimatedPressable 
          onPress={() => navigation.openDrawer()}
          style={[iconStyle.menu, opacityStyle]}
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <IonIcon
            color="white"
            name="menu-sharp"
            size={25} 
          />
        </AnimatedPressable>
        <AnimatedPressable
          onPress={clearSelectedContact}
          style={[iconStyle.menu, closeStyle]}
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <IonIcon
            color="white"
            name="close-outline"
            size={25} 
          />
        </AnimatedPressable>
        <Animated.Text style={[textStyle.headerTitle, headerStyle]}>Contatos</Animated.Text>
      </View>
      <View style={containerStyle.otherOptionsContainer}>
        <AnimatedPressable
          onPress={() => console.log('test1')}
          style={[iconStyle.search, opacityStyle]}
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <IonIcon
            name="search"
            color="white"
            size={20} 
          />
        </AnimatedPressable>
        <AnimatedPressable
          style={[iconStyle.search, closeStyle]}
          // onPress={deleteContact}
          onPress={toggleAlertOpen}
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <IonIcon
            name="trash-outline"
            color="white"
            size={20} 
          />
        </AnimatedPressable>
      </View>
      {selectedContact ? selectModeOn() : selectModeOff()}
    </View>
  );
};

export default ContactsHeader;