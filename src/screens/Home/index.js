import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, Text, StatusBar, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

import socket from '../../socket';

import HomeHeader from '../../components/UI/HomeHeader';
import OptionsButton from '../../components/UI/Animated/OptionsButton';
import NotificationsTab from '../../components/UI/Animated/NotificationsTab';

import { containerStyle } from './styles';

// const counter = new Set();

function Home({ navigation }) {
  const { authUserInfo } = useContext(AuthContext);

  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.emit('userConnected', authUserInfo);

    PushNotification.createChannel({
      channelId: 'invite-channel',
      channelName: 'Invite channel'
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsOpenOptions(false);
      };
    }, [])
  );

  const toggleOptions = useCallback(() => {
    setIsOpenOptions(prevState => !prevState);
  }, []);

  const openTab = useCallback(() => {
    setIsTabOpen(true)
  }, []);

  // const closeTab = useCallback(() => {
  //   setIsTabOpen(false);
  // }, []);

  // counter.add(toggleOptions);
  // console.log(counter.size);

  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar backgroundColor="#52B788" />
      <OptionsButton navigation={navigation} isOpenOptions={isOpenOptions} toggleOptions={toggleOptions} />
      <HomeHeader notifications={authUserInfo} navigation={navigation} openTab={openTab} />
      <Text>Home</Text>
      {/* <Button title="test" onPress={dispatchNotification} /> */}
      <NotificationsTab isTabOpen={isTabOpen} setIsTabOpen={setIsTabOpen} />
    </View>
  );
};

export default Home;