import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import my library
import NavigationRoot from './router/MainContainer';

function App() {
  return <NavigationRoot />;
}

export default App;
