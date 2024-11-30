// navigator/ExploreStackNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import InfoScreen from '../screens/InfoScreen';

const Stack = createStackNavigator();

export default function ExploreStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{ title: 'Explore' }}
      />
      <Stack.Screen 
        name="InfoScreen"  // Correct screen name here
        component={InfoScreen} 
        options={{ title: 'Site Information' }}
      />
    </Stack.Navigator>
  );
}

