import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';

import socket from '../../../socket';

import FeatherIcon from 'react-native-vector-icons/Feather';

import { containerStyle, textStyle } from './styles';

function ContactCard({ userName, userEmail, userId, isInviteSended, isAlreadyContact, searchedUsers, handleSetSearchedUsers }) {
  const { authUserInfo } = useContext(AuthContext);

  function addContact() {
    socket.emit('sendContactInvite', authUserInfo, userId);
  };

  function cancelAddContactInvite() {
    socket.emit('cancelContactInvite', authUserInfo, userId);

    const updatedSearchedUsersArr = searchedUsers.map(user => {
      if (user._id === userId) {
        const updatedNotifications = user.notifications.filter(notification => notification.senderId !== authUserInfo.id);
        user.notifications = updatedNotifications;

        return user;
      }

      return user;
    });
    
    handleSetSearchedUsers(updatedSearchedUsersArr);
  };

  function renderAddContactButton() {
    if (isAlreadyContact) {
      return <Text style={{ marginRight: 10 }}>Adicionado</Text>
    }

    if (isInviteSended) {
      return (
        <TouchableOpacity onPress={cancelAddContactInvite} style={{ marginRight: 20 }}>
          <Text style={{ color: '#FF4848', fontFamily: 'Roboto-Regular' }}>Cancelar</Text>
        </TouchableOpacity>
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