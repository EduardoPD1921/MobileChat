import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from '../screens/Login';
import Signup from '../screens/Signup';

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={
            {
              headerStyle: { backgroundColor: '#52B788' },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
            }
          } 
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={
            {
              headerStyle: { backgroundColor: '#52B788' },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;