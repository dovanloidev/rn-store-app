import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import HeaderComponent from '../components/HeaderComponent';
import {KENYAN_COPPER, CHILEAN_FIRE} from '../components/Colors';

const ProfileScreen = ({navigation}) => {
  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderComponent title="PROFILE" />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: CHILEAN_FIRE,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: KENYAN_COPPER,
            width: '80%',
            height: 50,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onLogout()}>
          <Text style={{fontSize: 20}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
