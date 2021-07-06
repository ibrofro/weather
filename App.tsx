import React, {useEffect, useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import GetInfoScreen from './GetInfoScreen';
import Morning from './MorningScreen';
import Evening from './EveningScreen';

import HomeScreen from './HomeScreen';

interface stateInterface {
  connected: boolean | 'loading';
}

interface actionInterface {
  type: 'connect' | 'disconnect' | 'loading';
}

const initialState: stateInterface = {
  connected: false,
};

const reducer = (
  state: stateInterface,
  action: actionInterface,
): stateInterface => {
  switch (action.type) {
    case 'connect':
      if (state.connected !== true) {
        return {connected: true};
      }
      break;

    case 'disconnect':
      if (state.connected !== false) {
        return {connected: false};
      }
      break;

    case 'loading':
      if (state.connected !== 'loading') {
        return {connected: 'loading'};
      }
      break;
    default:
      return {connected: false};
  }
  return state;
};

function App() {
  const Stack = createStackNavigator();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({type: 'connect'});
    console.log(state);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.connected === 'loading' ? (
          <Stack.Screen
            name="LoadingScreen"
            options={{headerShown: false}}
            component={LoadingScreen}
          />
        ) : null}
        {state.connected === true ? (
          <>
            {/* <Stack.Screen
              name="HomeScreen"
              options={{headerShown: false}}
              component={HomeScreen}
            /> */}
            <Stack.Screen
              name="Morning"
              options={{headerShown: false}}
              component={Morning}
            />
            <Stack.Screen
              name="Evening"
              options={{headerShown: false}}
              component={Evening}
            />
          </>
        ) : null}

        {state.connected === false ? (
          <Stack.Screen
            name="GetInfoScreen"
            options={{headerShown: false}}
            component={GetInfoScreen}
          />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
