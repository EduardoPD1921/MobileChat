import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { ChatContext } from '../../../../contexts/ChatContext';
import { View, Text, Image, Pressable } from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

// import api from '../../../../api';
import socket from '../../../../socket';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { componentStyles } from './styles';

import userDefaultImage from '../../../../assets/images/userDefaultImage.png';
import { iconStyle } from '../../HomeHeader/styles';

function ContactCard({ navigation, contactId, contactName, contactPhone, contactEmail, setSelectedContact, selectedContact, clearSelectedContact }) {
  const { authUserInfo } = useContext(AuthContext);
  const { userChats } = useContext(ChatContext);

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

  function createChat() {
    const chatValidation = userChats.filter(chat => (chat.type === 'chat') && 
      (chat.users[0]._id === contactId || chat.users[1]._id === contactId));

    if (!!chatValidation[0]) {
      navigation.navigate('Home');
    } else {
      const chatUsers = [
        {
          _id: authUserInfo.id,
          name: authUserInfo.name,
          email: authUserInfo.email,
          phone: authUserInfo.phone
        },
        {
          _id: contactId,
          name: contactName,
          email: contactEmail,
          phone: contactPhone
        }
      ]
  
      socket.emit('createChat', chatUsers, contactId, authUserInfo.name);
    }
  };

  function onPressHandler() {
    if (selectedContact) {
      if (selectedContact === contactId) {
        clearSelectedContact();
      } else {
        setSelectedContact(contactId);
      }
    } else {
      createChat();
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