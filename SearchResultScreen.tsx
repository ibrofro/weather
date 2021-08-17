import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import WeatherApiClass from './classes/WeatherApiClass';
import MapIcon from './assets/icons/map.svg';
import * as enums from './enums';
import IconExchanger from './components/IconExchanger';
import MoreInfo from './components/MoreInfo';
import {SearchContext} from './StackNavSearch';
import TimeClass from './classes/TimeClass';
import Forecast from './components/Forecast';
import {forecastStyle} from './styles/forecastStyle';
import {format, fromUnixTime} from 'date-fns';

import {
  MoreInfoMorningStyle,
  svgParamsMoreInfoMorning,
} from './styles/moreInfoMorningStyle';
import {
  MoreInfoEveningStyle,
  svgParamsMoreInfoEvening,
} from './styles/moreInfoEveningStyle';
import * as types from './types';
export default function SearchResultScreen({route}: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherAndForecastData, setWeatherAndForecastData] =
    useState<types.weatherAndForecastDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [morningOrEvening, setMorningOrEvening] = useState<
    'morning' | 'evening'
  >('morning');

  const dateIns = new TimeClass();

  const formatTime = (time: number, timezoneOffset: number) => {
    const goodTime = format(
      fromUnixTime(Number(time + timezoneOffset)),
      'HH:mm ',
    );
    return goodTime;
  };
  let {setSearchString, searchString} = useContext(SearchContext);

  const SearchStatus = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading the weather...</Text>
          <ActivityIndicator size={'large'} color={enums.Colors.blue} />
        </View>
      </View>
    );
  };

  const Error = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  };
  useLayoutEffect(() => {
    setSearchString(null);
  });
  useEffect(() => {
    (async () => {
      try {
        const ins = new WeatherApiClass(
          route.params.lon,
          route.params.lat,
          'metric',
        );
        const weatherAndForecastData = await ins.getWeatherAndForecastData();
        const weather = ins.filterRawToWeatherData(weatherAndForecastData);
        const filteredForecastWeather = ins.filterRawToForecastData(
          weatherAndForecastData,
        );
        console.log(JSON.stringify(weather));
        console.log(JSON.stringify(filteredForecastWeather));
        const icon = weather.current.weather[0].icon;

        setMorningOrEvening(icon.indexOf('d') > -1 ? 'morning' : 'evening');
        setLoading(false);
        setError(null);
        setWeatherAndForecastData({
          weatherData: weather,
          filteredForecast: filteredForecastWeather,
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError('Error while getting the weather');
      }
    })();
  }, []);
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <SearchStatus />;
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={
          morningOrEvening == 'morning'
            ? styles.scrollViewStyle
            : styles.scrollViewStyleEvening
        }>
        {weatherAndForecastData ? (
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontFamily: enums.Fonts.bold,
              position: 'relative',
              left: 5,
            }}>
            it's{' '}
            {formatTime(
              weatherAndForecastData?.weatherData.current.dt,
              weatherAndForecastData?.weatherData.timezone_offset,
            )}{' '}
            at
          </Text>
        ) : null}
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
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingContainer: {
    backgroundColor: enums.Colors.gray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    padding: 20,
  },
  loadingText: {
    fontFamily: enums.Fonts.regular,
    color: enums.Colors.blue,
  },
  errorText: {
    fontFamily: enums.Fonts.regular,

    color: 'red',
  },
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
