import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

// import my library
import {
  HelloScreen,
  HomeScreen,
  RegisterScreen,
  LoginScreen,
  LoadingScreen,
  AddProduct,
  ProfileScreen,
  ProductDetailScreen,
  CartScreen,
} from './Screens';
import {CHILEAN_FIRE, KENYAN_COPPER} from '../components/Colors';

function NavigationRoot() {
  // const dispatch = useDispatch();
  const [changeScreen, setChangeScreen] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setChangeScreen(false);
    }, 2200);
  });

  const SplashStack = createStackNavigator();
  const SplashNavigation = () => (
    <SplashStack.Navigator screenOptions={{headerShown: false}}>
      <SplashStack.Screen name="HelloScreen" component={HelloScreen} />
    </SplashStack.Navigator>
  );

  const Tab = createBottomTabNavigator();
  const TabNavigation = () => (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: CHILEAN_FIRE,
        inactiveTintColor: '#262626',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="add-circle-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <AntDesign name="shoppingcart" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <AntDesign name="user" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  const MainStack = createStackNavigator();
  const MainNavigation = () => (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoadingScreen">
      <MainStack.Screen name="LoadingScreen" component={LoadingScreen} />
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="AddProduct" component={AddProduct} />
      <MainStack.Screen name="TabNavigation" component={TabNavigation} />
      <MainStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
    </MainStack.Navigator>
  );

  return (
    <NavigationContainer>
      {changeScreen ? <SplashNavigation /> : <MainNavigation />}
    </NavigationContainer>
  );
}

export default NavigationRoot;
