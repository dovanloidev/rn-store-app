import React from 'react';
import {View, Text} from 'react-native';

const DevicesComponent = ({title, style}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View
        style={{
          flex: 2,
          height: 1,
          backgroundColor: 'black',
        }}></View>
      <Text
        style={{
          flex: 1,
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 16,
          marginHorizontal: 10,
          ...style,
        }}>
        {title}
      </Text>
      <View style={{flex: 2, height: 1, backgroundColor: 'black'}}></View>
    </View>
  );
};

export default DevicesComponent;
