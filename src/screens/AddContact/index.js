import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import api from '../../api';

import AnimatedHeader from '../../components/UI/Animated/AnimatedHeader';
import ContactCard from '../../components/UI/ContactCard';

function AddContact() {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [authUserInfo, setAuthUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.get('/user/decodeAuthToken')
      .then(resp => setAuthUserInfo(resp.data.userInfo))
      .catch(error => console.log(error.response.data));
  }, []);

  function renderFlastList() {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#bee4d2" />
    }

    return (
      <FlatList
        style={{ marginTop: 60 }}
        data={searchedUsers}
        renderItem={function({ item }) {
          if (authUserInfo.id !== item._id) {
            const isInviteSended = item.notifications.find(notification => notification.senderId === authUserInfo.id);

            return (
              <ContactCard
                userId={item._id}
                userName={item.name}
                userEmail={item.email}
                isInviteSended={!!isInviteSended} 
              />
            );
          }
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#68c097' }}>
      <AnimatedHeader
        setSearchedUsers={setSearchedUsers}
        setIsLoading={setIsLoading}
      />

      {renderFlastList()}
    </View>
  );
};

export default AddContact;