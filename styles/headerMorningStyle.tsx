import {StyleSheet} from 'react-native';
import * as enums from '../enums';

export const headerMorningStyle = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
  },
  hamburgerMenuContainer: {
    alignItems: 'center',
  },
  searchStyle: {
    backgroundColor: enums.Colors.white,

    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  searchContainer: {
    width: '65%',
    flexDirection: 'row',
    marginLeft: 15,
  },

  searchIconContainer: {
    backgroundColor: enums.Colors.white,
    padding: 8,
    borderRightColor: enums.Colors.darkerGray,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export const statusBarOption = {
  backgroundColor: enums.Colors.darkerOrange,
};
export const svgParamsHeaderMorning = {
  hamburgerSvg: {
    fill: enums.Colors.white,
    height: 30,
    width: 30,
  },
  searchSvg: {
    fill: enums.Colors.darkerGray,
    height: 20,
    width: 20,
  },
};
