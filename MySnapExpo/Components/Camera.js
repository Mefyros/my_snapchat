import React from 'react';
import { Container, Header, Button, Content, ActionSheet, Text, Root,Form, Item,  Label,Footer, FooterTab,Icon } from "native-base";
import { Slider,AsyncStorage  } from 'react-native';
import { Font, ImagePicker, AppLoading,Permissions } from 'expo';
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
  constructor(props) {
    super(props);
    this.state = {
      token : '',
      people : [],
      test : false,
      visible: false,
      picked: null,
      duration : 1,
      image : '',
      picked : 'To Whom',
      imageP : false
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
    axios.get('https://api.snapchat.wac.epitech.eu/all',{headers : {token : token }})
    .then(res => {
      for(let i = 0 ; i < res.data.data.length ; i++){
        res.data.data[i].key = res.data.data[i].email.toLowerCase()
        res.data.data[i].label = res.data.data[i].email
      }
      this.setState({people : res.data.data})
    })
    .catch(err => {
      console.log(err)
    })
    this.setState({test : true})
  } catch {

  }
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };
  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
    console.log(result)
    this.setState({ image: result});
    this.setState({ imageP: true})
    console.log('oui')
  };



  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false,
    });
    console.log(result)
    this.setState({ image: result });
    this.setState({ imageP: true})
    

  };

  async handleSend () {
    if(this.state.imageP && this.state.picked != null){
      let localUri = this.state.image.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let form = new FormData();
      form.append('duration' , this.state.duration)
      form.append('to' , this.state.picked)
      form.append('image' ,  { uri: localUri, name: filename, type })
      axios.post('https://api.snapchat.wac.epitech.eu/snap',  form ,{headers : {"Content-Type": "multipart/form-data", token : this.state.token}})
      .then(res => { 
        console.log(res.data)
      }) 
      .catch(err => {
        console.log(err)
        AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Auth');
      })
    } else {
      alert('non')
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
          return(
            <Container>
        <Header />
        <Content>
          <Form>
          <Item stackedLabel>
          <Label>Duration</Label>
          <Slider
    style={{width: 200, height: 40}}
    value={this.state.duration}
    minimumValue={1}
    maximumValue={60}
    minimumTrackTintColor="#455890"
    maximumTrackTintColor="#000000"
    onValueChange={value => this.setState({duration : Math.round(value)})}
  />
            <Text>{this.state.duration} Sec</Text>
          </Item>
        <Root>
          
          <Button
          style={{marginBottom: 10}}
          rounded
          block
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Testing ActionSheet"
              },
              buttonIndex => {
                if(buttonIndex == 0) {
                  this.useCameraHandler()
                } else if (buttonIndex == 1) {
                  this.useLibraryHandler()
                }
              }
            )}
          >
            <Text>{this.state.imageP ? 'You picked your image' : 'Pick your image'}</Text>
          </Button>
          </Root>
         
          </Form>
          <Button
          style={{marginBottom: 20}}
          success
          rounded
          block
           onPress={this.onShow}><Text>{this.state.picked}</Text></Button>
          <ModalFilterPicker
          visible={visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={this.state.people}
        />

        <Button rounded block danger onPress={this.handleSend.bind(this)}><Text>Send</Text></Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="log-out" onPress={() => {AsyncStorage.removeItem('user')
                                            this.props.navigation.navigate('Auth')}}/>
              <Text>Logout</Text>
            </Button>
            <Button vertical onPress={()=>{this.props.navigation.navigate('Home')}}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical active >
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
      

      onShow = () => {
        this.setState({ visible: true });
      }
    
      onSelect = (picked) => {
        this.setState({
          picked: picked,
          visible: false
        })
      }
    
      onCancel = () => {
        this.setState({
          visible: false
        });
      }
      
      
}