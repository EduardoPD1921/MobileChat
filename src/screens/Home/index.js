import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, Text, Button, StatusBar } from 'react-native';

import Header from '../../components/UI/Header';

function Home({ navigation }) {
  const { handleLogout } = useContext(AuthContext);

  return (
    <View>
      <StatusBar backgroundColor="#52B788" />
      <Header navigation={navigation} />
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;