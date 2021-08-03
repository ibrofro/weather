import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Test3() {
  const [name, setName] = useState('default');
  const firstRender = useRef(false);
  useEffect(() => {
    console.log('------------------');
    console.log('Component render');
    firstRender.current = true;
    return () => {
      console.log('Component unmount');
      firstRender.current = false;
    };
  });
  useEffect(() => {
    console.log('------------------');
    console.log('Component Mount for the first time');
    if (firstRender) {
      console.log('This is was the first render');
      firstRender.current = false;
      console.log('We flip the first render');
    }
    return () => {
      console.log('Component unmount from []');
    };
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text style={{fontSize: 18}}>{name}</Text> */}
      <TextInput
        placeholder="Put your name here"
        style={{borderWidth: 1}}
        onChangeText={text => {
          setName(text);
        }}
      />
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
