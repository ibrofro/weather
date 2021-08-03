import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, AppState} from 'react-native';

export default function Test1({navigation}: any) {
//   const currentState = useRef(AppState.currentState);
//   function handleChange(nextState: any) {
//     console.log('----------Test1----------');
//     console.log('previousState: ' + currentState.current);
//     console.log('nextState: ' + nextState);
//   }
//   useEffect(() => {
//     AppState.addEventListener('change', handleChange);

//     return () => {
//       AppState.addEventListener('change', handleChange);
//     };
//   }, []);

  return (
    <View style={styles.container}>
      <Text>This is Test1</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Test2');
        }}>
        <Text>Navigate to test2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
