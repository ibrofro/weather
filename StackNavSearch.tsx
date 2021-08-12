import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchResultScreen from './SearchResultScreen';
import MyWeatherScreen from './MyWeatherScreen';

export default function StackNavSearch() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyWeatherScreen"
        options={{headerShown: false}}
        component={MyWeatherScreen}
      />
      <Stack.Screen
        name="SearchResultScreen"
        options={{headerShown: false}}
        component={SearchResultScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
