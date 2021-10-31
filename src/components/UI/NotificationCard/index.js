import React from 'react';
import { View, Text, Image } from 'react-native';

import userDefaultImage from '../../../assets/images/userNotImage.png';

import { containerStyle, imageStyle, textStyle } from './styles';

function NotificationCard({ senderName, date }) {
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

  return (
    <View style={containerStyle.cardContainer}>
      <View style={containerStyle.profileImageContainer}>
        <Image style={imageStyle.userImage} source={userDefaultImage} />
      </View>
      <View style={containerStyle.notificationTextContainer}>
        <Text style={textStyle.senderName}>{senderName} </Text>
        <Text style={textStyle.notificationDesc}>enviou um pedido de amizade. </Text>
        <Text style={textStyle.notificationTime}>{renderDateDifference()}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;