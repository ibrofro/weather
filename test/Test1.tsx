import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, AppState} from 'react-native';
import cities from 'cities.json';
export default function Test1() {

useEffect(()=>{
  console.log(cities)
})
  return (
    <>
    <View style={styles.container}>
     <Text>kksdfsdf</Text>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'gray',
    width: "80%",
    // alignSelf:"flex-start",
    height: 60,
    // position:"relative"
  },
});
