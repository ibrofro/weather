import React, {useEffect} from 'react';
import AboutScreen from './AboutScreen';
import ProfileScreen from './ProfileScreen';
import MyWeatherScreen from './MyWeatherScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavSearch from './StackNavSearch';
import DrawerContent from './components/DrawerContent';
export default function DrawNav() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="My weather"
        options={{headerShown: false}}
        component={StackNavSearch}
      />
      <Drawer.Screen
        name="Profile"
        options={{headerShown: false}}
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="About"
        options={{headerShown: false}}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
}
