import React, { createContext, useState } from 'react';

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [userChats, setUserChats] = useState([]);

  return (
    <ChatContext.Provider value={{ userChats, setUserChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };