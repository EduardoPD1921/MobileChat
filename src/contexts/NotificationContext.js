import React, { useEffect, useState, createContext } from 'react';
import PushNotification from 'react-native-push-notification';

import socket from '../socket';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [userNotifications, setUserNotifications] = useState([]);

  useEffect(() => { 
    function getUserNotifications(user) {
      setUserNotifications(user.notifications);
    };

    function contactInviteReceived(userNotifications, sender) {
      setUserNotifications(userNotifications.notifications);
      PushNotification.localNotification({
        channelId: 'invite-channel',
        title: 'Pedido de amizade',
        message: `${sender.senderName} quer ser seu amigo`
      });
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