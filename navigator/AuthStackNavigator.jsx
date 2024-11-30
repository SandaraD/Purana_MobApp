// navigator/AuthStackNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{ title: 'Sign In' }} // Customize the header title
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ title: 'Sign Up' }} // Customize the header title
      />
    </Stack.Navigator>
  );
}
