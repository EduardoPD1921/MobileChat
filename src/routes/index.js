import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

function Routes() {
  const { authenticated, isLoading } = useContext(AuthContext);

  function AuthDrawerNavigation() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen options={{ headerShown: false }} name="Home" component={Home} />
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
      <Stack.Group
        screenOptions={{
          headerStyle: { backgroundColor: '#52B788' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Poppins-Medium' }
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: 'Entrar' 
          }} 
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTitle: 'Cadastro',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
          }}
        />
      </Stack.Group>
    )
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