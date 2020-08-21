import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'react-native-fetch-blob';

import HeaderComponent from '../components/HeaderComponent';
import formatNumberComponent from '../components/formatNumberComponent';
import DevicesComponent from '../components/DevicesComponent';
import {BASE_URL} from '../api/URL';
import {KENYAN_COPPER, CHILEAN_FIRE} from '../components/Colors';
import {AddCartAction} from '../redux/action/cart';

const ProductDetailScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const cartCurrent = useSelector((state) => state.cart);
  const userCurrent = useSelector((state) => state.user);
  const [product, setProduct] = useState(route.params.item);

  const fetchToCart = async (item) => {
    try {
      let data = await RNFetchBlob.fetch(
        'POST',
        `${BASE_URL}/cart/AddToCart`,
        {
          Authorization: 'Bearer access-token',
          otherHeader: 'foo',
          'Content-Type': 'multipart/form-data',
        },
        [
          {name: 'userId', data: userCurrent.user._id},
          {name: 'productId', data: item._id},
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onAddCart = async () => {
    fetchToCart(product);
    await AsyncStorage.setItem('cart', JSON.stringify(product));
    dispatch(AddCartAction(product, cartCurrent));
    alert('Them than cong');
  };

  const onDeleteItem = (id) => {
    Alert.alert('Remind', 'Are you sure delete item?', [
      {
        text: 'Yes',
        onPress: async () => {
          try {
            const data = await axios.delete(`${BASE_URL}/api/deleteItem/${id}`);

            if (data) navigation.goBack();
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        text: 'No',
        onPress: () => {
          navigation.navigate('ProductDetailScreen');
        },
      },
    ]);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderComponent
        title="Thông tin chi tiết"
        back
        goBack={() => navigation.goBack()}
      />

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 300, width: '100%'}}
          source={
            product.image
              ? {uri: `${BASE_URL}/${product.image.split('\\')[1]}`}
              : require('../assets/no-image-found.png')
          }
          resizeMode="contain"
        />
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>{product.name}</Text>
          <Text style={{fontSize: 18, color: '#F83E41', marginVertical: 10}}>
            <FontAwesome5 name="coins" size={20} />
            {'  '}
            {formatNumberComponent(product.price)}đ
          </Text>
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <DevicesComponent title="Mô tả" style={{fontSize: 20}} />
        <Text style={{fontSize: 16, marginTop: 5, textAlign: 'center'}}>
          {product.note}
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <TouchableOpacity
          style={{
            backgroundColor: CHILEAN_FIRE,
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onAddCart()}>
          <AntDesign name="shoppingcart" size={16} />
          <Text style={{fontSize: 16, marginLeft: 5}}>Thêm giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#33A7E7',
            padding: 10,
          }}
          onPress={() =>
            navigation.navigate('AddProduct', {id: product._id, edit: true})
          }>
          <AntDesign name="edit" size={20} color="black" />
          <Text style={{fontSize: 20, marginLeft: 5}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F83E41',
            padding: 10,
          }}
          onPress={() => onDeleteItem(product._id)}>
          <AntDesign name="delete" size={20} color="black" />
          <Text style={{fontSize: 20, marginLeft: 5}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
