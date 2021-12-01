import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { View, StatusBar, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
  const { setUserChats, userChats } = useContext(ChatContext);

  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.emit('userConnected', authUserInfo);

    PushNotification.createChannel({
      channelId: 'invite-channel',
      channelName: 'Invite channel'
    });

    api.get('chat/getUserChats')
      .then(resp => setUserChats(resp.data))
      .catch(error => console.log(error.response.data));
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsOpenOptions(false);
      };
    }, [])
  );

  function renderChats() {
    return userChats.map(chat => {
      if (chat.users[0]._id !== authUserInfo.id) {
        return (
          <ChatCard
            key={chat.users[0]._id}
            chatName={chat.users[0].name} 
          />
        );
      }

      return (
        <ChatCard
          key={chat.users[1]._id}
          chatName={chat.users[1].name} 
        />
      );
    });
  };

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
      <ScrollView>
        {renderChats()}
      </ScrollView>
      <NotificationsTab isTabOpen={isTabOpen} closeTab={closeTab} openTab={openTab} />
    </View>
  );
};

export default Home;