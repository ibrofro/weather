import React, {version} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TimeClass from '../classes/TimeClass';
import IconExchanger from './IconExchanger';
import * as enums from '../enums';
export default function ForecastOneDay(props: {
  style: any;
  epochTime?: number;
  morningData: {
    temp?: number;
    name?: string;
    dayColor?: string;
    nightColor?: string;
    height?: string;
  };
  afternoonData: {
    temp?: number;
    name?: string;
    dayColor?: string;
    nightColor?: string;
    height?: string;
  };
}) {
  const dateIns = new TimeClass().getDate(props.epochTime);
  return (
    <>
      <View>
        <View style={{marginBottom: 2}}>
          <Text style={props.style.dayStyle}>{dateIns.day}</Text>
        </View>
        <Text>Morning</Text>
        <View style={props.style.widgetContainer}>
          <View style={props.style.iconExchangerContainer}>
            <IconExchanger
              name={props.morningData.name}
              dayColor={props.morningData.dayColor}
              nightColor={props.morningData.nightColor}
              height={props.morningData.height}
            />
          </View>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>{Math.round(props.morningData.temp)}°C</Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: 5}}>
        <Text>Afternoon</Text>
        <View style={props.style.widgetContainer}>
          <View style={props.style.iconExchangerContainer}>
            <IconExchanger
              name={props.afternoonData.name}
              dayColor={props.afternoonData.dayColor}
              nightColor={props.afternoonData.nightColor}
              height={props.afternoonData.height}
            />
          </View>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>{Math.round(props.afternoonData.temp)}°C</Text>
          </View>
        </View>
      </View>
    </>
  );
}
