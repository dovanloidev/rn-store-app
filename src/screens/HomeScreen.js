import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({navigation, route}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'orange',
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            left: 20,
            top: 15,
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} />
        </TouchableOpacity>

        <Text style={{fontSize: 24}}>Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
