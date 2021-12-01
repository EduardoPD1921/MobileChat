import React, { createContext, useState, useEffect } from 'react';

const ChatContext = createContext();

import socket from '../socket';

function ChatProvider({ children }) {
  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    function updateUserChats(newChat) {
      setUserChats(prevState => [...prevState, newChat]);
    };

    socket.on('sendUserNewChat', updateUserChats);

    return () => {
      socket.off('sendUserNewChat', updateUserChats);
    };
  });

  return (
    <ChatContext.Provider value={{ userChats, setUserChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };