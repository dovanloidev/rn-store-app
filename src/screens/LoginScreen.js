import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import URL from '../api/URL';

const LoginScreen = ({navigation, route}) => {
  // tạo state cho function
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const fetchData = async () => {
    try {
      let data = await axios.post('http://192.168.30.114:3000/signin', {
        email: email,
        password: pass,
      });
      if (data.data.token) {
        await AsyncStorage.setItem('token', data.data.token);
        navigation.navigate('HomeScreen');
      } else {
        alert('Sai email hoac mat khau');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'orange',
        }}>
        <Text style={{fontSize: 24}}>Login</Text>
      </View>

      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <TextInput
          style={{width: '100%', height: 50}}
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{width: '100%', marginTop: 10}}
          label="PassWord"
          mode="outlined"
          secureTextEntry={true}
          value={pass}
          onChangeText={(text) => setPass(text)}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Button mode="outlined" onPress={() => fetchData()}>
            Login
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('RegisterScreen')}>
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
