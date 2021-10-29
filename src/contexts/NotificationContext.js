import React, { useEffect, useState, createContext } from 'react';

import socket from '../socket';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
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

    function contactInviteCanceled(notificationsUpdated) {
      setUserNotifications(notificationsUpdated.notifications);
    };
    
    socket.on('getUserNotifications', getUserNotifications);
    socket.on('contactInviteReceived', contactInviteReceived);
    socket.on('contactInviteCanceled', contactInviteCanceled);

    return () => {
      socket.off('getUserNotifications', getUserNotifications);
      socket.off('contactInviteReceived', contactInviteReceived);
      socket.off('contactInviteCanceled', contactInviteCanceled);
    };
  });

  return (
    <NotificationContext.Provider value={{ userNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };