import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api from '../../api';

import ContactsHeader from '../../components/UI/Animated/ContactsHeader';
import ContactCard from '../../components/UI/Animated/ContactCard';
import DeleteAlert from '../../components/UI/Animated/DeleteAlert';

import { containerStyle } from './styles';

function Contacts({ navigation }) {
  const [userContacts, setUserContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      api.get('/user/getUserContacts')
        .then(resp => setUserContacts(resp.data.contacts))
        .catch(error => console.log(error.response.data));
    }
  }, [isFocused]);

  function toggleAlertOpen() {
    setIsAlertOpen(prevState => !prevState);
  };

  const handleLongPress = useCallback((data) => {
    setSelectedContact(data);
  }, []);

  const updateUserContacts = useCallback((data) => {
    setUserContacts(data);
  }, []);

  const clearSelectedContact = useCallback(() => {
    setSelectedContact('');
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
              contactEmail={contact.email}
              selectedContact={selectedContact}
              setSelectedContact={handleLongPress}
              clearSelectedContact={clearSelectedContact} 
            />
          );
        })}
      </ScrollView>
    )
  };

  return (
    <>
      <DeleteAlert toggleAlertOpen={toggleAlertOpen} isAlertOpen={isAlertOpen} />
      <View style={containerStyle.mainScreenContainer}>
        <ContactsHeader 
          navigation={navigation} 
          selectedContact={selectedContact} 
          clearSelectedContact={clearSelectedContact} 
          updateUserContacts={updateUserContacts}
        />
        {renderContacts()}
      </View>
      <Text onPress={toggleAlertOpen}>Teste</Text>
    </>
  );
};

export default Contacts;