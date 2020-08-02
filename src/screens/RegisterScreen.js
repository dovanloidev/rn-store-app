import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {BASE_URL} from '../api/URL';
import {CHILEAN_FIRE, KENYAN_COPPER, INPUT} from '../components/Colors';

const RegisterScreen = ({navigation, route}) => {
  // tạo state cho function
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const fetchData = async () => {
    try {
      let data = await axios.post(`${BASE_URL}/signup`, {
        email: email,
        password: pass,
      });
      await AsyncStorage.setItem('token', data.data.token);
      navigation.navigate('TabNavigation');
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
            REGISTER
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
              Register
            </Button>
            <TouchableOpacity
              style={{
                marginBottom: 10,
                padding: 5,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{fontSize: 16, textAlign: 'center'}}>
                If you have account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
