import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={
            {
              cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;