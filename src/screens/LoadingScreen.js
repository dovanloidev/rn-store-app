import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      <ActivityIndicator size="large" color="orange" />
    </View>
  );
};

export default LoadingScreen;
