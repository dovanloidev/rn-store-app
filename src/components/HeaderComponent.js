import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {CHILEAN_FIRE, KENYAN_COPPER} from '../components/Colors';

const HeaderComponent = ({title, back, goBack}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        marginBottom: 5,
      }}>
      <StatusBar backgroundColor={CHILEAN_FIRE} />
      <View
        style={{
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: CHILEAN_FIRE,
        }}>
        {back ? (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              left: 20,
              top: 15,
            }}
            onPress={goBack}>
            <AntDesign name="left" size={24} color="#473330" />
          </TouchableOpacity>
        ) : null}

        <Text style={{fontSize: 24, color: '#473330'}}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderComponent;
