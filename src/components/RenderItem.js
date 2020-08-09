import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {CHILEAN_FIRE, COIN} from '../components/Colors';
import formatNumberComponent from '../components/formatNumberComponent';
import {BASE_URL} from '../api/URL';

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
          source={
            item.image
              ? {
                  uri: item.image.split('\\')[1]
                    ? `${BASE_URL}/${item.image.split('\\')[1]}`
                    : `${BASE_URL}/${item.image.split('/')[1]}`,
                }
              : require('../assets/no-image-found.png')
          }
          style={{width: 200, height: 200}}
          resizeMode="center"
        />
        <Text style={{fontSize: 18, textAlign: 'center'}}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;
