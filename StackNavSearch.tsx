import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchResultScreen from './SearchResultScreen';
import MyWeatherScreen from './MyWeatherScreen';

export const SearchContext = React.createContext(
  {} as {searchString: string | null; setSearchString: Function},
);
export default function StackNavSearch() {
  const [searchString, setSearchString] = useState<string | null>(null);
  const Stack = createStackNavigator();
  return (
    <SearchContext.Provider value={{searchString, setSearchString}}>
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
    </SearchContext.Provider>
  );
}

const styles = StyleSheet.create({});
