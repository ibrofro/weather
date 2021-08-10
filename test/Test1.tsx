import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, AppState} from 'react-native';
export default function Test1() {

useEffect(()=>{
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
