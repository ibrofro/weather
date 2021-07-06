import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WeatherApi from './classes/WeatherApiClass';
import IconExchanger from './IconExchanger';
import MapIcon from './assets/icons/map.svg';
import * as enums from './enums';
export default function MorningScreen() {
  useEffect(() => {
    const ins = new WeatherApi(
      '-17.40955352783203',
      '14.769736896901634',
      'metric',
    );
    (async () => {
      try {
        // const weather = await ins.getWeather();
        // const icon = weather.weather[0].icon;
        // console.log(icon);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  return (
    <View style={styles.screenStyle}>
      <View style={styles.locationContainer}>
        <MapIcon fill={enums.Colors.blue} height={'25'} />
        <Text style={styles.locationText}>Dakar,SN</Text>
      </View>

      <View style={styles.iconContainer}>
        <IconExchanger
          name={'02n'}
          dayColor={enums.Colors.blue}
          nightColor={'orange'}
          height={'100%'}
        />
      </View>
      <Text>This is america</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    // backgroundColor: enums.Colors.blue,
    backgroundColor: enums.Colors.white,
    flex: 1,
    padding: 25,
  },
  locationContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontFamily: enums.Fonts.bold,
    fontSize: 16,
  },
  iconContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
});
