import React, { useEffect, useState, createContext } from 'react';

import socket from '../socket';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [userNotifications, setUserNotifications] = useState([]);

  useEffect(() => { 
    function getUserNotifications(user) {
      setUserNotifications(user.notifications);
    };

    function contactInviteReceived(userNotifications) {
      setUserNotifications(userNotifications.notifications);
    };

    function contactInviteCanceled(notificationsUpdated) {
      setUserNotifications(notificationsUpdated.notifications);
    };

    function getUpdatedNotificationList(notificationList) {
      setUserNotifications(notificationList.notifications);
    };
    
    socket.on('getUserNotifications', getUserNotifications);
    socket.on('contactInviteReceived', contactInviteReceived);
    socket.on('contactInviteCanceled', contactInviteCanceled);
    socket.on('getUpdatedNotificationList', getUpdatedNotificationList);

    return () => {
      socket.off('getUserNotifications', getUserNotifications);
      socket.off('contactInviteReceived', contactInviteReceived);
      socket.off('contactInviteCanceled', contactInviteCanceled);
      socket.off('getUpdatedNotificationList', getUpdatedNotificationList);
    };
  });

  return (
    <NotificationContext.Provider value={{ userNotifications, setUserNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };