import {credentials} from '../enums';
import {
  weatherResponseType,
  forecastWeatherType,
  filteredForecastWeatherType,
  forecastItemType,
} from '../types';
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
    console.log(url);
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

  filterForecastData(data: forecastWeatherType): filteredForecastWeatherType {
    // The first date returned by the API.
    const initialEpoch = data.list[0].dt;
    // 01-Jan-1970 00:00:00.
    var d = new Date(0);
    // Get date based on the initial
    // epoch time from API.
    d.setUTCSeconds(initialEpoch);
    const date = d.getDate() + 1;
    let month = d.getMonth() + 1;
    let nmonth = month < 10 ? `0${month}` : `${month}`;
    const year = d.getFullYear();
    const nineHours = 32400;
    const nineteenHours = 75600;
    const tomorrow = new Date(`${year}-${nmonth}-${date}T00:00:00`);
    const dayAfter = new Date(`${year}-${nmonth}-${date + 1}T00:00:00`);
    const thirdDay = new Date(`${year}-${nmonth}-${date + 2}T00:00:00`);
    const fourthDay = new Date(`${year}-${nmonth}-${date + 3}T00:00:00`);
    const epochTomorrow = tomorrow.getTime() / 1000;
    const epochDayAfter = dayAfter.getTime() / 1000;
    const epochThirdDay = thirdDay.getTime() / 1000;
    const epochFourthDay = fourthDay.getTime() / 1000;

    let tonight = 0;
    let morningFirst:forecastItemType= {date: 0 ,temp: 0,icon: ""};
    let afternoonFirst:forecastItemType= {date: 0 ,temp: 0,icon: ""};
    let morningDayAfter:forecastItemType= {date: 0 ,temp: 0,icon: ""};
    let afternoonDayAfter:forecastItemType= {date: 0 ,temp: 0,icon: ""};
    let morningThirdDay:forecastItemType= {date: 0 ,temp: 0,icon: ""};
    let afternoonThirdDay:forecastItemType= {date: 0 ,temp: 0,icon: ""};
    let morningFourthDay:forecastItemType= {date: 0 ,temp: 0,icon: ""};
    let afternoonFourthDay:forecastItemType= {date: 0 ,temp: 0,icon: ""};

    for (let i = 0; i < data.list.length; i++) {
      const d = data.list[i];

      if (data.list[i].dt === epochTomorrow) {
        tonight = data.list[i].main.temp;
      }
      if (data.list[i].dt === epochTomorrow + nineHours) {
        let morning: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        morningFirst = morning;
      }
      if (data.list[i].dt === epochTomorrow + nineteenHours) {
        let afternoon: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        afternoonFirst = afternoon;
      }

      if (data.list[i].dt === epochDayAfter + nineHours) {
        let morning: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        morningDayAfter = morning;
      }

      if (data.list[i].dt === epochDayAfter + nineteenHours) {
        let afternoon: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        afternoonDayAfter = afternoon;
      }

      if (data.list[i].dt === epochThirdDay + nineHours) {
        let morning: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        morningThirdDay = morning;
      }

      if (data.list[i].dt === epochThirdDay + nineteenHours) {
        let afternoon: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        afternoonThirdDay = afternoon;
      }

      if (data.list[i].dt === epochFourthDay + nineHours) {
        let morning: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        morningFourthDay = morning;
      }

      if (data.list[i].dt === epochFourthDay + nineteenHours) {
        let afternoon: forecastItemType = {
          date: d.dt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        };
        afternoonFourthDay = afternoon;
      }
    }
    let arrData: filteredForecastWeatherType = {
      tonight: {temp: tonight},
      morningFirst: morningFirst,
      afternoonFirst: afternoonFirst,
      morningDayAfter: morningDayAfter,
      afternoonDayAfter: afternoonDayAfter,
      morningThirdDay: morningThirdDay,
      afternoonThirdDay: afternoonThirdDay,
      morningFourthDay: morningFourthDay,
      afternoonFourthDay: afternoonFourthDay,
    };

    return arrData;
  }
}
