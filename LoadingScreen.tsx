import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import Logo from './Logo';
import {connState} from './App';
import * as enums from './enums';
import UserClass from './classes/UserClass';
import * as Location from 'expo-location';
import WeatherApiClass from './classes/WeatherApiClass';
export default function LoadingScreen({navigation}: any) {
  const {
    state,
    dispatch,

    setWeatherAndForecastData,
  } = useContext(connState);
  type waydType =
    | 'checking-connection-status'
    | 'getting-location'
    | 'getting-permission'
    | 'loading'
    | 'getting-weather-data'
    | 'getting-the-position';
  const [whatAreYouDoing, setWhatAreYouDoing] = useState<waydType>('loading');

  const [error, setError] = useState<string | null>(null);

  // Check if user is connected.
  const checkConnStatus = async () => {
    const userIns = new UserClass();
    try {
      const registered = await userIns.registered();
      console.log('registered ' + registered);
      if (registered) {
        dispatch({type: 'connect'});
      } else {
        dispatch({type: 'disconnect'});
      }
    } catch (error) {
      console.log('not registered ' + error);
      dispatch({type: 'disconnect'});
    }
  };

  const getCoords = async () => {
    try {
      setWhatAreYouDoing('getting-permission');
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setWhatAreYouDoing('getting-location');
        const location = await Location.getCurrentPositionAsync({accuracy: 6});
        return location;
      } else {
        console.log('denied');
        setError("You didn't allow us to get your location");
      }
    } catch (error) {
      console.log(error);
      setError('Error while fetching the location');
    }
  };

  useEffect(() => {
    console.log('From LoadingScreen:' + JSON.stringify(state));
    setError(null);
    (async () => {
      // On start we check if the user was previously connected
      // or not.
      if (state.connectionStatus === 'checking-connection-status') {
        setWhatAreYouDoing('checking-connection-status');
        checkConnStatus();
      }
      // If the user is connected.
      if (state.connectionStatus === 'connected') {
        // Get the coordinates.
        const coords = await getCoords();
        const longitude = coords?.coords.longitude;
        const latitude = coords?.coords.latitude;

        // Get the weather data.
        try {
          const ins = new WeatherApiClass(
            String(longitude),
            String(latitude),
            // "135.98333",
            // "33.73333",
            // '54.39696',
            // '24.45118',
            'metric',
          );
          setWhatAreYouDoing('getting-the-position');
          const place = await ins.getPlace();
          setWhatAreYouDoing('getting-weather-data');
          const weatherAndForecastData = await ins.getWeatherAndForecastData();
          const weather = ins.filterRawToWeatherData(weatherAndForecastData);
          const filteredForecastWeather = ins.filterRawToForecastData(
            weatherAndForecastData,
          );
          // console.log(JSON.stringify(place.display_name));
          // console.log(JSON.stringify(weather));
          // console.log(JSON.stringify(filteredForecastWeather));

          // return false;
          setWeatherAndForecastData({
            weatherData: {...weather, ...{location: place.display_name}},
            filteredForecast: filteredForecastWeather,
          });
        } catch (error) {
          console.log(error);
          setError('Error while getting the weather');
        }

        // Get the Weather from the server.
      }
    })();
  }, [state.connectionStatus]);
  const getProperWaydText = (whatAreYouDoing: waydType) => {
    switch (whatAreYouDoing) {
      case 'getting-location':
        return `Retrieving your location...`;
      case 'getting-permission':
        return `Checking the permission...`;

      case 'getting-weather-data':
        return `Getting weather data...`;

      case 'getting-the-position':
        return `Getting your position...`;
      case 'checking-connection-status':
        return `Check the connection status...`;
      default:
        return `Loading...`;
    }
  };
  return (
    <View style={styles.screenStyle}>
      <View style={styles.bigContainer}>
        <Logo width={150} height={150} fill="white" />
        {error === null ? (
          <View style={{height: 30, marginTop: 15}}>
            <BallIndicator color="white" size={25} />
          </View>
        ) : null}

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        {state.connectionStatus === 'connected' && error === null ? (
          <View style={{marginBottom: 10}}>
            <Text style={{color: 'white', fontFamily: enums.Fonts.regular}}>
              {getProperWaydText(whatAreYouDoing)}
            </Text>
          </View>
        ) : null}

       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: '#313745',
    flex: 1,
  },
  bigContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  errorText: {
    fontFamily: enums.Fonts.regular,
    color: '#F86F6F',
    fontSize: 14,
  },
});
