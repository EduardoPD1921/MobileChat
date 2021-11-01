import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { NotificationContext } from '../../../../contexts/NotificationContext';

import api from '../../../../api';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import userDefaultImage from '../../../../assets/images/userNotImage.png';

import { containerStyle, imageStyle, textStyle } from './styles';

function NotificationCard({ senderName, senderId, senderEmail, senderPhone, date }) {
  const { setUserNotifications } = useContext(NotificationContext);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const topAnimation = useSharedValue(0);
  const marginAnimation = useSharedValue(0);
  const arrowAnimation = useSharedValue(0);

  function acceptContactInvite() {
    const contactInfo = {
      id: senderId,
      name: senderName,
      email: senderEmail,
      phone: senderPhone
    };

    api.put('/user/acceptContactInvite', { contactInfo })
      .then(resp => setUserNotifications(resp.data.notifications))
      .catch(error => console.log(error.response.data));
  };

  function renderDateDifference() {
    const currentDate = new Date();
    const notificationDate = new Date(date);
    const differenceInMinutes = parseInt((currentDate.getTime() - notificationDate.getTime()) / 60000);
    const differenceInDays = parseInt((currentDate.getTime() - notificationDate.getTime()) / (24 * 3600 * 1000));

    if (differenceInDays > 0) {
      return `${differenceInDays} dia${differenceInDays > 1 ? 's' : ''}`;
    }

    if (differenceInMinutes === 0) {
      return 'Agora';
    }

    if (differenceInMinutes >= 60) {
      return `${Math.floor(differenceInMinutes / 60)} hrs`;
    }

    return `${differenceInMinutes} min`;
  }

  function openOptions() {
    arrowAnimation.value = withTiming(180, { duration: 200 });
    marginAnimation.value = withTiming(50, { duration: 200 });
    topAnimation.value = withTiming(60, { duration: 200 });
  };

  function closeOptions() {
    arrowAnimation.value = withTiming(0, { duration: 200 });
    marginAnimation.value = withTiming(0, { duration: 200 });
    topAnimation.value = withTiming(0, { duration: 200 });
  };

  function toggleIsNotificationOpen() {
    setIsNotificationOpen(prevState => !prevState);
  };

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        rotate: `${arrowAnimation.value}deg`
      }]
    };
  });

  const marginAnimationStyle = useAnimatedStyle(() => {
    return {
      marginBottom: marginAnimation.value
    };
  });

  const topAnimationStyle = useAnimatedStyle(() => {
    return {
      top: topAnimation.value
    };
  });

  return (
    <>
      <Animated.View style={[containerStyle.notificationOptions, topAnimationStyle]}>
        <TouchableOpacity onPress={acceptContactInvite} activeOpacity={0.7} style={containerStyle.acceptButton}>
          <Text style={{ color: 'white' }}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={containerStyle.rejectButton}>
          <Text style={{ color: 'white' }}>Cancelar</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[containerStyle.cardContainer, marginAnimationStyle]}>
        <View style={containerStyle.profileImageContainer}>
          <Image style={imageStyle.userImage} source={userDefaultImage} />
        </View>
        <View style={containerStyle.notificationTextContainer}>
          <Text style={textStyle.senderName}>{senderName} </Text>
          <Text style={textStyle.notificationDesc}>enviou um pedido de amizade. </Text>
          <Text style={textStyle.notificationTime}>{renderDateDifference()}</Text>
          <Animated.View style={[arrowAnimationStyle, { marginLeft: 10 }]}>
            <MaterialIcon onPress={toggleIsNotificationOpen} name="keyboard-arrow-down" size={20} color="gray" />
          </Animated.View>
        </View>
      </Animated.View>
      {isNotificationOpen ? openOptions() : closeOptions()}
    </>
  );
};

export default NotificationCard;