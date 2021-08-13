import {StyleSheet} from 'react-native';
import * as enums from '../enums';

export const MoreInfoMorningStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems:"center",
    // borderWidth:1
  },

  infoContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontFamily: enums.Fonts.regular,
    fontSize: 16,
    marginTop: 5,
    color: enums.Colors.blue,
  },
  infoText: {
    fontFamily: enums.Fonts.extraBold,
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    color: enums.Colors.blue,
  },

  
});
export const svgParamsMoreInfoMorning = {
  colorSvg: {
    fill: enums.Colors.blue,
  },
};
