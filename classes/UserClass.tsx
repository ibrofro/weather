import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserClass {
  async createUser(name: string): Promise<boolean> {
    if (name.length < 3) {
      throw new Error('name-not-valid');
    }
    await AsyncStorage.setItem('name', name);
    return true;
  }

  async registered(): Promise<boolean> {
    const name = await AsyncStorage.getItem('name');
    if (name !== null) {
      return true;
    } else {
      return false;
    }
  }

  async disconnect(): Promise<boolean> {
    const name = await AsyncStorage.removeItem('name');
    return true;
  }
}
