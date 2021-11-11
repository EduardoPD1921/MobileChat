import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NotificationContext } from '../../../contexts/NotificationContext';

import IonIcon from 'react-native-vector-icons/Ionicons';

import { containerStyle, iconStyle, textStyle } from './styles';

function HomeHeader({ navigation, openTab }) {
  const { userNotifications } = useContext(NotificationContext);

  function renderNotificationIndicator() {
    if (userNotifications.length > 0) {
      return <View style={containerStyle.notificationIndicator} />
    }
  };

  return (
    <View style={containerStyle.mainContainer}>
      <View style={containerStyle.titleContainer}>
        <Pressable 
          style={{ marginLeft: 15 }} 
          onPress={() => navigation.openDrawer()} 
          android_ripple={{ color: '#D4EDE1', borderless: true }}
        >
          <IonIcon
            style={iconStyle.menu}
            color="white"
            name="menu-sharp"
            size={25} 
          />
        </Pressable>
        <Text style={textStyle.headerTitle}>Mobilechat</Text>
      </View>
      <View style={containerStyle.searchContainer}>
        <IonIcon
          style={iconStyle.search}
          name="search"
          color="white"
          size={20} 
        />
        <Pressable style={{ marginRight: 15 }} onPress={openTab} android_ripple={{ color: '#D4EDE1', borderless: true }}>
          {renderNotificationIndicator()}
          <IonIcon
            style={[iconStyle.search, { marginRight: 0 }]}
            name="notifications-outline"
            color="white"
            size={20} 
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;