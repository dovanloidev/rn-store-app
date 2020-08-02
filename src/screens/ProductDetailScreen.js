import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

import HeaderComponent from '../components/HeaderComponent';
import formatNumberComponent from '../components/formatNumberComponent';
import DevicesComponent from '../components/DevicesComponent';
import {BASE_URL} from '../api/URL';

const ProductDetailScreen = ({navigation, route}) => {
  const [product, setProduct] = useState(route.params.item);

  const onDeleteItem = async (id) => {
    try {
      const data = await axios.delete(`${BASE_URL}/api/deleteItem/${id}`);

      if (data) navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderComponent
        title="Thông tin chi tiết"
        back
        goBack={() => navigation.goBack()}
      />

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 200, width: '100%'}}
          source={require('../assets/-iphone-11-thumbvideo.jpg')}
          resizeMode="cover"
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
