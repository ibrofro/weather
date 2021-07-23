import React, {useState,useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Logo from './Logo';
import {Colors} from './enums';
import {Fonts} from './enums';
import UserIcon from './assets/icons/UserIcon';
import {ScrollView} from 'react-native-gesture-handler';
import {connState} from './App';
import UserClass from './classes/UserClass';
export default function GetInfoScreen() {

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const {state, dispatch} = useContext(connState);

  const createUser = async (name: string): Promise<boolean> => {
    const userIns = new UserClass();
    try {
      await userIns.createUser(name);
      console.log('User created...');
      dispatch({type:"connect"})
      return true;
    } catch (error) {
      if (error.message === 'name-not-valid') {
        console.log('Aye Aye name is not valid');
        setError('Name must be at least 3 characters.');
        console.log(error.stack);
      }
      return false;
    }
  };
  return (
    <ScrollView>
      <View style={styles.screenStyle}>
        <View style={styles.bigContainer}>
          <View style={styles.logoContainer}>
            <Logo width={120} height={120} fill={Colors.blue} />
          </View>

          <View style={styles.formContainer}>
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            <View style={{flexDirection: 'row-reverse'}}>
              <TextInput
                onChangeText={text => setName(text)}
                onFocus={() => {
                  setError('');
                }}
                style={styles.nameInput}
                placeholder="Your name"
              />
              <View style={styles.userIconContainer}>
                <UserIcon width={30} height={30} fill={Colors.blue} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.submitButtonContainer}
              onPress={() => {
                createUser(name);
              }}
              disabled={false}>
              <View>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{...styles.infoContainer, ...{marginTop: 25}}}>
            <Text style={styles.infoTitle}>We might Need your location!</Text>
            <Text
              style={{fontFamily: Fonts.regular, fontSize: 16, marginTop: 5}}>
              We might need your coordinates in order to check your geolocation,
              to be able to give the most accurate weather information
              available.
            </Text>
          </View>

          <View style={{...styles.infoContainer, ...{marginTop: 25}}}>
            <Text style={styles.infoTitle}>We don't save any informations</Text>
            <Text
              style={{fontFamily: Fonts.regular, fontSize: 16, marginTop: 5}}>
              We actually don’t save your name or any other information.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
  bigContainer: {
    margin: 35,
  },
  logoContainer: {
    // borderWidth: 1,
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 25,
    // borderWidth: 1,
    padding: 5,
    justifyContent: 'flex-start',
  },
  nameInput: {
    flexGrow: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1.2,
    borderRadius: 8,
    borderColor: Colors.blue,
    borderLeftWidth: 0,
  },
  userIconContainer: {
    borderWidth: 1.2,
    borderRadius: 8,
    width: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonContainer: {
    backgroundColor: Colors.blue,
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonStyle: {},
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  infoContainer: {
    //   borderWidth:1,
  },
  infoTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  errorContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 5,
  },
  errorText: {
    fontFamily: Fonts.regular,
    color: '#F86F6F',
    fontSize: 14,
  },
});
