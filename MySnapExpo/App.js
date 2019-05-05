
import React from 'react';
import * as Expo from "expo";
import {  AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Oui from './Components/App'
// Later on in your component
export default class App extends React.Component
{
    constructor() {
        super();
        this.state = {
          isReady: false
        };
      }
      componentWillMount() {
        this.loadFonts();
    }

    async loadFonts() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
          });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
          return <Expo.AppLoading />;
        }
        return (
            <Oui />
        );
      }
    
}
