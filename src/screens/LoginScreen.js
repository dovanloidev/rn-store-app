import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {BASE_URL} from '../api/URL';
import {CHILEAN_FIRE, KENYAN_COPPER, INPUT} from '../components/Colors';
import DevicesComponent from '../components/DevicesComponent';

const LoginScreen = ({navigation, route}) => {
  // tạo state cho function
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const fetchData = async () => {
    try {
      let data = await axios.post(`${BASE_URL}/signin`, {
        email: email,
        password: pass,
      });
      if (data.data.token) {
        await AsyncStorage.setItem('token', data.data.token);
        navigation.navigate('TabNavigation');
      } else {
        alert('Sai email hoac mat khau');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: CHILEAN_FIRE}}>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons
            name="logo-apple-appstore"
            size={100}
            color={KENYAN_COPPER}
          />
          <Text style={{color: KENYAN_COPPER, fontSize: 18}}>
            Welcome to App Store
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 5}}>
            LOGIN
          </Text>
        </View>
        <View
          style={{
            flex: 7,
            padding: 30,
          }}>
          <TextInput
            style={{
              width: '100%',
              backgroundColor: INPUT,
              padding: 10,
              borderRadius: 10,
            }}
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              width: '100%',
              backgroundColor: INPUT,
              padding: 10,
              borderRadius: 10,
              marginTop: 20,
            }}
            placeholder="PassWord"
            secureTextEntry={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Button
              style={{
                backgroundColor: KENYAN_COPPER,
                marginBottom: 10,
                padding: 5,
                borderRadius: 10,
              }}
              color="black"
              mode="outlined"
              onPress={() => fetchData()}>
              Login
            </Button>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 10,
                marginBottom: 10,
              }}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={{fontSize: 16, textAlign: 'center', color: 'black'}}>
                If you don't have account?
              </Text>
            </TouchableOpacity>

            <DevicesComponent title="OR" />

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginTop: 10,
              }}>
              <FontAwesome.Button name="facebook" size={20}>
                Login with facebook
              </FontAwesome.Button>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
