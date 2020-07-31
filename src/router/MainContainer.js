import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

// import my library
import {
  HelloScreen,
  HomeScreen,
  RegisterScreen,
  LoginScreen,
  LoadingScreen,
  AddProduct,
} from './Screens';

function NavigationRoot() {
  const FlashStack = createStackNavigator();
  const FlashNavigation = () => (
    <FlashStack.Navigator screenOptions={{headerShown: false}}>
      <FlashStack.Screen name="HelloScreen" component={HelloScreen} />
    </FlashStack.Navigator>
  );

  const MainStack = createStackNavigator();
  const MainNavigation = () => (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        login === null
          ? 'LoadingScreen'
          : login === true
          ? 'HomeScreen'
          : 'LoginScreen'
      }>
      <MainStack.Screen name="LoadingScreen" component={LoadingScreen} />
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="AddProduct" component={AddProduct} />
    </MainStack.Navigator>
  );

  // const [changeScreen, setChangeScreen] = useState(true);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const userId = await AsyncStorage.getItem('token');
        userId ? setLogin(true) : setLogin(false);
        console.log('USERID', userId);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   {
  //     setTimeout(() => {
  //       setChangeScreen(false);
  //     }, 2000);
  //   }
  // }, []);

  return (
    <NavigationContainer>
      {/* {changeScreen ? <FlashNavigation /> : <MainNavigation />} */}
      <MainNavigation />
    </NavigationContainer>
  );
}

export default NavigationRoot;
