import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import {StyleSheet, Text, View, ScrollView, AppState} from 'react-native';
import WeatherApiClass from './classes/WeatherApiClass';
import MapIcon from './assets/icons/map.svg';
import * as Location from 'expo-location';
import * as enums from './enums';
import IconExchanger from './components/IconExchanger';
import MoreInfo from './components/MoreInfo';
import Header from './components/Header';
import Suggestion from './components/Suggestion';

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
import {
  MoreInfoEveningStyle,
  svgParamsMoreInfoEvening,
} from './styles/moreInfoEveningStyle';
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
  const [morningOrEvening, setMorningOrEvening] = useState<
    'morning' | 'evening'
  >("morning");
  const [error, setError] = useState<string>('');
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

  

 
  useLayoutEffect(() => {
    const icon = weatherAndForecastData?.weatherData?.current?.weather[0]?.icon;
    console.log(icon && icon.indexOf('d') > -1);
    if (icon && icon.indexOf('d') > -1) {
      setMorningOrEvening('morning');
    } else {
      setMorningOrEvening('evening');
    }
  });
  
  return (
    <>
      {weatherAndForecastData ? (
        <Header
          styles={headerMorningStyle}
          svgParams={svgParamsHeaderMorning}
          statusBarOption={statusBarOption}
          searchString={searchString}
          setSearchString={setSearchString}
        />
      ) : null}

      {searchString ? (
        <View
          style={
            morningOrEvening === 'morning'
              ? {backgroundColor: enums.Colors.white}
              : {backgroundColor: enums.Colors.blue}
          }>
          <Suggestion
            style={suggestionMorningStyle}
            svgParams={svgParamsSuggestionMorning}
            searchString={searchString}
            setSearchString={setSearchString}
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
        style={
          morningOrEvening == 'morning'
            ? styles.scrollViewStyle
            : styles.scrollViewStyleEvening
        }>
        <View style={styles.locationContainer}>
          <MapIcon
            fill={
              morningOrEvening == 'morning'
                ? enums.Colors.blue
                : enums.Colors.white
            }
            height={'25'}
          />
          <Text
            style={
              morningOrEvening === 'morning'
                ? styles.locationText
                : {...styles.locationText, ...{color: enums.Colors.white}}
            }>
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
              style={
                morningOrEvening === 'morning'
                  ? styles.dateDayStyle
                  : {...styles.dateDayStyle, ...{color: enums.Colors.white}}
              }>
              {weatherAndForecastData
                ? dateIns.getDate(
                    weatherAndForecastData.weatherData.current.dt +
                      weatherAndForecastData.weatherData.timezone_offset,
                  ).day
                : null}
            </Text>
            <Text
              style={
                morningOrEvening === 'morning'
                  ? styles.dateMonthStyle
                  : {...styles.dateMonthStyle, ...{color: enums.Colors.white}}
              }>
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
            style={
              morningOrEvening === 'morning'
                ? styles.separatorStyle
                : {
                    ...styles.separatorStyle,
                    ...{borderColor: enums.Colors.white},
                  }
            }></View>
          {/* Separator */}

          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={
                  morningOrEvening === 'morning'
                    ? styles.weatherDigitStyle
                    : {
                        ...styles.weatherDigitStyle,
                        ...{color: enums.Colors.white},
                      }
                }>
                {weatherAndForecastData
                  ? Math.trunc(
                      weatherAndForecastData.weatherData.current.temp,
                    ) + '°'
                  : null}
              </Text>
              <Text
                style={
                  morningOrEvening === 'morning'
                    ? styles.celciusStyle
                    : {
                        ...styles.celciusStyle,
                        ...{color: enums.Colors.white},
                      }
                }>
                C
              </Text>
            </View>
            <Text
              style={
                morningOrEvening === 'morning'
                  ? styles.nightTextStyle
                  : {
                      ...styles.nightTextStyle,
                      ...{color: enums.Colors.white},
                    }
              }>
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
          style={
            morningOrEvening === 'morning'
              ? styles.separatorHorizontalStyle
              : {
                  ...styles.separatorHorizontalStyle,
                  ...{borderColor: enums.Colors.white},
                }
          }></View>

        {/* More Info */}
        {weatherAndForecastData ? (
          <MoreInfo
            data={weatherAndForecastData.weatherData}
            svgParams={
              morningOrEvening === 'morning'
                ? svgParamsMoreInfoMorning
                : svgParamsMoreInfoEvening
            }
            style={
              morningOrEvening === 'morning'
                ? MoreInfoMorningStyle
                : MoreInfoEveningStyle
            }
          />
        ) : null}

        <View
          style={
            morningOrEvening === 'morning'
              ? styles.separatorHorizontalStyle2
              : {
                  ...styles.separatorHorizontalStyle2,
                  ...{borderColor: enums.Colors.white},
                }
          }></View>

        {/* Forecast Data */}
        <View style={styles.forecastContainerStyle}>
          {weatherAndForecastData ? (
            <Forecast
              style={forecastStyle}
              data={weatherAndForecastData.filteredForecast}
              morningOrEvening={morningOrEvening}
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
  scrollViewStyleEvening: {
    height: '20%',
    width: '100%',
    backgroundColor: enums.Colors.blue,
  },
  contentContainerStyle: {
    padding: 30,
    paddingBottom: 200,
  },
  dateDayStyle: {
    color: enums.Colors.blue,
    fontFamily: enums.Fonts.bold,
    fontSize: 16,
  },
  celciusStyle: {
    color: enums.Colors.blue,
    fontFamily: enums.Fonts.regular,
    fontSize: 32,
  },
  nightTextStyle: {
    fontFamily: enums.Fonts.regular,
    fontSize: 16,
    marginTop: -6,
    color: enums.Colors.blue,
  },
  weatherDigitStyle: {
    color: enums.Colors.blue,
    fontFamily: enums.Fonts.extraBold,
    fontSize: 32,
  },
  separatorStyle: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: enums.Colors.blue,
    marginLeft: 15,
    marginRight: 15,
  },

  separatorHorizontalStyle: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: enums.Colors.blue,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
  separatorHorizontalStyle2: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: enums.Colors.blue,
    marginTop: 0,
    marginBottom: 15,
    alignSelf: 'center',
  },
  dateMonthStyle: {
    color: enums.Colors.blue,
    fontFamily: enums.Fonts.regular,
    fontSize: 16,
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
    color: enums.Colors.blue,
  },
  iconContainer: {
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  forecastContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 25,
  },
});
