import {StyleSheet} from 'react-native';
import * as enums from '../enums';

export const forecastDayStyle = StyleSheet.create({
  dayStyle: {
    color: enums.Colors.blue,
    fontFamily: enums.Fonts.extraBold,
    fontSize: 18,
  },
  widgetContainer: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: enums.Colors.gray,
    width: 120,
    alignItems: 'center',
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
