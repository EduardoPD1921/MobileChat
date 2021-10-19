import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { View, Text, Image } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer'

import userDefaultImage from '../../../assets/images/userDefaultImage.png';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { containerStyle, imageStyle, textStyle } from './styles';

function DrawerMenu() {
  const { authUserInfo } = useContext(AuthContext);

  return (
    <View style={containerStyle.drawerContainer}>
      <View style={containerStyle.headerContainer}> 
        <Image 
          style={imageStyle.profileImage} 
          source={userDefaultImage} 
        />
        <View style={containerStyle.userInfoContainer}>
          <Text style={textStyle.userName}>{authUserInfo.name}</Text>
          <Text style={textStyle.userEmail}>{authUserInfo.email}</Text>
        </View>
      </View>
      <View style={containerStyle.drawerItems}>
        <DrawerItem
          label={props => {
            return (
              <View style={{ flexDirection : 'row', alignItems: 'center' }}>
                <MaterialIcon
                  name="home"
                  size={25}
                />
                <Text>Testes</Text>
              </View>
            );
          }}
          focused={true}
        />
      </View>
    </View>
  );
};

export default DrawerMenu;