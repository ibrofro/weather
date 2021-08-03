import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,TextInput} from 'react-native';
import {LocationContext} from './Test5';
export default function Test7({navigation}:any) {
  const {country, city, setCountry,setCity} = useContext(LocationContext);
  const [nickname, setNickname] = useState('no-nickname');
  const [name, setName] = useState('no-name');
  const [newCity, setNewCity] = useState<string>();
  const [newCountry, setNewCountry] = useState<string>();

  useEffect(() => {
    console.log('---Render-----');
    if (name !== 'no-name') {
      console.log('Name state is updated to ' + name);
    }

    if (nickname !== 'no-nickname') {
      console.log('nickname state is updated to ' + nickname);
    }
    return () => {
      console.log('unMount');
    };
  });
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <Text>This is Test4 component</Text>

      <Text>Actual name is {name}</Text>
      <Text>Actual nickname is {nickname}</Text>
      <TouchableOpacity
        style={{padding: 5, borderWidth: 1}}
        onPress={() => {
          setName('Omar');
          setNickname('Diagne');
        }}>
        <Text>Touch me to change name and nickname</Text>
      </TouchableOpacity>
      <Text>-----------------------------------</Text>
      <Text>Actual country is {country}</Text>
      <Text>Actual city is {city}</Text>
      {/* <TextInput
        placeholder="Country"
        style={{borderWidth: 1, width: 200}}
        onChangeText={text => {
          setNewCountry(text);
        }}
      />
      <TextInput
        placeholder="City"
        style={{borderWidth: 1, width: 200}}
        onChangeText={text => {
          setNewCity(text);
        }}
      /> */}
      <TouchableOpacity
        style={{padding: 5, borderWidth: 1}}
        onPress={() => {
          setCountry("Burundy");
          setCity("Fraya");
        }}>
        <Text>Touch me to change Country and City</Text>
      </TouchableOpacity>
      

      <TouchableOpacity
        style={{padding: 5, borderWidth: 1}}
        onPress={() => {
         navigation.navigate('Test4')
        }}>
        <Text>Navigate to test 4</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
