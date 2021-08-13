import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TimeClass from '../classes/TimeClass';
import {filteredForecastWeatherType} from '../types';
export default function Forecast(props: {
  style: any;
  data: filteredForecastWeatherType;
}) {
  const dateIns = new TimeClass();

  return (
    <>
      <View>
        <View style={{marginBottom: 2}}>
          <Text style={props.style.dayStyle}>
            {dateIns.getDate(props.data.firstDay.dt).day}
          </Text>
        </View>
        <View style={props.style.widgetContainer}>
          <Text>Morning</Text>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>
              {Math.trunc(props.data.firstDay.temp.morn)}°C
            </Text>
          </View>
        </View>

        <View style={props.style.widgetContainer}>
          <Text>Evening</Text>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>
              {Math.trunc(props.data.firstDay.temp.eve)}°C
            </Text>
          </View>
        </View>

        <View style={props.style.widgetContainer}>
          <Text>Night</Text>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>
              {Math.trunc(props.data.firstDay.temp.night)}°C
            </Text>
          </View>
        </View>
      </View>


      <View>
        <View style={{marginBottom: 2}}>
          <Text style={props.style.dayStyle}>
            {dateIns.getDate(props.data.secondDay.dt).day}
          </Text>
        </View>
        <View style={props.style.widgetContainer}>
          <Text>Morning</Text>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>
              {Math.trunc(props.data.secondDay.temp.morn)}°C
            </Text>
          </View>
        </View>

        <View style={props.style.widgetContainer}>
          <Text>Evening</Text>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>
              {Math.trunc(props.data.secondDay.temp.eve)}°C
            </Text>
          </View>
        </View>

        <View style={props.style.widgetContainer}>
          <Text>Night</Text>
          <View style={props.style.separator}></View>
          <View>
            <Text style={props.style.temp}>
              {Math.trunc(props.data.secondDay.temp.night)}°C
            </Text>
          </View>
        </View>
      </View>
      
    </>
  );
}
