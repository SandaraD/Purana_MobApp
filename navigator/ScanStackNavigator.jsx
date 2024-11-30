import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from '../screens/ScanScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const ScanStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ title: 'Scan QR Code' }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: 'Site Details' }}
      />
    </Stack.Navigator>
  );
};

export default ScanStackNavigator;


