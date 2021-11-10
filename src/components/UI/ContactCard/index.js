import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import { componentStyles } from './styles';

import userDefaultImage from '../../../assets/images/userDefaultImage.png';

function ContactCard({ contactName, contactPhone }) {
  return (
    <Pressable android_ripple={{ color: '#b4b4b4' }}>
      <View style={componentStyles.cardContainer}>
        <View style={componentStyles.imageContainer}>
          <Image style={componentStyles.image} source={userDefaultImage} />
        </View>
        <View style={componentStyles.contactInfoContainer}>
          <Text style={componentStyles.contactNameText}>{contactName}</Text>
          <Text style={componentStyles.contactPhoneNumber}>{contactPhone}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactCard;