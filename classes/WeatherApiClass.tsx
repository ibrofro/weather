import {credentials} from '../enums';
import add from 'date-fns/add';
import fromUnixTime from 'date-fns/fromUnixTime';
import {zonedTimeToUtc, utcToZonedTime, format} from 'date-fns-tz';
import getUnixTime from 'date-fns/getUnixTime';
import {
  weatherResponseType,
  forecastWeatherType,
  filteredForecastWeatherType,
  placeType,
  currentAndForecastType,
  weatherDataFilteredType,
} from '../types';
import id from 'date-fns/esm/locale/id/index.js';
export default class WeatherApiClass {
  lon: string;
  lat: string;
  unit: 'metric' | 'imperial';
  constructor(lon: string, lat: string, unit: 'metric' | 'imperial') {
    this.lon = lon;
    this.lat = lat;
    this.unit = unit;
  }

  async getWeather(): Promise<weatherResponseType> {
    const url =
      'https://api.openweathermap.org/data/2.5/weather?' +
      'lat=' +
      this.lat +
      '&lon=' +
      this.lon +
      '&appid=' +
      credentials.openWeather +
      '&units=' +
      this.unit;
    // console.log(url);
    const res = await fetch(url);
    if (res.ok) {
      const jsonRes = await res.json();
      return jsonRes;
    } else {
      throw new Error(
        'Something wrong happen, The response status is ' + res.status,
      );
    }
  }

  async getPlace(): Promise<placeType> {
    const options = {
      headers: new Headers({'Accept-Language': 'en-US'}),
    };
    const url =
      'https://nominatim.openstreetmap.org/reverse?format=jsonv2&' +
      'lat=' +
      this.lat +
      '&lon=' +
      this.lon +
      '&zoom=5';
    const res = await fetch(url, options);
    if (res.ok) {
      const jsonRes = await res.json();
      return jsonRes;
    } else {
      throw new Error(
        'Something wrong happen, The response status is ' + res.status,
      );
    }
  }
  async getForecastWeather(): Promise<forecastWeatherType> {
    const url =
      'https://api.openweathermap.org/data/2.5/forecast?' +
      'lat=' +
      this.lat +
      '&lon=' +
      this.lon +
      '&appid=' +
      credentials.openWeather +
      '&units=' +
      this.unit;
    // console.log(url);
    const res = await fetch(url);
    if (res.ok) {
      const jsonRes = await res.json();
      // console.log(jsonRes);
      return jsonRes;
    } else {
      throw new Error(
        'Something wrong happen, The response status is ' + res.status,
      );
    }
  }

  getWeatherAndForecastData = async (): Promise<currentAndForecastType> => {
    const url =
      'https://api.openweathermap.org/data/2.5/onecall?' +
      'exclude=minutely,alerts' +
      '&lat=' +
      this.lat +
      '&lon=' +
      this.lon +
      '&appid=' +
      credentials.openWeather +
      '&units=' +
      this.unit;
    const req = await fetch(url);
    if (req.ok) {
      const res = await req.json();
      const transformedRes = res as currentAndForecastType;
      return transformedRes;
    } else {
      throw new Error('Error while getting the weather');
    }
  };

  filterRawToWeatherData(
    data: currentAndForecastType,
  ): weatherDataFilteredType {
    const res: weatherDataFilteredType = {
      location:"",
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
      timezone_offset: data.timezone_offset,
      current: data.current,
      hourly: data.hourly[0],
    };
    return res;
  }

  filterRawToForecastData(
    data: currentAndForecastType,
  ): filteredForecastWeatherType {
    const initialEpoch = data.daily[0].dt;

    // console.log('Initial Epoch ' + initialEpoch);
    var d = new Date(0);
    d.setUTCSeconds(initialEpoch);
    const date = d.getDate() + 1;
    let month = d.getMonth() + 1;
    let nmonth = month < 10 ? `0${month}` : `${month}`;
    const year = d.getFullYear();
    const tomorrow = new Date(`${year}-${nmonth}-${date}T00:00:00`);

    const forecast = [];

    forecast.push(data.daily[1]);

    forecast.push(data.daily[2]);

    forecast.push(data.daily[3]);

    forecast.push(data.daily[4]);

    return {
      firstDay: forecast[0],
      secondDay: forecast[1],
      thirdDay: forecast[2],
      fourthDay: forecast[3],
    };
  }
}
