import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {CHILEAN_FIRE, COIN} from '../components/Colors';
import formatNumberComponent from '../components/formatNumberComponent';

const RenderItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={{
        width: 250,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('ProductDetailScreen', {item})}>
      <View style={{flex: 1, padding: 10}}>
        <Image
          source={require('../assets/-iphone-11-thumbvideo.jpg')}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
        <Text style={{fontSize: 18, textAlign: 'center'}}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;
