import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const LoginScreen = ({navigation, route}) => {
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
          // value={text}
          // onChangeText={text => setText(text)}
        />
        <TextInput
          style={{width: '100%', marginTop: 10}}
          label="PassWord"
          mode="outlined"
          // value={text}
          // onChangeText={text => setText(text)}
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
            onPress={() => navigation.navigate('HomeScreen')}>
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
