import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import my library
import {HelloScreen, HomeScreen, RegisterScreen, LoginScreen} from './Screens';

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
    initialRouteName="LoginScreen">
    <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    <MainStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <MainStack.Screen name="LoginScreen" component={LoginScreen} />
  </MainStack.Navigator>
);

function NavigationRoot() {
  // const [changeScreen, setChangeScreen] = useState(true);
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
