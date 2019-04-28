import React from 'react';
import { Text, View } from 'react-native';
import { Button, InputItem, List } from '@ant-design/react-native';
import axios from 'axios'
// import console = require('console');

export default class RegisterForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password : '',
          Cpassword :''
          
        };
      }

      handleSubmit() {
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(reg.test(this.state.email) && this.state.password == this.state.Cpassword){
          axios.post('https://api.snapchat.wac.epitech.eu/inscription', { email : this.state.email , password : this.state.password})
          .then(res => {
                 console.log(res.data)
          })
          .catch(err => {
              console.log('oui')
          })
        } else {
            alert('non')
        }
      }

    render () {
        return (
            <View style={{ paddingTop: 30 }}>
                <List renderHeader={'Inscription'}>
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
                    <InputItem
                    last={true}
                        type='password'
                        value={this.state.Cpassword}
                        onChange={value => {
                            this.setState({Cpassword : value})
                        }}
                        placeholder='Password Confirmation'
                    />
                    <List.Item>
                        <Button
                        onPress={this.handleSubmit.bind(this)}
                        type="primary"
                        >
                        Register
                        </Button>
                    </List.Item>
                </List>
            </View>
        )
    }
}