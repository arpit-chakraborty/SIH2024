import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Signup from '../screens/Signup'
import Login from '../screens/Login'
import Landing from '../screens/Landing'
import Terms from '../screens/Terms'

export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    Landing: undefined;
    Terms: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Landing'>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Terms" component={Terms} />
    </Stack.Navigator>
  );
}