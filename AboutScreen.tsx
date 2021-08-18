import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import * as enums from './enums';
import Logo from './Logo';

export default function AboutScreen() {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>About</Text>
      </View>
      <ScrollView>
        <View style={styles.page}>
          <Logo fill={enums.Colors.blue} width={120} height={120} />
          <Text>Version 1.0</Text>
          <View style={styles.container}>
            <Text style={styles.title}>Contact</Text>
            <Text style={styles.content}>ibrofro0@gmail.com</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Why we need to get your location!</Text>
            <Text style={styles.content}>
              In order to check your geoloaction info and give the most accurate
              weather information available, Whe need to get your coordinates.
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Weather conditions</Text>
            <Text style={styles.content}>
              clear sky few clouds,scattered clouds, broken clouds, shower rain
              rain, thunderstorm, snow, mist
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Wind Speed</Text>
            <Text style={styles.content}>
              In meteorology, wind speed, or wind flow speed, is a fundamental
              atmospheric quantity caused by air moving from high to low
              pressure, usually due to changes in temperature
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: enums.Colors.orange,
    justifyContent: 'center',
    paddingLeft: 25,
  },
  headerText: {
    fontFamily: enums.Fonts.regular,
    color: enums.Colors.white,
    fontSize: 16,
  },
  page: {
    marginTop: 20,
    marginBottom:30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    width: '80%',
    marginTop: 20,
  },
  title: {
    fontFamily: enums.Fonts.bold,
    fontSize: 16,
  },
  content: {
    fontFamily: enums.Fonts.regular,
    fontSize: 16,
  },
});
