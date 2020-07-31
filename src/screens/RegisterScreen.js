import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import URL from '../api/URL';

const RegisterScreen = ({navigation, route}) => {
  // tạo state cho function
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const fetchData = async () => {
    try {
      let data = await axios.post('http://10.82.128.220:3000/signup', {
        email: email,
        password: pass,
      });
      await AsyncStorage.setItem('token', data.data.token);
      navigation.navigate('HomeScreen');
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
        <Text style={{fontSize: 24}}>Register</Text>
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
        {/* <TextInput
          style={{width: '100%', height: 50, marginTop: 10}}
          label="Name"
          mode="outlined"
          // value={text}
          // onChangeText={text => setText(text)}
        /> */}
        <TextInput
          style={{width: '100%', height: 50, marginTop: 10}}
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
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </Button>
          <Button mode="outlined" onPress={() => fetchData()}>
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
