import React from 'react';
import { View, Text, Image } from 'react-native';

import { notAdvStyle } from './styles';

import emptyNotificationImage from '../../../assets/images/emptyNotification.png';

function NotificationAdvice() {
  return (
    <View>
      <Image style={notAdvStyle.imageStyle} source={emptyNotificationImage} />
      <Text style={notAdvStyle.textStyle}>Você não tem nenhuma notificação.</Text>
    </View>
  );
};

export default NotificationAdvice;