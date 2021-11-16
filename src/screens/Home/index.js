import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, StatusBar, ScrollView } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

import api from '../../api';
import socket from '../../socket';

import HomeHeader from '../../components/UI/HomeHeader';
import OptionsButton from '../../components/UI/Animated/OptionsButton';
import NotificationsTab from '../../components/UI/Animated/NotificationsTab';
import ChatCard from '../../components/UI/Animated/ChatCard';

import { containerStyle } from './styles';

function Home({ navigation }) {
  const { authUserInfo } = useContext(AuthContext);

  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    socket.connect();
    socket.emit('userConnected', authUserInfo);

    PushNotification.createChannel({
      channelId: 'invite-channel',
      channelName: 'Invite channel'
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      api.get('/chat/getUserChats')
        .then(resp => console.log(resp.data))
        .catch(error => console.log(error.response.data));
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsOpenOptions(false);
      };
    }, [])
  );

  // useCallback for better optimization
  const toggleOptions = useCallback(() => {
    setIsOpenOptions(prevState => !prevState);
  }, []);

  const openTab = useCallback(() => {
    setIsTabOpen(true)
  }, []);

  const closeTab = useCallback(() => {
    setIsTabOpen(false);
  }, []);

  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar backgroundColor="#52B788" />
      <OptionsButton navigation={navigation} isOpenOptions={isOpenOptions} toggleOptions={toggleOptions} />
      <HomeHeader notifications={authUserInfo} navigation={navigation} openTab={openTab} />
      {/* <ChatCard /> */}
      <NotificationsTab isTabOpen={isTabOpen} closeTab={closeTab} openTab={openTab} />
    </View>
  );
};

export default Home;