import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import Header from '../../components/UI/Header';
import OptionsButton from '../../components/UI/Animated/OptionsButton';

import { containerStyle } from './styles';

function Home({ navigation }) {
  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar backgroundColor="#52B788" />
      <OptionsButton navigation={navigation} />
      <Header navigation={navigation} />
      <Text>Home</Text>
    </View>
  );
};

export default Home;