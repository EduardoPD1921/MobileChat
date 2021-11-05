import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, Text, StatusBar, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

import socket from '../../socket';

import Header from '../../components/UI/Header';
import OptionsButton from '../../components/UI/Animated/OptionsButton';
import NotificationsTab from '../../components/UI/Animated/NotificationsTab';

import { containerStyle } from './styles';

function Home({ navigation }) {
  const { authUserInfo } = useContext(AuthContext);

  const [isTabOpen, setIsTabOpen] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.emit('userConnected', authUserInfo);

    PushNotification.createChannel({
      channelId: 'invite-channel',
      channelName: 'Invite channel'
    });
  }, []);

  // function dispatchNotification() {
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: 'Test',
  //     message: 'Test message',
  //   });
  // };

  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar backgroundColor="#52B788" />
      <OptionsButton navigation={navigation} />
      <Header notifications={authUserInfo} navigation={navigation} setIsTabOpen={setIsTabOpen} />
      <Text>Home</Text>
      {/* <Button title="test" onPress={dispatchNotification} /> */}
      <NotificationsTab isTabOpen={isTabOpen} setIsTabOpen={setIsTabOpen} />
    </View>
  );
};

export default Home;