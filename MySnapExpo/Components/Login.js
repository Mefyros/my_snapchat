import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Button, InputItem, List } from '@ant-design/react-native';
import axios from 'axios'

// import console = require('console');

export default class LoginForm extends React.Component
{

    static navigationOptions = {
        title: 'Please sign in',
      };

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password : '',
        };
      }

      handleSubmit() {
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
            <View style={{ paddingTop: 30 }}>
                <List renderHeader={'Connexion'}>
                    <InputItem
                    last={true}
                        type='email'
                        value={this.state.email}
                        onChange={value => {
                            this.setState({email : value})
                        }}
                    >
                        Email
                    </InputItem>
                    <InputItem
                        type='password'
                        value={this.state.password}
                        onChange={value => {
                            this.setState({password : value})
                        }}
                        placeholder='Password'
                    />
                    <List.Item>
                        <Button
                        onPress={this.handleSubmit.bind(this)}
                        type="primary"
                        >
                        Login
                        </Button>
                    </List.Item>
                </List>
            </View>
        )
    }
}