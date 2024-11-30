import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreenView';
import BottomTabNavigator from './app/BottomTabNavigator';
import AuthStackNavigator from './navigator/AuthStackNavigator';
import { auth } from './firebase/firebase'; // Firebase auth instance

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}



// bruno@gmail.com
//Bruno-123

//How big is sigiriya?
//where is it?
//i meant sigiriya