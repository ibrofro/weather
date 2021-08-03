import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, AppState} from 'react-native';
import WeatherApiClass from './classes/WeatherApiClass';
import IconExchanger from './components/IconExchanger';
import MapIcon from './assets/icons/map.svg';
import * as Location from 'expo-location';
import * as enums from './enums';
import {
  weatherResponseType,
  forecastWeatherType,
  filteredForecastWeatherType,
} from './types';
import TimeClass from './classes/TimeClass';
import ForecastOneDay from './components/ForecastOneDay';
import {forecastEveningStyle} from './styles/forecastEveningStyle';

export default function EveningScreen({route, navigation}: any) {
  const [weather, setWeather] = useState<weatherResponseType>(
    route.params.weather,
  );
  // const [forecastWeather, setForecastWeather] = useState<forecastWeatherType>(
  //   route.params.forecastWeather,
  // );
  const [filteredForecast, setFilteredForecast] =
    useState<filteredForecastWeatherType>(route.params.filteredForecastWeather);
  const [error, setError] = useState<string>('');
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [foreground, setForeground] = useState<boolean>(false);
  const dateIns = new TimeClass();
  const getCoords = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({accuracy: 6});
        console.log(location);
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

  const _handleAppStateChange = (nextAppState: any) => {
    // if (
    //   appState.current.match(/inactive|background/) &&
    //   nextAppState === 'active'
    // ) {
    //   console.log('App has come to the foreground!');
    //   setForeground(true);
    // } else {
    //   setForeground(false);
    // }
    console.log('App is in the foreground');
    setForeground(true);

    // appState.current = nextAppState;
    // setAppStateVisible(appState.current);
    // console.log('AppState', appState.current);
  };
  useEffect(() => {
    if (foreground) {
      setError('');

      (async () => {
        // Get coordinates
        const coords = await getCoords();
        const longitude = coords?.coords.longitude;
        const latitude = coords?.coords.latitude;

        try {
          const ins = new WeatherApiClass(
            String(longitude),
            String(latitude),
            'metric',
          );
          
          // Get the weather data.
          const weather = await ins.getWeather();
          const icon = weather.weather[0].icon;

          // Get forecast weather
          const rawForecastWeather = await ins.getForecastWeather();
          let filteredForecastWeather =
            ins.filterForecastData(rawForecastWeather);

          // Stay or go to evening screen
          // with weather data.
          console.log("Evening stuff")
          if (icon.indexOf('n') !== -1) {
              setWeather(weather);
              setFilteredForecast(filteredForecastWeather);
            } else {
              navigation.navigate('Morning', {
                weather: weather,
                filteredForecastWeather: filteredForecastWeather,
              });
          }
        } catch (error) {
          console.log(error);
          setForeground(false);
          setError('Error while getting the weather');
        }
        setForeground(false);
      })();
    }
  }, [foreground]);

  useEffect(() => {
    // setWeather(route.params.weather);
    // setForecastWeather(route.params.forecastWeather);
    // setFilteredForecast(route.params.filteredForecastWeather);
    console.log(JSON.stringify(route.params.filteredForecastWeather));

    // const ins = new WeatherApiClass(
    //   '-17.40955352783203',
    //   '14.769736896901634',
    //   'metric',
    // );
    (async () => {
      try {
        // const weather = await ins.getWeather();
        // const icon = weather.weather[0].icon;
        // console.log(icon);
        // console.log(route.params.weather);
      } catch (error) {
        console.log(error);
      }
    })();

    AppState.addEventListener('focus', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('focus', _handleAppStateChange);
    };
  }, []);

  return (
    <>
      {error ? (
        <View
          style={{
            backgroundColor: 'red',
            padding: 3,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: enums.Fonts.regular}}>
            {error}
          </Text>
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.scrollViewStyle}>
        <View style={styles.locationContainer}>
          <MapIcon fill={enums.Colors.white} height={'25'} />
          <Text style={styles.locationText}>
            {weather?.name},{weather?.sys.country}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <IconExchanger
            // name={weather.weather[0].icon}
            name={"02n"}
            dayColor={enums.Colors.blue}
            nightColor={enums.Colors.white}
            height={'100%'}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderColor: 'red',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View style={{paddingTop: 5}}>
            <Text
              style={{
                color: enums.Colors.white,
                fontFamily: enums.Fonts.bold,
                fontSize: 16,
              }}>
              {weather ? dateIns.getDate(weather.dt).day : null}
            </Text>
            <Text
              style={{
                color: enums.Colors.white,
                fontFamily: enums.Fonts.regular,
                fontSize: 16,
              }}>
              {weather ? dateIns.getDate(weather.dt).month : null}{' '}
              {weather ? dateIns.getDate(weather.dt).dayNum : null}
            </Text>
          </View>
          {/* Separator */}
          <View
            style={{
              height: '100%',
              borderWidth: 0.5,
              borderColor: enums.Colors.white,
              width: 1,
              marginLeft: 15,
              marginRight: 15,
            }}></View>
          {/* Separator */}

          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: enums.Colors.white,
                  fontFamily: enums.Fonts.extraBold,
                  fontSize: 32,
                }}>
                {weather ? Math.trunc(weather.main.temp) + '°' : null}
              </Text>
              <Text
                style={{
                  color: enums.Colors.white,
                  fontFamily: enums.Fonts.regular,
                  fontSize: 32,
                }}>
                C
              </Text>
            </View>
            <Text
              style={{
                fontFamily: enums.Fonts.regular,
                fontSize: 16,
                marginTop: -6,
                color:enums.Colors.white
              }}>
              around{' '}
              {filteredForecast
                ? Math.trunc(filteredForecast.tonight.temp)
                : null}
              ° to night
            </Text>
          </View>
        </View>
        {/* Separator */}
        <View
          style={{
            width: '100%',
            borderWidth: 0.5,
            borderColor: enums.Colors.white,
            marginTop: 15,
            marginBottom: 15,
            alignSelf: 'center',
          }}></View>
        {/* Separator */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'column'}}>
            <ForecastOneDay
              style={forecastEveningStyle}
              epochTime={filteredForecast.morningFirst.date}
              morningData={{
                temp: filteredForecast.morningFirst.temp,
                name: filteredForecast.morningFirst.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.white,
                height: '35',
              }}
              afternoonData={{
                temp: filteredForecast.afternoonFirst.temp,
                name: filteredForecast.afternoonFirst.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.blue,
                height: '35',
              }}
            />
          </View>

          <View style={{flexDirection: 'column'}}>
            <ForecastOneDay
              style={forecastEveningStyle}
              epochTime={filteredForecast.morningDayAfter.date}
              morningData={{
                temp: filteredForecast.morningDayAfter.temp,
                name: filteredForecast.morningDayAfter.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.white,
                height: '35',
              }}
              afternoonData={{
                temp: filteredForecast.afternoonDayAfter.temp,
                name: filteredForecast.afternoonDayAfter.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.blue,
                height: '35',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <View style={{flexDirection: 'column'}}>
            <ForecastOneDay
              style={forecastEveningStyle}
              epochTime={filteredForecast.morningThirdDay.date}
              morningData={{
                temp: filteredForecast.morningThirdDay.temp,
                name: filteredForecast.morningThirdDay.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.white,
                height: '35',
              }}
              afternoonData={{
                temp: filteredForecast.afternoonThirdDay.temp,
                name: filteredForecast.afternoonThirdDay.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.blue,
                height: '35',
              }}
            />
          </View>

          <View style={{flexDirection: 'column'}}>
            <ForecastOneDay
              style={forecastEveningStyle}
              epochTime={filteredForecast.morningFourthDay.date}
              morningData={{
                temp: filteredForecast.morningFourthDay.temp,
                name: filteredForecast.morningFourthDay.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.white,
                height: '35',
              }}
              afternoonData={{
                temp: filteredForecast.afternoonFourthDay.temp,
                name: filteredForecast.afternoonFourthDay.icon,
                dayColor: enums.Colors.blue,
                nightColor: enums.Colors.blue,
                height: '35',
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    height: '20%',
    width: '100%',
    backgroundColor: enums.Colors.blue,
  },
  contentContainerStyle: {
    padding: 30,
    paddingBottom: 200,
  },

  locationContainer: {
    alignItems: 'center',
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontFamily: enums.Fonts.bold,
    fontSize: 16,
    color:enums.Colors.white,
  },
  iconContainer: {
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
});
