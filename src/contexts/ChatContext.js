import React, { createContext, useState, useEffect } from 'react';

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [userChats, setUserChats] = useState([]);

  // useEffect(() => {
  //   console.log('test');
  //   api.get('/chat/getUserChats')
  //     .then(resp => console.log(resp.data))
  //     .catch(error => console.log(error.response.data));
  // }, []);

  return (
    <ChatContext.Provider value={{ userChats, setUserChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };