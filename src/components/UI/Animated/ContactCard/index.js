import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { View, Text, Image, Pressable } from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

import api from '../../../../api';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { componentStyles } from './styles';

import userDefaultImage from '../../../../assets/images/userDefaultImage.png';
import { iconStyle } from '../../HomeHeader/styles';

function ContactCard({ contactId, contactName, contactPhone, contactEmail, setSelectedContact, selectedContact, clearSelectedContact }) {
  const { authUserInfo } = useContext(AuthContext);

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

  // function createChat() {
  //   const chatUsers = [
  //     {
  //       _id: authUserInfo.id,
  //       name: authUserInfo.name,
  //       email: authUserInfo.email,
  //       phone: authUserInfo.phone
  //     },
  //     {
  //       _id: contactId,
  //       name: contactName,
  //       email: contactEmail,
  //       phone: contactPhone
  //     }
  //   ]

  //   api.post('/chat/store', { chatUsers })
  //     .then(resp => console.log(resp.data))
  //     .catch(error => console.log(error.response.data));
  // };

  function onPressHandler() {
    if (selectedContact) {
      if (selectedContact === contactId) {
        clearSelectedContact();
      } else {
        setSelectedContact(contactId);
      }
    } else {
      console.log('create-chat');
    }
  };

  return (
    <Pressable onPress={onPressHandler} onLongPress={() => setSelectedContact(contactId)} android_ripple={{ color: '#b4b4b4' }}>
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