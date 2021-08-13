import {StyleSheet} from 'react-native';
import * as enums from '../enums';

export const forecastStyle = StyleSheet.create({
  dayStyle: {
    color: enums.Colors.blue,
    fontFamily: enums.Fonts.extraBold,
    fontSize: 22,
  },
  morningStyle: {
    color: enums.Colors.blue,
  },
  afternoonStyle: {
    color: enums.Colors.blue,
  },
  widgetContainer: {
    padding: 15,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: enums.Colors.gray,
    marginTop:15,
    width: 125,
    alignItems: 'center',
    justifyContent:"space-around"
  },
  iconExchangerContainer: {
    width: 40,
    alignItems: 'center',
  },
  separator: {
    height: '70%',
    borderWidth: 0.5,
    borderColor: enums.Colors.blue,
    width: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  temp: {
    fontFamily: enums.Fonts.extraBold,
    fontSize: 16,
    color: enums.Colors.blue,
  },
});
