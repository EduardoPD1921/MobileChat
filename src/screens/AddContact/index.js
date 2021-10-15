import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import AnimatedHeader from '../../components/UI/Animated/AnimatedHeader';
import ContactCard from '../../components/UI/ContactCard';

function AddContact() {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function renderFlastList() {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#bee4d2" />
    }

    return (
      <FlatList
        style={{ marginTop: 60 }}
        data={searchedUsers}
        renderItem={({ item }) => (
          <ContactCard
            userId={item._id}
            userName={item.name}
            userEmail={item.email} 
          />
        )} 
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