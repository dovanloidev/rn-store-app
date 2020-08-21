import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderComponent from '../components/HeaderComponent';
import {KENYAN_COPPER, CHILEAN_FIRE} from '../components/Colors';
import {BASE_URL} from '../api/URL';
import {resetCartAction} from '../redux/action/cart';
import {logoutAction} from '../redux/action/user';

const ProfileScreen = ({navigation}) => {
  const cartCurrent = useSelector((state) => state.cart);
  const userCurrent = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const renderInfo = (icon, name, changeIcon) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: CHILEAN_FIRE,
          padding: 10,
          alignItems: 'center',
          marginBottom: 5,
        }}>
        {changeIcon ? (
          changeIcon
        ) : (
          <AntDesign style={{flex: 1}} name={icon} size={28} />
        )}
        <Text style={{fontSize: 18, flex: 8}}>{name}</Text>
        <MaterialIcons
          style={{flex: 1}}
          name="navigate-next"
          size={28}
          color="#473330"
        />
      </View>
    );
  };

  const onAddToCart = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('cart');
    await AsyncStorage.removeItem('user');
    // await cartCurrent.cart.map((item) => fetchToCart(item));
    dispatch(resetCartAction());
    dispatch(logoutAction());
    navigation.navigate('LoginScreen');
  };

  const onLogout = () => {
    Alert.alert('Remind', 'Are you sure logout?', [
      {
        text: 'Yes',
        onPress: async () => {
          try {
            onAddToCart();
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        text: 'No',
        onPress: () => {
          navigation.navigate('TabNavigation');
        },
      },
    ]);
  };

  return (
    <View style={{flex: 1}}>
      <HeaderComponent title="PROFILE" />

      <View style={{marginVertical: 10, alignItems: 'center'}}>
        <AntDesign name="user" size={100} />
      </View>

      <TouchableOpacity onPress={() => alert('tai khan')}>
        {renderInfo('user', 'User')}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('thong bao')}>
        {renderInfo(
          'user',
          'Notification',
          <Ionicons style={{flex: 1}} name="notifications-outline" size={28} />,
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onLogout()}>
        {renderInfo(
          'user',
          'Logout',
          <MaterialCommunityIcons style={{flex: 1}} name="logout" size={28} />,
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
