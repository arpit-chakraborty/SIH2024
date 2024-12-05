import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import CustomDrawerContent from '../components/CustomDrawerContent';

export type DrawerParamList = {
  Home: undefined;
  ChatStack: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppStack2 = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#FFD700',
            width: 250,
          },
        drawerPosition: 'right',
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
  );
};

export default AppStack2;