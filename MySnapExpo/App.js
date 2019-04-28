
import React, {Component} from 'react';
import { Text, View} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Register from './Components/Register';
import Login from './Components/Login';
import HomeScreen from './Components/Home';
import AuthLoadingScreen from './Components/Auth';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

// Later on in your component

const AppStack = createStackNavigator({ Home: HomeScreen});
const AuthStack = createStackNavigator({ SignIn: Login, SignUp: Register });

export default createAppContainer(createSwitchNavigator(
  
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));