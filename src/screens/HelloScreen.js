import React, {useState, useEffect} from 'react';
import {View, Text, Animated, StyleSheet, Button} from 'react-native';

const HelloScreen = () => {
  const [value, setValue] = useState(new Animated.Value(10));
  const [value1, setValue1] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(value, {
      toValue: 250,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    Animated.timing(value1, {
      toValue: 1,
      duration: 2000,
    }).start();
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: value,
          opacity: value1,
        }}>
        <Text style={{fontSize: 30, color: 'white', fontFamily: 'Roboto-Bold'}}>
          Hello Screen
        </Text>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});
export default HelloScreen;
