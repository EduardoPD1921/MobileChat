import React, { useEffect, useState, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';

import socket from '../socket';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const { isLoading, authUserInfo } = useContext(AuthContext);

  const [userNotifications, setUserNotifications] = useState();

  useEffect(() => {
    function getUserNotifications(user) {
      console.log('test');
      setUserNotifications(user.notifications);
    };

    function contactInviteReceived(invite) {
      console.log(userNotifications);
      const userNotificationsUpdatedArr = userNotifications.push(invite);

      setUserNotifications(userNotificationsUpdatedArr);
    };

    if (!isLoading) {
      socket.on('getUserNotifications', getUserNotifications);
      socket.on('contactInviteReceived', contactInviteReceived);
      socket.emit('userConnected', authUserInfo);
    }

    return () => {
      socket.off('getUserNotifications', getUserNotifications);
      socket.off('contactInviteReceived', contactInviteReceived);
    };
  }, [isLoading]);

  return (
    <NotificationContext.Provider value={{ userNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };