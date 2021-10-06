import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, Text, Button, StatusBar } from 'react-native';

import Header from '../../components/UI/Header';
import OptionsButton from '../../components/UI/OptionsButton';

import { containerStyle } from './styles';

function Home({ navigation }) {
  const { handleLogout } = useContext(AuthContext);

  return (
    <View style={containerStyle.mainContainer}>
      <StatusBar backgroundColor="#52B788" />
      <OptionsButton />
      <Header navigation={navigation} />
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;