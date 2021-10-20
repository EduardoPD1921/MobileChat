import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';

import Header from '../../components/UI/Header';
import OptionsButton from '../../components/UI/Animated/OptionsButton';
import NotificationsTab from '../../components/UI/Animated/NotificationsTab';

import { containerStyle } from './styles';

function Home({ navigation }) {
  const [isTabOpen, setIsTabOpen] = useState(false);

  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar backgroundColor="#52B788" />
      <OptionsButton navigation={navigation} />
      <Header navigation={navigation} setIsTabOpen={setIsTabOpen} />
      <Text>Home</Text>
      <NotificationsTab isTabOpen={isTabOpen} />
    </View>
  );
};

export default Home;