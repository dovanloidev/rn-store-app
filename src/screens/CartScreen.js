import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

import HeaderComponent from '../components/HeaderComponent';
import {BASE_URL} from '../api/URL';
import formatNumberComponent from '../components/formatNumberComponent';
import {DeleteCartAction, AddCartLocalAction} from '../redux/action/cart';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartCurrent = useSelector((state) => state.cart);
  const userCurrent = useSelector((state) => state.user);
  const [listCart, setListCart] = useState([]);

  useEffect(() => {
    setListCart(cartCurrent.cart);
  }, [cartCurrent.cart]);

  const onDeleteCart = async (item) => {
    try {
      let _id = item._id;
      const data = await axios.delete(`${BASE_URL}/cart/deleteCart/${_id}`);

      await AsyncStorage.setItem('cart', JSON.stringify(cartCurrent.cart));
      dispatch(DeleteCartAction(item, cartCurrent));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderComponent title="CART" />

      <View style={{marginBottom: 60}}>
        <FlatList
          data={listCart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  console.log('eeee');
                }}>
                <Image
                  style={{height: 200, flex: 5}}
                  source={
                    item.image
                      ? {uri: `${BASE_URL}/${item.image.split('\\')[1]}`}
                      : require('../assets/no-image-found.png')
                  }
                  resizeMode="contain"
                />
                <View style={{flex: 5, justifyContent: 'center'}}>
                  <Text style={{fontSize: 16}}>{item.name}</Text>
                  <Text style={{color: '#F83E41'}}>
                    {formatNumberComponent(item.price)}đ
                  </Text>
                </View>

                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() => onDeleteCart(item)}>
                  <AntDesign name="close" size={24} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CartScreen;
