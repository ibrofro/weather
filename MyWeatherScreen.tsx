import React, {useEffect, useState, useContext, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, AppState} from 'react-native';
import WeatherApiClass from './classes/WeatherApiClass';
import MapIcon from './assets/icons/map.svg';
import * as Location from 'expo-location';
import * as enums from './enums';
import IconExchanger from './components/IconExchanger';
import MoreInfo from './components/MoreInfo';
import Header from './components/Header';
import Suggestion from './components/Suggestion';
import {
  weatherResponseType,
  forecastWeatherType,
  filteredForecastWeatherType,
} from './types';
import TimeClass from './classes/TimeClass';
import Forecast from './components/Forecast';
import {forecastStyle} from './styles/forecastStyle';
import {connState} from './App';
import {
  headerMorningStyle,
  statusBarOption,
  svgParamsHeaderMorning,
} from './styles/headerMorningStyle';
import {
  suggestionMorningStyle,
  svgParamsSuggestionMorning,
} from './styles/suggestionMorningStyle';

import {
  MoreInfoMorningStyle,
  svgParamsMoreInfoMorning,
} from './styles/moreInfoMorningStyle';
export default function MyWeather({route, navigation}: any) {
  let {
    foregroundState,
    setForegroundState,
    weatherAndForecastData,
    setWeatherAndForecastData,
  } = useContext(connState);

  const firstMount = useRef(false);
  const isMounted = useRef(false);
  const [searchString, setSearchString] = useState<string | null>(null);

  // const [weather, setWeather] = useState<weatherResponseType>(
  //   route.params.weather,
  // );
  // const [forecastWeather, setForecastWeather] = useState<forecastWeatherType>(
  //   route.params.forecastWeather,
  // );
  // const [filteredForecast, setFilteredForecast] =
  //   useState<filteredForecastWeatherType>(route.params.filteredForecastWeather);
  const [error, setError] = useState<string>('');
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const dateIns = new TimeClass();
  const getCoords = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
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

  const updateWeather = async () => {
    // try {
    //   const {granted} = await Location.getForegroundPermissionsAsync();
    //   if (granted) {
    //     const location = await Location.getCurrentPositionAsync({
    //       accuracy: 6,
    //     });
    //     console.log(location);
    //     const longitude = location.coords.longitude;
    //     const latitude = location.coords.latitude;
    //     const ins = new WeatherApiClass(
    //       String(longitude),
    //       String(latitude),
    //       'metric',
    //     );
    //     // Get the weather data.
    //     const weather = await ins.getWeather();
    //     const icon = weather.weather[0].icon;
    //     console.log('weather ==> ' + JSON.stringify(weather));
    //     // Get forecast weather
    //     const rawForecastWeather = await ins.getForecastWeather();
    //     let filteredForecastWeather =
    //       ins.filterForecastData(rawForecastWeather);
    //     // Stay or go to evening screen
    //     // with weather data.
    //     if (icon.indexOf('n') !== -1) {
    //       if (isMounted.current) {
    //         navigation.navigate('Evening', {
    //           weather: weather,
    //           filteredForecastWeather: filteredForecastWeather,
    //         });
    //       }
    //     } else {
    //       if (isMounted.current) {
    //         setWeatherData(weather);
    //         setFilteredForecast(filteredForecastWeather);
    //         console.log('Weather updated due to AppState Change...');
    //       }
    //     }
    //   } else {
    //     if (isMounted.current) {
    //       setError("Can't get your location");
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (isMounted.current) {
    //     setError('Error while retrieving the weather');
    //   }
    // }
  };

  useEffect(() => {
    firstMount.current = true;
    isMounted.current = true;

    return () => {
      firstMount.current = false;
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // console.log("From MorningScreen")
    // console.log(weatherData)
    // if (isMounted.current) {
    //   if (firstMount.current) {
    //     firstMount.current = false;
    //     // return setForegroundState({state: false});
    //     return;
    //   }
    //   if (firstMount.current === false && foregroundState.state === true) {
    //     updateWeather();
    //     if (isMounted.current) {
    //       setForegroundState({state: false});
    //     }
    //   }
    // }
    // console.log("WeatherAndForecastData=> "+JSON.stringify(weatherAndForecastData));
  });

  return (
    <>
      <Header
        styles={headerMorningStyle}
        svgParams={svgParamsHeaderMorning}
        statusBarOption={statusBarOption}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      {console.log('typeOF => ' + typeof searchString)}

      {searchString ? (
        <View style={{backgroundColor: 'white'}}>
          <Suggestion
            style={suggestionMorningStyle}
            svgParams={svgParamsSuggestionMorning}
            searchString={searchString}
          />
        </View>
      ) : null}

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
          <MapIcon fill={enums.Colors.blue} height={'25'} />
          <Text style={styles.locationText}>
            {weatherAndForecastData
              ? weatherAndForecastData.weatherData.timezone
              : null}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <IconExchanger
            name={
              weatherAndForecastData
                ? weatherAndForecastData.weatherData.current.weather[0].icon
                : '01n'
            }
            dayColor={enums.Colors.blue}
            nightColor={enums.Colors.blue}
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
                color: enums.Colors.blue,
                fontFamily: enums.Fonts.bold,
                fontSize: 16,
              }}>
              {weatherAndForecastData
                ? dateIns.getDate(
                    weatherAndForecastData.weatherData.current.dt +
                      weatherAndForecastData.weatherData.timezone_offset,
                  ).day
                : null}
            </Text>
            <Text
              style={{
                color: enums.Colors.blue,
                fontFamily: enums.Fonts.regular,
                fontSize: 16,
              }}>
              {weatherAndForecastData
                ? dateIns.getDate(
                    weatherAndForecastData.weatherData.current.dt +
                      weatherAndForecastData.weatherData.timezone_offset,
                  ).month
                : null}{' '}
              {weatherAndForecastData
                ? dateIns.getDate(
                    weatherAndForecastData.weatherData.current.dt +
                      weatherAndForecastData.weatherData.timezone_offset,
                  ).dayNum
                : null}
            </Text>
          </View>
          {/* Separator */}
          <View
            style={{
              height: '100%',
              borderWidth: 0.5,
              borderColor: enums.Colors.blue,
              width: 1,
              marginLeft: 15,
              marginRight: 15,
            }}></View>
          {/* Separator */}

          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: enums.Colors.blue,
                  fontFamily: enums.Fonts.extraBold,
                  fontSize: 32,
                }}>
                {weatherAndForecastData
                  ? Math.trunc(
                      weatherAndForecastData.weatherData.current.temp,
                    ) + '°'
                  : null}
              </Text>
              <Text
                style={{
                  color: enums.Colors.blue,
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
              }}>
              around{' '}
              {weatherAndForecastData
                ? Math.trunc(
                    weatherAndForecastData.filteredForecast.firstDay.temp.night,
                  )
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
            borderColor: enums.Colors.blue,
            marginTop: 15,
            marginBottom: 15,
            alignSelf: 'center',
          }}></View>

        {/* More Info */}
        {weatherAndForecastData ? (
          <MoreInfo
            data={weatherAndForecastData.weatherData}
            svgParams={svgParamsMoreInfoMorning}
            style={MoreInfoMorningStyle}
          />
        ) : null}

        <View
          style={{
            width: '100%',
            borderWidth: 0.5,
            borderColor: enums.Colors.blue,
            marginTop: 0,
            marginBottom: 15,
            alignSelf: 'center',
          }}></View>

        {/* Forecast Data */}
        <View
          style={styles.forecastContainerStyle}>
          {weatherAndForecastData ? (
            <Forecast
              style={forecastStyle}
              data={weatherAndForecastData.filteredForecast}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    height: '20%',
    width: '100%',
    backgroundColor: enums.Colors.white,
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
  },
  iconContainer: {
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  forecastContainerStyle:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom:25,
  }
});
