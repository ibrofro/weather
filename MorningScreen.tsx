import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import WeatherApiClass from './classes/WeatherApiClass';
import IconExchanger from './components/IconExchanger';
import MapIcon from './assets/icons/map.svg';
import * as enums from './enums';
import {
  weatherResponseType,
  forecastWeatherType,
  filteredForecastWeatherType,
} from './types';
import TimeClass from './classes/TimeClass';
import ForecastOneDay from './components/ForecastOneDay';
import {forecastDayStyle} from './styles/forecastStyle';
export default function MorningScreen({route}: any) {
  const [weather, setWeather] = useState<weatherResponseType>(
    route.params.weather,
  );
  const [forecastWeather, setForecastWeather] = useState<forecastWeatherType>(
    route.params.forecastWeather,
  );
  const [filteredForecast, setFilteredForecast] =
    useState<filteredForecastWeatherType>(route.params.filteredForecastWeather);
  const dateIns = new TimeClass();
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
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.scrollViewStyle}>
      <View style={styles.locationContainer}>
        <MapIcon fill={enums.Colors.blue} height={'25'} />
        <Text style={styles.locationText}>
          {weather?.name},{weather?.sys.country}
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <IconExchanger
          // name={weather ? weather.weather[0].icon : '01d'}
          name={'01d'}
          dayColor={enums.Colors.blue}
          nightColor={'orange'}
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
            {weather ? dateIns.getDate(weather.dt).day : null}
          </Text>
          <Text
            style={{
              color: enums.Colors.blue,
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
              {weather ? Math.round(weather.main.temp) + '°' : null}
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
            {filteredForecast
              ? Math.round(filteredForecast.tonight.temp)
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
      {/* Separator */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <View style={{flexDirection: 'column'}}>
          <ForecastOneDay
            style={forecastDayStyle}
            epochTime={filteredForecast?.morningFirst?.date}
            morningData={{
              temp: filteredForecast?.morningFirst?.temp,
              name: filteredForecast?.morningFirst?.icon,
              dayColor: enums.Colors.blue,
              nightColor: enums.Colors.white,
              height: '35',
            }}
            afternoonData={{
              temp: filteredForecast?.afternoonFirst?.temp,
              // name: filteredForecast?.afternoonFirst?.icon,
              name: '02d',
              dayColor: enums.Colors.blue,
              nightColor: enums.Colors.blue,
              height: '35',
            }}
          />
        </View>

        <View style={{flexDirection: 'column'}}>
          <ForecastOneDay
            style={forecastDayStyle}
            epochTime={filteredForecast?.morningDayAfter?.date}
            morningData={{
              temp: filteredForecast?.morningDayAfter?.temp,
              name: filteredForecast?.morningDayAfter?.icon,
              dayColor: enums.Colors.blue,
              nightColor: enums.Colors.white,
              height: '35',
            }}
            afternoonData={{
              temp: filteredForecast?.afternoonDayAfter?.temp,
              // name: filteredForecast?.afternoonDayAfter?.icon,
              name: '01d',
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
            style={forecastDayStyle}
            epochTime={filteredForecast?.morningThirdDay?.date}
            morningData={{
              temp: filteredForecast?.morningThirdDay?.temp,
              name: filteredForecast?.morningThirdDay?.icon,
              dayColor: enums.Colors.blue,
              nightColor: enums.Colors.white,
              height: '35',
            }}
            afternoonData={{
              temp: filteredForecast?.afternoonThirdDay?.temp,
              // name: filteredForecast?.afternoonThirdDay?.icon,
              name: '09d',
              dayColor: enums.Colors.blue,
              nightColor: enums.Colors.blue,
              height: '35',
            }}
          />
        </View>

        <View style={{flexDirection: 'column'}}>
          <ForecastOneDay
            style={forecastDayStyle}
            epochTime={filteredForecast?.morningFourthDay?.date}
            morningData={{
              temp: filteredForecast?.morningFourthDay?.temp,
              name: filteredForecast?.morningFourthDay?.icon,
              dayColor: enums.Colors.blue,
              nightColor: enums.Colors.white,
              height: '35',
            }}
            afternoonData={{
              temp: filteredForecast?.afternoonFourthDay?.temp,
              // name: filteredForecast?.afternoonFourthDay?.icon,
              name: '11d',
              dayColor: enums.Colors.blue,
              nightColor: enums.Colors.blue,
              height: '35',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    height: '20%',
    width: '100%',
    backgroundColor: enums.Colors.white,
    // marginBottom:100
  },
  contentContainerStyle: {
    padding: 30,
    paddingBottom: 200,
  },
  //   backgroundColor: enums.Colors.white,
  // screenStyle: {
  //   // backgroundColor: enums.Colors.blue,
  //   flex: 1,
  //   // height:'100%',
  //   padding: 25,
  //   // marginBottom:100
  // },
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
