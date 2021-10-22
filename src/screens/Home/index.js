import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, Text, StatusBar, Button } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '../../api';

import Header from '../../components/UI/Header';
import OptionsButton from '../../components/UI/Animated/OptionsButton';
import NotificationsTab from '../../components/UI/Animated/NotificationsTab';

import { containerStyle } from './styles';

function Home({ navigation }) {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [userNotifications, setUserNotifications] = useState();

  const isFocused = useIsFocused();

  const { authUserInfo } = useContext(AuthContext);

  useEffect(() => {
    console.log(api.defaults.Authorization);
    api.get(`/user/getUserNotifications/${authUserInfo.id}`)
      .then(resp => console.log(resp.data))
      .catch(error => console.log(error.response.data));
  }, []);

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