import React, {useState, useEffect} from 'react';
import {View, Text, Animated, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CHILEAN_FIRE, KENYAN_COPPER} from '../components/Colors';

const HEIGHT = Dimensions.get('window').height;

const HelloScreen = ({navigation}) => {
  const [marginTop, setMarginTop] = useState(new Animated.Value(HEIGHT / 2));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(marginTop, {
        toValue: 0,
        useNativeDriver: false,
        duration: 2000,
      }),
    ]).start(() => {
      // navigation.navigate('LoadingScreen');
    });
  });

  return (
    <View style={styles.container}>
      <Ionicons name="logo-apple-appstore" size={100} color={KENYAN_COPPER} />
      <Animated.Text style={{marginTop: marginTop, fontSize: 30}}>
        Welcome to app store
      </Animated.Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CHILEAN_FIRE,
  },
});
export default HelloScreen;
