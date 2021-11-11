import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { componentStyles } from './styles';

import userDefaultImage from '../../../../assets/images/userDefaultImage.png';
import { iconStyle } from '../../HomeHeader/styles';

function ContactCard({ contactId, contactName, contactPhone, setSelectedContact, selectedContact }) {
  const iconScaleAnimation = useSharedValue(0);

  const AnimatedIcon = Animated.createAnimatedComponent(IonIcon);

  function selectAnimationOn() {
    iconScaleAnimation.value = withTiming(1, { duration: 100 });
  };

  function selectAnimationOff() {
    iconScaleAnimation.value = withTiming(0, { duration: 200 });
  };

  const iconScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScaleAnimation.value }]
    }
  });

  return (
    <Pressable onLongPress={() => setSelectedContact(contactId)} android_ripple={{ color: '#b4b4b4' }}>
      <View style={[componentStyles.cardContainer, { backgroundColor: contactId === selectedContact ? '#eaeaea' : null }]}>
        <View style={componentStyles.imageContainer}>
          <Image style={componentStyles.image} source={userDefaultImage} />
          <AnimatedIcon
            style={[iconStyle.checkMark, iconScaleStyle]}
            name="checkmark-circle"
            color="#52B788"
            size={20} 
          />
        </View>
        <View style={componentStyles.contactInfoContainer}>
          <Text style={componentStyles.contactNameText}>{contactName}</Text>
          <Text style={componentStyles.contactPhoneNumber}>{contactPhone}</Text>
        </View>
      </View>
      {contactId === selectedContact ? selectAnimationOn() : selectAnimationOff()}
    </Pressable>
  );
};

export default ContactCard;