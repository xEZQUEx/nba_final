import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectionScreen from './screens/SelectionScreen';
import GameScreen from './screens/GameScreen';
import WinnerScreen from './screens/WinnerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Seleccion" screenOptions={{ headerShown: false }}>
        
        <Stack.Screen 
          name="Seleccion" 
          component={SelectionScreen} 
        />
        
        <Stack.Screen 
          name="Juego" 
          component={GameScreen} 
        />

        <Stack.Screen 
          name="Ganador" 
          component={WinnerScreen} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}