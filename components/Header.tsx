import React from 'react';
import {TextInput, Text, View, StatusBar} from 'react-native';
import HamburgerMenu from '../assets/icons/hamburger_menu.svg';
import Search from '../assets/icons/search.svg';
export default function Header(props: {
  styles: any;
  svgParams: any;
  statusBarOption: any;
  searchString: string | null;
  setSearchString: Function;
}) {
  return (
    <>
      <View style={{...props.styles.headerContainer, ...{}}}>
        <StatusBar backgroundColor={props.statusBarOption.backgroundColor} />
        <View style={props.styles.hamburgerMenuContainer}>
          <HamburgerMenu
            fill={props.svgParams.hamburgerSvg.fill}
            width={props.svgParams.hamburgerSvg.width}
            height={props.svgParams.hamburgerSvg.height}
          />
        </View>
        <View style={props.styles.searchContainer}>
          <View style={props.styles.searchIconContainer}>
            <Search
              fill={props.svgParams.searchSvg.fill}
              width={props.svgParams.searchSvg.width}
              height={props.svgParams.searchSvg.height}
            />
          </View>
          <View style={props.styles.inputContainer}>
            <TextInput
              style={props.styles.searchStyle}
              onChangeText={text => {
                props.setSearchString(text);
              }}
              placeholder="City name ex:London "
            />
          </View>
        </View>
      </View>
    </>
  );
}
