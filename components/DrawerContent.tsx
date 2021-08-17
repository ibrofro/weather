import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem,DrawerItemList} from '@react-navigation/drawer';
import * as enums from '../enums';
export default function DrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {},
  myWeather: {
    
  },
});
