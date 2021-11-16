import React from 'react';

import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <NotificationProvider>
          <Routes />
        </NotificationProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;