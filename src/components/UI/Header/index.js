import React from 'react';
import { View, Text } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { containerStyle, iconStyle, textStyle } from './styles';

function Header() {
  return (
    <View style={containerStyle.mainContainer}>
      <View style={containerStyle.titleContainer}>
        <FeatherIcon
          style={iconStyle.menu}
          name="menu"
          size={30} 
        />
        <Text style={textStyle.headerTitle}>Chats</Text>
      </View>
      <View style={containerStyle.searchContainer}>
        <IonIcon
          style={iconStyle.search}
          name="search"
          color="white"
          size={20} 
        />
        <IonIcon
          style={iconStyle.settings}
          name="ios-ellipsis-vertical-sharp"
          color="white"
          size={20} 
        />
      </View>
    </View>
  );
};

export default Header;