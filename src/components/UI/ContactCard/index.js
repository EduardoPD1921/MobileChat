import React from 'react';
import { View, Text, Pressable } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import { containerStyle, textStyle } from './styles';

function ContactCard({ userName, userEmail, userId }) {
  return (
    <View style={containerStyle.cardContainer}>
      <View style={containerStyle.userIcon}>
        <FeatherIcon name="user" size={30} />
      </View>
      <View style={containerStyle.userInfo}>
        <Text style={textStyle.whiteText}>{userName}</Text>
        <Text style={textStyle.userEmail}>{userEmail}</Text>
      </View>
      <View style={containerStyle.addContact}>
        <Pressable style={containerStyle.addContactButton} android_ripple={{ color: '#D4EDE1' }}>
          <Text style={textStyle.whiteText}>Adicionar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ContactCard;