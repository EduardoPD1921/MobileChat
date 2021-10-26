import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import { View, Text, StatusBar, Button } from 'react-native';

import socket from '../../socket';

import Header from '../../components/UI/Header';
import OptionsButton from '../../components/UI/Animated/OptionsButton';
import NotificationsTab from '../../components/UI/Animated/NotificationsTab';

import { containerStyle } from './styles';

function Home({ navigation }) {
  const { userNotifications } = useContext(NotificationContext);
  const { authUserInfo } = useContext(AuthContext);

  const [isTabOpen, setIsTabOpen] = useState(false);
  // const [userNotifications, setUserNotifications] = useState();

  // useEffect(() => {
  //   function getUserNotifications(notifications) {
  //     setUserNotifications(notifications);
  //   };

  //   socket.on('getUserNotifications', getUserNotifications);
  //   socket.emit('userConnected', authUserInfo);

  //   return () => {
  //     socket.off('getUserNotifications', getUserNotifications);
  //   };
  // }, []);

  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar backgroundColor="#52B788" />
      <OptionsButton navigation={navigation} />
      <Header navigation={navigation} setIsTabOpen={setIsTabOpen} />
      <Text>Home</Text>
      <Button title="test" onPress={() => console.log(userNotifications)} />
      <NotificationsTab isTabOpen={isTabOpen} setIsTabOpen={setIsTabOpen} />
    </View>
  );
};

export default Home;