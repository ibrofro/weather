import {credentials} from '../enums';
import {weatherResponseType} from '../types';
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
    console.log(url);
    const res = await fetch(url);
    if (res.ok) {
      const jsonRes = await res.json();
      console.log(jsonRes);
      return jsonRes;
    } else {
      throw new Error(
        'Something wrong happen, The response status is ' + res.status,
      );
    }
  }
}
