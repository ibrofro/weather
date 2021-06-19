import React, {useEffect, useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import Logo from './Logo';
export default function LoadingScreen() {
  useEffect(() => {
  });
  return (
    <View style={styles.screenStyle}>
      <View style={styles.bigContainer}>
        <Logo width={150} height={150} fill="white"/>
        <View style={{height: 30,marginTop:15}}>
          <BallIndicator color="white" size={25} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: '#313745',
    flex: 1,
  },
  bigContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  
});
// white color
// #e5ecf4
