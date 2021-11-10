import React from 'react';
import { View, Text, Pressable } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { containerStyle, textStyle, iconStyle } from './styles';

function ContactsHeader({ navigation }) {
  return (
    <View style={containerStyle.headerContainer}>
      <View style={containerStyle.titleContainer}>
        <Pressable 
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 15, borderRadius: 30, width: 20 }}
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <FeatherIcon
            color="white"
            name="menu"
            size={20} 
          />
        </Pressable>
        <Text style={textStyle.headerTitle}>Contatos</Text>
      </View>
      <View style={containerStyle.otherOptionsContainer}>
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

export default ContactsHeader;