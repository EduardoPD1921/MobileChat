import React from 'react';
import { View, Text } from 'react-native';

import ContactsHeader from '../../components/UI/Animated/ContactsHeader';

import { containerStyle } from './styles';

function Contacts({ navigation }) {
  return (
    <View style={containerStyle.mainScreenContainer}>
      <ContactsHeader navigation={navigation} />
    </View>
  );
};

export default Contacts;