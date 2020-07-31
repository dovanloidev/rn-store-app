import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let data = await axios.get('http://192.168.30.114:3000/api/getAllItem');
      setListProduct(data.data.product);
      console.log({listProduct});
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };

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
          onPress={() => onLogout()}>
          <AntDesign name="left" size={24} />
        </TouchableOpacity>

        <Text style={{fontSize: 24}}>Home</Text>

        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            right: -2,
            top: 10,
          }}
          onPress={() => navigation.navigate('AddProduct')}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={listProduct}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1, padding: 10}}>
                <Text>Name: {item.name}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Note: {item.note}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
