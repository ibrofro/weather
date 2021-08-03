import React, {useEffect, useReducer, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import Morning from './MorningScreen';
import Evening from './EveningScreen';
import SplashScreen from './SplashScreen';
import {
  weatherResponseType,
  forecastWeatherType,
  filteredForecastWeatherType,
} from './types';
export const connState = React.createContext({} as contextInterface);

interface contextInterface {
  state: stateInterface;
  dispatch: Function;
  foregroundState: {state: boolean};
  setForegroundState: Function;
  weatherData: weatherResponseType | undefined;
  setWeatherData: Function;
  filteredForecast: undefined | filteredForecastWeatherType;
  weatherAndForecastData:{weatherData:weatherResponseType,filteredForecast:filteredForecastWeatherType} | undefined, 
  setWeatherAndForecastData:Function,
  setFilteredForecast: Function;
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
        weatherData: weatherResponseType;
        filteredForecast: filteredForecastWeatherType;
      }
    | undefined
  >();
  const currentState = useRef(AppState.currentState);

  function handleChange(nextState: any) {
    console.log('----------AppState on App.tsx----------');
    console.log('previousState: ' + currentState.current);
    console.log('nextState: ' + nextState);
    if (
      currentState.current === 'inactive' ||
      (currentState.current === 'background' && nextState === 'active')
    ) {
      console.log('App is in the foreground');
      currentState.current = nextState;
      setForegroundState({state: true});
    }
    currentState.current = nextState;
  }
  // useEffect(() => {
  //   AppState.addEventListener('change', handleChange);

  //   return () => {
  //     AppState.removeEventListener('change', handleChange);
  //   };
  // }, []);
  useEffect(() => {
    // console.log('From App:' + JSON.stringify(state));
    // console.log('From App weatherData ' + JSON.stringify(weatherData));
    // console.log(
    // 'From App (filteredForecast)' + JSON.stringify(filteredForecast),
    // );
  });
  return (
    <connState.Provider
      value={{
        state,
        dispatch,
        foregroundState,
        setForegroundState,
        setFilteredForecast,
        filteredForecast,
        setWeatherData,
        weatherData,
        weatherAndForecastData,
        setWeatherAndForecastData
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.connectionStatus === 'connected' &&
          weatherAndForecastData &&
          weatherAndForecastData.weatherData.weather[0].icon.indexOf('d') ? (
            <Stack.Screen
              name="Morning"
              options={{headerShown: false}}
              component={Morning}
            />
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
          {/* {state.connectionStatus === 'checking-connection-status' ? (
            <Stack.Screen
              name="SplashScreen"
              options={{headerShown: false}}
              component={SplashScreen}
            />
          ) : null}
          {state.connectionStatus === 'not-connected' ? (
            <Stack.Screen
              name="LoginScreen"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          ) : null} */}

          {/* {state.connectionStatus === 'connected' ? (
          ) : null} */}
          {/* {state.connected === 'loading' ? (
            <Stack.Screen
              name="LoadingScreen"
              options={{headerShown: false}}
              component={LoadingScreen}
            />
          ) : null}
          {state.connected === true && weatherData !== undefined ? (
            <>
              <Stack.Screen
                name="LoadingScreen"
                options={{headerShown: false}}
                component={LoadingScreen}
              />
              
            </>
          ) : null}

          {state.connected === true &&
          weatherData?.weather[0].icon.indexOf('d') !== -1
           ? (
            <Stack.Screen
              name="Morning"
              options={{headerShown: false}}
              component={Morning}
              initialParams={{
                weatherData: weatherData,
                filteredForecast: filteredForecast,
              }}
            />
          ) : state.connected === true &&
            weatherData?.weather[0].icon.indexOf('n')  ? (
            <Stack.Screen
              name="Evening"
              options={{headerShown: false}}
              component={Evening}
            />
          ) : null}

          {state.connected === false ? (
            <Stack.Screen
              name="LoginScreen"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          ) : null} */}
        </Stack.Navigator>
      </NavigationContainer>
    </connState.Provider>
  );
}
export default App;
