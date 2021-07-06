import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon01d from './assets/weather_icons/icon01d.svg';
import Icon01n from './assets/weather_icons/icon01n.svg';
import Icon02d from './assets/weather_icons/icon02d.svg';
import Icon02n from './assets/weather_icons/icon02n.svg';
import Icon03d from './assets/weather_icons/icon03d.svg';
import Icon03n from './assets/weather_icons/icon03n.svg';
import Icon09d from './assets/weather_icons/icon09d.svg';
import Icon09n from './assets/weather_icons/icon09n.svg';
import Icon11d from './assets/weather_icons/icon11d.svg';
import Icon11n from './assets/weather_icons/icon11n.svg';
import Icon13d from './assets/weather_icons/icon13d.svg';
import Icon13n from './assets/weather_icons/icon13n.svg';
import Icon14d from './assets/weather_icons/icon14d.svg';
import Icon14n from './assets/weather_icons/icon14n.svg';
export default function IconExchanger(props: {
  name: string;
  dayColor: string;
  nightColor: string;
  height: string;
}) {
  const Exchanger = () => {
    switch (props.name) {
      case '01d':
        return <Icon01d height={props.height} fill={props.dayColor} />;

      case '01n':
        return <Icon01n height={props.height} fill={props.nightColor} />;

      case '02d':
        return <Icon02d height={props.height} fill={props.dayColor} />;

      case '02n':
        return <Icon02n height={props.height} fill={props.nightColor} />;

      case '03d':
        return <Icon03d height={props.height} fill={props.dayColor} />;

      case '03n':
        return <Icon03n height={props.height} fill={props.nightColor} />;

      case '04d':
        return <Icon03d height={props.height} fill={props.dayColor} />;

      case '04n':
        return <Icon03n height={props.height} fill={props.nightColor} />;
      case '09d':
        return <Icon09d height={props.height} fill={props.dayColor} />;

      case '09n':
        return <Icon09n height={props.height} fill={props.nightColor} />;
      case '10d':
        return <Icon09d height={props.height} fill={props.dayColor} />;

      case '10n':
        return <Icon09n height={props.height} fill={props.nightColor} />;
      case '11d':
        return <Icon11d height={props.height} fill={props.dayColor} />;

      case '11n':
        return <Icon11n height={props.height} fill={props.nightColor} />;
      case '13d':
        return <Icon13d height={props.height} fill={props.dayColor} />;

      case '13n':
        return <Icon13n height={props.height} fill={props.nightColor} />;

      case '14d':
        return <Icon14d height={props.height} fill={props.dayColor} />;

      case '14n':
        return <Icon14n height={props.height} fill={props.nightColor} />;

      default:
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        );
    }
  };
  return <Exchanger />;
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
});
