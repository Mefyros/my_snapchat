import React from 'react';
import { Container, Button, Content, Form, Item, Input, Label,Text, Footer, FooterTab, Icon } from 'native-base';
import axios from 'axios'
// import console = require('console');

export default class RegisterForm extends React.Component
{

    static navigationOptions = {
        headerTitle: 'Register',
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

      handleSubmit() {
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(reg.test(this.state.email) && this.state.password ){
          axios.post('https://api.snapchat.wac.epitech.eu/inscription', { email : this.state.email , password : this.state.password})
          .then(res => {
                 this.props.navigation.navigate('SignIn')
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
            <Button vertical onPress={() => {this.props.navigation.navigate('SignIn')}}>
              <Icon name="log-in" />
              <Text>Login</Text>
            </Button>
            <Button vertical active>
              <Icon name="add-circle" />
              <Text>Register</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
        )
    }
}