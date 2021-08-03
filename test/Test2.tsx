import React, {useEffect, useRef, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, AppState} from 'react-native';
import {ForegroundContext} from './Test';
import * as Location from 'expo-location';
export default function Test2({navigation}: any) {
  const {foregroundState, setForegroundState, appStateObj} =
    useContext(ForegroundContext);
  const isMounted = useRef(true);
  const firstMount = useRef<boolean>();
  //   const currentState = useRef(AppState.currentState);

  //   function handleChange(nextState: any) {
  //     console.log('---------Test2-----------');
  //     console.log('previousState: ' + currentState.current);
  //     console.log('nextState: ' + nextState);
  //     if (
  //       currentState.current === 'inactive' ||
  //       ('background' && nextState === 'active')
  //     ) {
  //       console.log('App is in the foreground');
  //     }
  //   }
  //   useEffect(() => {
  //     AppState.addEventListener('change', handleChange);

  //     return () => {
  //       AppState.addEventListener('change', handleChange);
  //     };
  //   },[]);

  const getCoords = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({accuracy: 6});
        // setAuthorization('granted');
        return location;
      } else {
        console.log('denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('First time rendering');
    firstMount.current = true;
    isMounted.current = true;
    // setForegroundState((st: any) => {
    //   return {...st, foregroundState: {state: false}};
    // });
    return () => {
      console.log("Unmouting")
      firstMount.current = false;
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    console.log('--isMounted.current ' + isMounted.current);

    if (isMounted.current) {
      console.log('firstMount.current: ' + firstMount.current);
      console.log('foregroundState.state: ' + foregroundState.state);
      if (firstMount.current) {
        firstMount.current = false;
        setForegroundState({state: false});
      } else {
        console.log('--------Test2---------');
        (async () => {
          if (foregroundState.state) {
            console.log('Hola! you should get data');
            // Never AskPermission while using AppState
            // if you ask it AppState loop forever.
            const status = await Location.getForegroundPermissionsAsync();
            console.log('The actual location status is: ' + status.granted);
            const location = await Location.getCurrentPositionAsync({
              accuracy: 6,
            });
            console.log(location);
            setForegroundState({state: false});
          }
        })();
      }
    }

    // return () => {
    //   isMounted.current = false;
    //   firstMount.current = true;
    // };
  });
  return (
    <View style={styles.container}>
      <Text>This is Test2</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Test1');
        }}>
        <Text>Navigate to test1</Text>
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
