import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {CHILEAN_FIRE} from '../components/Colors';

const LoadingScreen = ({navigation}) => {
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    var token = await AsyncStorage.getItem('token');

    if (token) {
      navigation.navigate('TabNavigation');
    } else {
      navigation.navigate('LoginScreen');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: CHILEAN_FIRE,
      }}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoadingScreen;
