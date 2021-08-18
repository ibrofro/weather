import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserIcon from './assets/icons/UserIcon';
import * as enums from './enums';
import UserClass from './classes/UserClass';
import {connState} from './App';
export default function ProfileScreen() {
  const {dispatch} = useContext(connState);
  const [userName, setUserName] = useState<null | string>(null);
  const ins = new UserClass();

  useEffect(() => {
    (async () => {
      const userFromStorage = await AsyncStorage.getItem('name');
      if (userFromStorage) {
        setUserName(userFromStorage);
      } else {
        dispatch('disconnect');
      }
    })();
  });
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.page}>
        <View style={styles.userIconContainer}>
          <UserIcon width={50} height={50} fill={enums.Colors.blue} />
        </View>
        <Text style={styles.userName}>{userName}</Text>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={async () => {
            await ins.disconnect();
            dispatch({type: 'disconnect'});
          }}>
          <Text style={styles.touchableText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  userIconContainer: {
    borderRadius: 8,
    width: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    height: 60,
    backgroundColor: enums.Colors.orange,
    justifyContent: 'center',
    paddingLeft: 25,
  },
  headerText: {
    fontFamily: enums.Fonts.regular,
    color: enums.Colors.white,
    fontSize: 16,
  },
  touchableContainer: {
    backgroundColor: enums.Colors.orange,
    marginTop: 10,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  touchableText: {
    color: enums.Colors.white,
    fontFamily: enums.Fonts.regular,
  },
  userName: {
    color: enums.Colors.blue,
    fontFamily: enums.Fonts.regular,
    marginTop: 5,
    fontSize: 16,
  },
});
