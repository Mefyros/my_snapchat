import React from 'react';
import {  AsyncStorage } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Label,Text, Footer, FooterTab, Icon } from 'native-base';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'

// import console = require('console');

export default class LoginForm extends React.Component
{

  static navigationOptions = {
    headerTitle: 'Login',
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
          email: '',
          password : '',
        };
      }

      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
      }

      handleSubmit() {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(this.state.email)
        if(reg.test(this.state.email)){
        axios.post('https://api.snapchat.wac.epitech.eu/connection', { email : this.state.email , password : this.state.password})
        .then(res => {
              this.storeData('user',res.data.data.token)
              this.props.navigation.navigate('App');
        })
      } else {
          alert('non')
      }
      }
      
      storeData = async (key , value) => {
      try {
        await AsyncStorage.setItem(key, value)
      } catch (e) {
        console.log(e)
      }
      }

      

    render () {
        return (
          <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={(email) => {this.setState({email})}}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} value={this.state.password} onChangeText={(password) => {this.setState({password})}}/>
            </Item>
            <Button block rounded 
            onPress={this.handleSubmit.bind(this)}
            style={{
        marginTop : 30,
        backgroundColor : '#00cec9'
        }}>
            <Text>Primary</Text>
          </Button>
          </Form>
        </Content>
        <Footer danger>
          <FooterTab light>
            <Button vertical active>
              <Icon name="log-in" />
              <Text>Login</Text>
            </Button>
            <Button vertical onPress={() => {this.props.navigation.navigate('SignUp')}}>
              <Icon name="add-circle" />
              <Text>Register</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
        )
    }
}

