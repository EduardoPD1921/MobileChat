import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import userDefaultImage from '../../../../assets/images/userDefaultImage.png';

import { chatCardStyles } from './styles';

function ChatCard({ chatName }) {
  return (
    <Pressable android_ripple={{ color: 'black' }}>
      <View style={chatCardStyles.cardContainer}>
        <View style={chatCardStyles.imageContainer}>
          <Image style={chatCardStyles.userImage} source={userDefaultImage} />
        </View>
        <View style={chatCardStyles.chatInfoContainer}>
          <Text style={chatCardStyles.chatName}>{chatName}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatCard;