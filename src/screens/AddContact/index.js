import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { View, FlatList, ActivityIndicator } from 'react-native';

import socket from '../../socket';

import AnimatedHeader from '../../components/UI/Animated/AnimatedHeader';
import ContactCard from '../../components/UI/ContactCard';

function AddContact() {
  const { authUserInfo } = useContext(AuthContext);

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

    socket.on('getSendedNotificationInvite', getSendedNotificationInvite);

    return () => {
      socket.off('getSendedNotificationInvite', getSendedNotificationInvite);
    };
  });

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

            return (
              <ContactCard
                userId={item._id}
                userName={item.name}
                userEmail={item.email}
                isInviteSended={!!isInviteSended} 
                setSearchedUsers={setSearchedUsers}
                searchedUsers={searchedUsers}
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
        setIsLoading={setIsLoading}
      />

      {renderFlastList()}
    </View>
  );
};

export default AddContact;