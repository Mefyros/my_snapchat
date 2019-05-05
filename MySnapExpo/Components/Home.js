import React from 'react';
import { Container, Header, Button, Content, ActionSheet, Text, Root,Form, Item,  Label,Footer, FooterTab,Icon } from "native-base";
import { AsyncStorage, ImageBackground, Dimensions  } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';


import ModalFilterPicker from 'react-native-modal-filter-picker'
import axios from 'axios'
// import console = require('console');

var BUTTONS = [
  { text: "Camera", icon: "camera", iconColor: "#2c8ef4" },
  { text: "Image", icon: "image", iconColor: "#f42ced" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Home extends React.Component
{

  static navigationOptions = {
    headerTitle: 'WhatSnap',
    headerStyle: {
      backgroundColor: '#3F51B5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      token : '',
      snaps : [],
      duration : 1,
      image : '',
      picked : 'To Whom',
      imageP : false,
      dure : 0
    };
  }

  async componentDidMount() {
    try{
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    let token = await AsyncStorage.getItem('user');
    this.setState({token : token})
    console.log(token)
    axios.get('https://api.snapchat.wac.epitech.eu/snaps',{headers : {token : token }})
    .then(res => {
      this.setState({snaps : res.data.data})
    })
    .catch(err => {
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Auth');
    })
    this.setState({test : true})

  } catch {

  }
  }


      deleteData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          this.props.navigation.navigate('Auth');
        } catch (error) {
          // Error retrieving data
        }
      };

      render () {
        const { visible, picked } = this.state;
        if(this.state.test){
          if(this.state.imageP){
            return(
              
<ImageBackground source={{uri : this.state.image}} style={{
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
    
  }}onLoad={this._onLoad.bind(this)} >
  <Text>{this.state.dure}</Text>
  </ImageBackground>
            )
          } else 
          return(
            <Container>
              
        <Content>
            {this.state.snaps.map((snap, i) => 
                 <Button key ={i} info rounded block style={{marginTop: 10}} onPress={this.ShowSnap.bind(this, snap.snap_id, snap.duration)}><Text>{snap.from}</Text></Button>
            )}
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="log-out" onPress={() => {AsyncStorage.removeItem('user')
                                            this.props.navigation.navigate('Auth')}}/>
              <Text>Logout</Text>
            </Button>
            <Button vertical active >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => {this.props.navigation.navigate('Camera')}}>
              <Icon active name="camera" />
              <Text>Snap</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
          )
            } else {
              return (<AppLoading/>)
            }
      }

      _onLoad() {
        let oui = setInterval(() => this.setState({dure : this.state.dure -1 }),1000)
        setTimeout(() => {
          axios.post('https://api.snapchat.wac.epitech.eu/seen',{id : this.state.id},{headers : {token : this.state.token }})
          .then(res => {
          console.log(res.data)
          axios.get('https://api.snapchat.wac.epitech.eu/snaps',{headers : {token : this.state.token }})
          .then(res => {
          this.setState({snaps : res.data.data})
          })
        })
         .catch(err => {
           console.log(err)
         })
         clearInterval(oui)
        this.setState({imageP : false})
        }, this.state.duration * 1000);
      }
      
      ShowSnap(id,duration) {
          console.log(id)
          this.setState({image: `https://api.snapchat.wac.epitech.eu/snap/${id}`})
          this.setState({imageP : true})
          this.setState({id : id}),
          this.setState({duration : duration})
          this.setState({dure : duration})
      }
      
      
}