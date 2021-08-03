import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import Logo from './Logo';
import {connState} from './App';
import * as enums from './enums';
import UserClass from './classes/UserClass';
import * as Location from 'expo-location';
import WeatherApiClass from './classes/WeatherApiClass';
export default function SplashScreen({navigation}: any) {
  const {state, dispatch, setFilteredForecast, setWeatherData} =
    useContext(connState);

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

  // Disconnect the user.
  const disconnect = async () => {
    try {
      const userIns = new UserClass();
      const disconnected = await userIns.disconnect();
      console.log('Disconnected ' + disconnected);
      dispatch({type: 'disconnect'});
    } catch (error) {
      console.log('not disconnected ' + error);
      dispatch({type: 'disconnect'});
    }
  };

  useEffect(() => {
    (async () => {
      if (state.connectionStatus === "checking-connection-status") {
        await checkConnStatus();
      }
    })();
  });

  return (
    <View style={styles.screenStyle}>
      <View style={styles.bigContainer}>
        <TouchableOpacity
          onPress={() => {
            disconnect();
          }}>
          <Text style={{color: 'white'}}>Disconnect</Text>
        </TouchableOpacity>
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
        <View style={{marginBottom: 10}}>
          <Text style={{color: 'white', fontFamily: enums.Fonts.regular}}>
            Checking connection status...
          </Text>
        </View>
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
