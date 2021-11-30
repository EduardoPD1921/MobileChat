import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StatusBar, BackHandler } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

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

  // Alert back handler
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isAlertOpen) {
          toggleAlertOpen();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isAlertOpen, toggleAlertOpen])
  );

  // Select back handler
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (selectedContact) {
          clearSelectedContact();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [selectedContact, clearSelectedContact])
  )

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

  function renderStatusBar() {
    if (isAlertOpen) {
      return <StatusBar backgroundColor="#3a805f" />
    }

    return <StatusBar backgroundColor="#52B788" />
  };

  return (
    <>
      {renderStatusBar()}
      <DeleteAlert 
        toggleAlertOpen={toggleAlertOpen} 
        isAlertOpen={isAlertOpen} 
        selectedContact={selectedContact} 
        clearSelectedContact={clearSelectedContact} 
        updateUserContacts={updateUserContacts}
      />
      <View style={containerStyle.mainScreenContainer}>
        <ContactsHeader 
          navigation={navigation} 
          selectedContact={selectedContact} 
          clearSelectedContact={clearSelectedContact} 
          updateUserContacts={updateUserContacts}
          toggleAlertOpen={toggleAlertOpen}
        />
        {renderContacts()}
      </View>
    </>
  );
};

export default Contacts;