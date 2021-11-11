import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api from '../../api';

import ContactsHeader from '../../components/UI/Animated/ContactsHeader';
import ContactCard from '../../components/UI/ContactCard';

import { containerStyle } from './styles';

function Contacts({ navigation }) {
  const [userContacts, setUserContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      api.get('/user/getUserContacts')
        .then(resp => setUserContacts(resp.data.contacts))
        .catch(error => console.log(error.response.data));
    }
  }, [isFocused]);

  const handleLongPress = useCallback((data) => {
    setSelectedContact(data);
  }, []);

  function renderContacts() {
    return (
      <ScrollView>
        {userContacts.map(contact => {
          return (
            <ContactCard
              key={contact._id}
              contactId={contact._id}
              contactName={contact.name}
              contactPhone={contact.phone}
              setSelectedContact={handleLongPress} 
            />
          );
        })}
      </ScrollView>
    )
  };

  return (
    <View style={containerStyle.mainScreenContainer}>
      <ContactsHeader navigation={navigation} selectedContact={selectedContact} />
      {renderContacts()}
      <Text onPress={() => console.log(!!selectedContact)}>
        Teste
      </Text>
    </View>
  );
};

export default Contacts;