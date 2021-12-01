import React, { createContext, useState, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

const ChatContext = createContext();

import socket from '../socket';

function ChatProvider({ children }) {
  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    // Chat created by the auth user
    function getCreatedChat(newChat) {
      updateUserChats(newChat);
    };

    // Chat created by another user
    function getNewChat(newChat, contactName) {
      updateUserChats(newChat);

      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: 'Novo chat criado',
        message: `${contactName} iniciou um novo chat com você`
      });
    };

    socket.on('getCreatedChat', getCreatedChat);
    socket.on('getNewChat', getNewChat);

    return () => {
      socket.off('getCreatedChat', getCreatedChat);
      socket.off('getNewChat', getNewChat);
    };
  });

  function updateUserChats(newChat) {
    setUserChats(prevState => [...prevState, newChat]);
  };

  return (
    <ChatContext.Provider value={{ userChats, setUserChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };