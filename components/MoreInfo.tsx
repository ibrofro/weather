import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Sun from '../assets/icons/sun.svg';
import Sunset from '../assets/icons/sunset.svg';
import Wind from '../assets/icons/wind.svg';
import Telescope from '../assets/icons/telescope.svg';

import {weatherDataFilteredType} from '../types';
import {format, fromUnixTime} from 'date-fns';

export default function MoreInfo(props: {
  style: any;
  data: weatherDataFilteredType;
  svgParams: any;
}) {
  const formatTime = (time: number, timezoneOffset: number) => {
    const goodTime = format(
      fromUnixTime(Number(time + timezoneOffset)),
      'HH:mm bb',
    );
    return goodTime;
  };
  return (
    <View style={props.style.container}>
      <View style={props.style.infoContainer}>
        <View>
          <Sun height={40} width={40} fill={props.svgParams.colorSvg.fill} />
        </View>
        <Text style={props.style.titleText}>Sunrise</Text>
        <Text style={props.style.infoText}>
          {formatTime(props.data.current.sunrise, props.data.timezone_offset)}
        </Text>
      </View>

      <View style={{alignItems: 'center', marginLeft: 20}}>
        <View>
          <Sunset height={40} width={40} fill={props.svgParams.colorSvg.fill} />
        </View>
        <Text style={props.style.titleText}>Sunset </Text>
        <Text style={props.style.infoText}>
          {formatTime(props.data.current.sunset, props.data.timezone_offset)}
        </Text>
      </View>

      <View style={props.style.infoContainer}>
        <View>
          <Wind height={40} width={40} fill={props.svgParams.colorSvg.fill} />
        </View>
        <Text style={props.style.titleText}>Wind speed</Text>
        <Text style={props.style.infoText}>
          {props.data.current.wind_speed} m/s
        </Text>
      </View>

      <View
        style={{
          ...props.style.infoContainer,
          ...{alignSelf: 'center', marginTop: 45},
        }}>
        <View>
          <Telescope height={40} width={40} fill={props.svgParams.colorSvg.fill} />
        </View>
        <Text style={props.style.titleText}>Weather Conditions</Text>
        <Text style={props.style.infoText}>
          {props.data.current.weather[0].description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
