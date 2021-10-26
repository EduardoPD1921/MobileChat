import React from 'react';

import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;