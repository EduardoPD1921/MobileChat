import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, Text, Button } from 'react-native';

function Home() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;