import React, { useEffect, useState, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';

import socket from '../socket';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const { isLoading, authUserInfo } = useContext(AuthContext);

  const [userNotifications, setUserNotifications] = useState([]);

  useEffect(() => {
    function getUserNotifications(user) {
      setUserNotifications(user.notifications);
    };

    function contactInviteReceived(invite) {
      const userNotificationsUpdatedArr = userNotifications;
      userNotificationsUpdatedArr.push(invite);

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