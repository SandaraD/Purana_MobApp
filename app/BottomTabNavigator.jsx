// navigator/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreStackNavigator from '../navigator/ExploreStackNavigator'; 
import ScanStackNavigator from '../navigator/ScanStackNavigator';
import ChatBotScreen from '../screens/ChatBotScreen';
import NearestSiteScreen from '../screens/NearestSiteScreen';
import TabBar from '../components/TabBar';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen 
        name="explore" 
        component={ExploreStackNavigator}
        options={{ title: "Explore" , headerShown: false }}
      />
        <Tab.Screen
          name="nearest"
          component={NearestSiteScreen} 
          options={{ title: "Nearest Sites" }}
        />
      <Tab.Screen 
        name="scan" 
        component={ScanStackNavigator} 
        options={{ title: "Scan", headerShown: false }} 
      />
      <Tab.Screen
        name="chatbot"
        component={ChatBotScreen} 
        options={{ title: "Virtual Assistant" }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}

