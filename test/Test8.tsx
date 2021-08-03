import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
export default function Test8() {
  const [nickname, setNickname] = useState('no-nickname');
  const [name, setName] = useState('no-name');
  const renderCount = useRef(1);
  useEffect(() => {
    console.log('render');
    renderCount.current++;
  });
  useEffect(() => {
    (async () => {
      const permission = await Location.getCurrentPositionAsync({accuracy: 6});
      if (permission.coords.longitude) {
        setName('Aidara');
        setName('gggg');
        setName('ddd');
        setName('dddf');
        setNickname('Cherif');
      }
    })();
  }, []);
  return (
    <View>
      <Text>{renderCount.current}</Text>
      <Text>Actual name is {name}</Text>
      <Text>Actual nickname is {nickname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
