import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { View, Text, Image } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer'

import userDefaultImage from '../../../assets/images/userDefaultImage.png';

import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { containerStyle, imageStyle, textStyle } from './styles';

function DrawerMenu() {
  const { authUserInfo, handleLogout } = useContext(AuthContext);

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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <DrawerItem
            label={props => {
              return (
                <View style={containerStyle.drawerItem}>
                  <IonIcons
                    name="chatbox-ellipses"
                    size={25}
                  />
                  <Text style={textStyle.drawerItemText}>Conversas</Text>
                </View>
              );
            }}
          />
          <DrawerItem
            label={props => {
              return (
                <View style={containerStyle.drawerItem}>
                  <MaterialIcon
                    name="group-add"
                    size={25} 
                  />
                  <Text style={textStyle.drawerItemText}>Novo grupo</Text>
                </View>
              );
            }} 
          />
          <DrawerItem
            label={props => {
              return (
                <View style={containerStyle.drawerItem}>
                  <MaterialIcon
                    name="contacts"
                    size={25} 
                  />
                  <Text style={textStyle.drawerItemText}>Contatos</Text>
                </View>
              );
            }} 
          />
          <DrawerItem
            label={props => {
              return (
                <View style={containerStyle.drawerItem}>
                  <IonIcons
                    name="md-settings-sharp"
                    size={25} 
                  />
                  <Text style={textStyle.drawerItemText}>Configurações</Text>
                </View>
              );
            }} 
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <DrawerItem
            onPress={handleLogout}
            style={containerStyle.drawerExit}
            label={props => {
              return (
                <View style={containerStyle.drawerItem}>
                  <MaterialIcon
                    name="exit-to-app"
                    size={25}
                    color="red"
                  />
                  <Text style={[textStyle.drawerItemText, { color: 'red' }]}>Sair</Text>
                </View>
              )
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DrawerMenu;