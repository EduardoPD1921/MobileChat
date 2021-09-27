import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from '../screens/Login';
import Register from '../screens/Register';

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
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;