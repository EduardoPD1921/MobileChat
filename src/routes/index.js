import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

function Routes() {
  const { authenticated, isLoading } = useContext(AuthContext);

  function renderSplashScreen() {
    if (isLoading) {
      return (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen} 
        />
      );
    }
  };

  function renderScreens() {
    if (authenticated) {
      return (
        <Stack.Screen
          name="Home"
          component={Home}
          options={
            {
              cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
            }
          } 
        />
      );
    }

    return (
      <>
        <Stack.Screen
          name="Login"
          component={Login}
          options={
            {
              headerTitle: 'Entrar',
              headerStyle: { backgroundColor: '#52B788' },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerTitleStyle: { fontFamily: 'Poppins-Medium' }
            }
          } 
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={
            {
              headerTitle: 'Cadastro',
              headerStyle: { backgroundColor: '#52B788' },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerTitleStyle: { fontFamily: 'Poppins-Medium' },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }
          }
        />
      </>
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