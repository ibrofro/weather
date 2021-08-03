import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Test1 from './Test1';
import Test2 from './Test2';

export const ForegroundContext = React.createContext(
  {} as {
    foregroundState: {state:boolean};
    setForegroundState: Function;
    appStateObj: {previousState: string; nextState: string};
  },
);
const AppStateExample = () => {
  const [foregroundState, setForegroundState] = useState({state:false});
  const Stack = createStackNavigator();
  const currentState = useRef(AppState.currentState);
  const appStateObj = useRef({} as {previousState: string; nextState: string});
  function handleChange(nextState: any) {
    console.log('----------TestParent----------');
    console.log('previousState: ' + currentState.current);
    console.log('nextState: ' + nextState);
    if (
      currentState.current === 'inactive' ||
      (currentState.current === 'background' && nextState === 'active')
    ) {
      console.log('App is in the foreground');
      currentState.current = nextState;
      setForegroundState({state:true});
    }
    appStateObj.current = {
      previousState: currentState.current,
      nextState: nextState,
    };
    currentState.current = nextState;
   

  }

  useEffect(() => {
    AppState.addEventListener('change', handleChange);

    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <ForegroundContext.Provider
      value={{
        foregroundState: foregroundState,
        setForegroundState: setForegroundState,
        appStateObj: appStateObj.current,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Test1"
            options={{headerShown: false}}
            component={Test1}
          />
          <Stack.Screen
            name="Test2"
            options={{headerShown: false}}
            component={Test2}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ForegroundContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStateExample;
