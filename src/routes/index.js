import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Contacts from '../screens/Contacts';
import AddContact from '../screens/AddContact';

import DrawerMenu from '../components/UI/DrawerMenu';

function Routes() {
  const { authenticated, isLoading } = useContext(AuthContext);

  function AuthDrawerNavigation() {
    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerMenu {...props} />}
      >
        <Drawer.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Drawer.Screen options={{ headerShown: false }} name="Contacts" component={Contacts} />
        <Drawer.Screen options={{ headerShown: false }} name="AddContact" component={AddContact} />
      </Drawer.Navigator>
    );
  };

  function renderSplashScreen() {
    if (isLoading) {
      return (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen} 
          options={{
            headerShown: false
          }}
        />
      );
    }
  };

  function renderScreens() {
    if (authenticated) {
      return (
        <Stack.Screen
          name="Drawer"
          component={AuthDrawerNavigation}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
            headerShown: false
          }} 
        />
      );
    }
    
    return (
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} 
      />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {renderSplashScreen()}
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;