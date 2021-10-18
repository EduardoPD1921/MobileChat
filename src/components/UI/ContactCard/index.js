import React from 'react';
import { View, Text, Pressable } from 'react-native';
import api from '../../../api';

import FeatherIcon from 'react-native-vector-icons/Feather';

import { containerStyle, textStyle } from './styles';

function ContactCard({ userName, userEmail, userId, isInviteSended, setSearchedUsers, searchedUsers, authUserInfo }) {
  function addContact() {
    api.put('/user/sendContactInvite', { receiverId: userId })
      .then(resp => {
        const updatedSearchedUsersArr = searchedUsers.map(user => {
          if (user._id === userId) {
            user.notifications.push(resp.data.notification);
            return user;
          }

          return user;
        });

        setSearchedUsers(updatedSearchedUsersArr);
      })
      .catch(error => console.log(error.response.data));
  };

  function cancelContactInvite() {
    api.put('/user/cancelContactInvite', { receiverId: userId })
      .then(resp => {
        const updatedSearchedUsersArr = searchedUsers.map(user => {
          if (user._id === userId) {
            const updatedNotifications = user.notifications.filter(notification => notification.senderId !== authUserInfo.id);
            user.notifications = updatedNotifications;

            return user;
          }

          return user;
        });

        setSearchedUsers(updatedSearchedUsersArr);
      })
      .catch(error => console.log(error.response.data));
  };

  function renderAddContactButton() {
    if (isInviteSended) {
      return (
        <Pressable onPress={cancelContactInvite} style={[containerStyle.addContactButton, { backgroundColor: '#DC3545' }]} android_ripple={{ color: '#D4EDE1' }}>
          <Text style={textStyle.whiteText}>Cancelar</Text>
        </Pressable>
      );
    }

    return (
      <Pressable onPress={addContact} style={containerStyle.addContactButton} android_ripple={{ color: '#D4EDE1' }}>
        <Text style={textStyle.whiteText}>Adicionar</Text>
      </Pressable>
    );
  };

  return (
    <View style={containerStyle.cardContainer}>
      <View style={containerStyle.userIcon}>
        <FeatherIcon name="user" size={30} />
      </View>
      <View style={containerStyle.userInfo}>
        <Text style={textStyle.whiteText}>{userName}</Text>
        <Text style={textStyle.userEmail}>{userEmail}</Text>
      </View>
      <View style={containerStyle.addContact}>
        {renderAddContactButton()}  
      </View>
    </View>
  );
};

export default ContactCard;