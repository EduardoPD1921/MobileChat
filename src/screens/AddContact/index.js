import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import socket from '../../socket';
import api from '../../api';

import AnimatedHeader from '../../components/UI/Animated/AnimatedHeader';
import ContactCard from '../../components/UI/ContactCard';

function AddContact() {
  const { authUserInfo } = useContext(AuthContext);

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [authUserContacts, setAuthUserContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  // useEffect for sockets exclusively
  useEffect(() => {
    function getSendedNotificationInvite(query, receiverId) {
      const updatedSearchedUsersArr = searchedUsers.map(user => {
        if (user._id === receiverId) {
          user.notifications.push(query.notifications[query.notifications.length - 1]);
          return user;
        }

        return user;
      });

      setSearchedUsers(updatedSearchedUsersArr);
    };

    function getUpdatedContacts(updatedContacts) {
      setAuthUserContacts(updatedContacts.contacts);
    };

    socket.on('getUpdatedContacts', getUpdatedContacts);
    socket.on('getSendedNotificationInvite', getSendedNotificationInvite);

    return () => {
      socket.off('getSendedNotificationInvite', getSendedNotificationInvite);
      socket.off('getUpdatedContacts', getUpdatedContacts);
    };
  });

  // useEffect for api request
  useEffect(() => {
    if (isFocused) {
      api.get('/user/getUserContacts')
        .then(resp => setAuthUserContacts(resp.data.contacts))
        .catch(error => console.log(error.response.data));
    }
  }, [isFocused]);

  // useCallback for better optimization
  const isLoadingTrue = useCallback(() => {
    setIsLoading(true);
  }, []);

  const isLoadingFalse = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleSetSearchedUsers = useCallback((data) => {
    setSearchedUsers(data);
  }, []);

  function renderFlastList() {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#bee4d2" />
    }

    return (
      <FlatList
        style={{ marginTop: 60 }}
        data={searchedUsers}
        renderItem={function({ item }) {
          if (authUserInfo.id !== item._id) {
            const isInviteSended = item.notifications.find(notification => notification.senderId === authUserInfo.id);
            const isAlreadyContact = authUserContacts.find(contact => contact._id === item._id);

            return (
              <ContactCard
                userId={item._id}
                userName={item.name}
                userEmail={item.email}
                isInviteSended={!!isInviteSended}
                isAlreadyContact={!!isAlreadyContact}
                searchedUsers={searchedUsers}
                handleSetSearchedUsers={handleSetSearchedUsers}
              />
            );
          }
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#68c097' }}>
      <AnimatedHeader
        setSearchedUsers={setSearchedUsers}
        isLoadingFalse={isLoadingFalse}
        isLoadingTrue={isLoadingTrue}
      />

      {renderFlastList()}
    </View>
  );
};

export default AddContact;