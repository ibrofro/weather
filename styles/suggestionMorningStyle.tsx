import {StyleSheet} from 'react-native';
import * as enums from '../enums';

export const suggestionMorningStyle = StyleSheet.create({
  container: {
    marginTop: 10,
    width: 210,
    borderRadius: 5,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 60,
    maxHeight: 200,
    backgroundColor: enums.Colors.orange,
  },
  itemContainer: {
    marginTop: 12,
    // borderWidth:1,
    // marginBottom:-5
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  suggestionContainer: {
    padding: 4,
  },
  locationIconContainer:{
    marginLeft:10
  },
  countryText: {
    fontFamily: enums.Fonts.bold,
    fontSize: 16,
    marginLeft: 5,
    marginTop:5,
    color: 'white',
  },
  suggestionText: {
    fontFamily: enums.Fonts.regular,
    fontSize: 16,
    marginLeft: 5,
    color: 'white',
  },
  separator: {
    marginTop: 20,
    position: 'relative',
    left: -20,
    height: 2,
    width: '70%',
    backgroundColor: 'white',
  },
});
export const svgParamsSuggestionMorning = {
  mapIconSvg: {
    fill: enums.Colors.white,
    height: 15,
    width: 15,
  },
};
