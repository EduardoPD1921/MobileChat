import React from 'react';
import { View, Text, Pressable } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { containerStyle, iconStyle, textStyle } from './styles';

function Header({ navigation }) {
  return (
    <View style={containerStyle.mainContainer}>
      <View style={containerStyle.titleContainer}>
        <Pressable 
          style={{ marginLeft: 15 }} 
          onPress={() => navigation.openDrawer()} 
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <FeatherIcon
            style={iconStyle.menu}
            color="white"
            name="menu"
            size={20} 
          />
        </Pressable>
        <Text style={textStyle.headerTitle}>Chats</Text>
      </View>
      <View style={containerStyle.searchContainer}>
        <IonIcon
          style={iconStyle.search}
          name="search"
          color="white"
          size={20} 
        />
      </View>
    </View>
  );
};

export default Header;