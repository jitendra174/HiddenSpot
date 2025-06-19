import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import Loader from './components/Loader';
import { useFonts } from 'expo-font';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) return <Loader />;

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

