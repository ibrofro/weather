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
    marginTop:10
  },
  suggestionText: {
    fontFamily: enums.Fonts.bold,
    fontSize: 14,
    marginLeft: 5,
    color: 'white',
  },
  separator: {
    marginTop: 20,
    position:'relative',
    left:-20,
    height: 2,
    width: '70%',
    backgroundColor: 'white',
  },

  //   headerContainer: {
  //     backgroundColor: 'orange',
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     padding: 15,
  //     paddingLeft: 20,
  //     paddingRight: 20,
  //     height: 70,
  //   },
  //   hamburgerMenuContainer: {
  //     alignItems: 'center',
  //   },
  //   searchStyle: {
  //     backgroundColor: enums.Colors.white,

  //     borderTopRightRadius: 5,
  //     borderBottomRightRadius: 5,
  //   },
  //   searchContainer: {
  //     width: '65%',
  //     flexDirection: 'row',
  //     marginLeft: 15,
  //   },

  //   searchIconContainer: {
  //     backgroundColor: enums.Colors.white,
  //     padding: 8,
  //     borderRightColor: enums.Colors.darkerGray,
  //     borderRightWidth: 1,
  //     borderTopLeftRadius: 5,
  //     borderBottomLeftRadius: 5,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  // });
  // export const statusBarOption = {
  //   backgroundColor: enums.Colors.darkerOrange,
  // };
});
export const svgParamsSuggestionMorning = {
  mapIconSvg: {
    fill: enums.Colors.white,
    height: 25,
    width: 25,
  },
  // searchSvg: {
  //   fill: enums.Colors.darkerGray,
  //   height: 20,
  //   width: 20,
  // },
};
