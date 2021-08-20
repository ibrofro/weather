import React, {useEffect, useReducer, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import DrawNav from './DrawNav';
import Evening from './EveningScreen';
import SplashScreen from './SplashScreen';
import ProfileScreen from './ProfileScreen';
import AboutScreen from './AboutScreen';
import Header from './components/Header';
import {
  weatherResponseType,
  forecastWeatherType,
  filteredForecastWeatherType,
  weatherDataFilteredType,
} from './types';
import sub from 'date-fns/sub';
export const connState = React.createContext({} as contextInterface);

interface contextInterface {
  state: stateInterface;
  dispatch: Function;
  foregroundState: {state: boolean};
  setForegroundState: Function;

  weatherAndForecastData:
    | {
        weatherData: weatherDataFilteredType;
        filteredForecast: filteredForecastWeatherType;
      }
    | undefined;
  setWeatherAndForecastData: Function;
}
interface stateInterface {
  connectionStatus:
    | 'connected'
    | 'not-connected'
    | 'checking-connection-status';
}

interface actionInterface {
  type: 'connect' | 'disconnect' | 'checking';
}

const reducer = (
  state: stateInterface,
  action: actionInterface,
): stateInterface => {
  switch (action.type) {
    case 'connect':
      if (state.connectionStatus !== 'connected') {
        return {connectionStatus: 'connected'};
      }
      break;

    case 'disconnect':
      if (state.connectionStatus !== 'not-connected') {
        return {connectionStatus: 'not-connected'};
      }
      break;

    case 'checking':
      if (state.connectionStatus !== 'checking-connection-status') {
        return {connectionStatus: 'checking-connection-status'};
      }
      break;
  }
  return state;
};
function App() {
  const Stack = createStackNavigator();
  const [state, dispatch] = useReducer(reducer, {
    connectionStatus: 'checking-connection-status',
  });
  const [foregroundState, setForegroundState] = useState({state: false});
  const [filteredForecast, setFilteredForecast] = useState<
    filteredForecastWeatherType | undefined
  >(undefined);
  const [weatherData, setWeatherData] = useState<
    weatherResponseType | undefined
  >(undefined);

  const [weatherAndForecastData, setWeatherAndForecastData] = useState<
    | {
        weatherData: weatherDataFilteredType;
        filteredForecast: filteredForecastWeatherType;
      }
    | undefined
  >();
  const currentState = useRef(AppState.currentState);
  const backgroundTime = useRef<null | number>(null);
  function handleChange(nextState: any) {
    // console.log('----------AppState on App.tsx----------');
    // console.log('previousState: ' + currentState.current);
    // console.log('nextState: ' + nextState);
    if (
      // currentState.current === 'inactive' ||
      currentState.current === 'background' &&
      nextState === 'active'
    ) {
      console.log('App is in the foreground');
      currentState.current = nextState;
      let now = Math.round(Date.now() / 1000);
      if (backgroundTime.current !== null) {
        const diff = now - backgroundTime.current;
        console.log('difference ' + diff);
        if(diff > 600){
          setWeatherAndForecastData(undefined)
          
        }
      }
    }

    if (currentState.current === 'active' && nextState === 'background') {
      let time = Math.round(Date.now() / 1000);

      backgroundTime.current = time;
      console.log('You going to background at ' + time);
    }
    currentState.current = nextState;
  }
  useEffect(() => {
    AppState.addEventListener('change', handleChange);

    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);
  
  return (
    <connState.Provider
      value={{
        state,
        dispatch,
        foregroundState,
        setForegroundState,
        weatherAndForecastData,
        setWeatherAndForecastData,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.connectionStatus === 'connected' && weatherAndForecastData ? (
            <>
              <Stack.Screen
                name="DrawNav"
                options={{headerShown: false}}
                component={DrawNav}
              />
            </>
          ) : null}

          {state.connectionStatus === 'not-connected' ? (
            <Stack.Screen
              name="LoginScreen"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          ) : null}

          {state.connectionStatus === 'checking-connection-status' ||
          (state.connectionStatus === 'connected' &&
            weatherAndForecastData == undefined) ? (
            <Stack.Screen
              name="LoadingScreen"
              options={{headerShown: false}}
              component={LoadingScreen}
            />
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    </connState.Provider>
  );
}
export default App;
