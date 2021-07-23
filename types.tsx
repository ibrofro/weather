export type weatherResponseType = {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
};

export type forecastWeatherType = {
  cod: string;
  message: number;
  cnt: number;
  list: (
    | {
        dt: number;
        main: {
          temp: number;
          feels_like: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
        };
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
        clouds: {
          all: number;
        };
        wind: {
          speed: number;
          deg: number;
          gust: number;
        };
        visibility: number;
        pop: number;
        sys: {
          pod: string;
        };
        dt_txt: string;
        rain?: undefined;
      }
    | {
        dt: number;
        main: {
          temp: number;
          feels_like: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
        };
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
        clouds: {
          all: number;
        };
        wind: {
          speed: number;
          deg: number;
          gust: number;
        };
        visibility: number;
        pop: number;
        rain: {
          '3h': number;
        };
        sys: {
          pod: string;
        };
        dt_txt: string;
      }
  )[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type forecastItemType = {date: number; temp: number; icon: string};
export type filteredForecastWeatherType = {
  tonight:{temp:number | undefined} | undefined;
  morningFirst: forecastItemType | undefined;
  afternoonFirst: forecastItemType | undefined;
  morningDayAfter: forecastItemType | undefined;
  afternoonDayAfter: forecastItemType | undefined;
  morningThirdDay: forecastItemType | undefined;
  afternoonThirdDay: forecastItemType | undefined;
  morningFourthDay: forecastItemType | undefined;
  afternoonFourthDay: forecastItemType | undefined;
};
