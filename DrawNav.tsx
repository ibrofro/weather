import React, {useEffect} from 'react';
import AboutScreen from './AboutScreen';
import ProfileScreen from './ProfileScreen';
import MyWeatherScreen from './MyWeatherScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavSearch from './StackNavSearch';
export default function DrawNav() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="StackNavSearch"
        options={{headerShown: false}}
        component={StackNavSearch}
      />
      <Drawer.Screen
        name="ProfileScreen"
        options={{headerShown: false}}
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="AboutScreen"
        options={{headerShown: false}}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
}
