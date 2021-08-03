import React, {useState, useEffect,createContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Test4 from './Test4';
import Test7 from './Test7';

export const LocationContext = React.createContext(
  {} as {
    country: string;
    city: string;
    setCountry: Function;
    setCity: Function;
  },
);

function Test5() {
  const Stack = createStackNavigator();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  useEffect(()=>{
    console.log("Something change here")
  })
  return (
    <LocationContext.Provider
      value={{
        country: country,
        city: city,
        setCountry: setCountry,
        setCity: setCity,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Test4"
            options={{headerShown: false}}
            component={Test4}
          />
          <Stack.Screen
            name="Test7"
            options={{headerShown: false}}
            component={Test7}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationContext.Provider>
  );
}
export default Test5;
const styles = StyleSheet.create({});
