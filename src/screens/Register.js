import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableWithoutFeedback, StatusBar,
  TextInput, SafeAreaView, Keyboard, TouchableOpacity,
  KeyboardAvoidingView, Linking, Alert, ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo';

import AuthHomeScreen from './AuthHome';
import { fetchApi } from '../services/api/index';
import { login } from '../services/auth';

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

var alphanumericRegex = new RegExp("^[a-zA-Z0-9]+$");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password_one: '',
      password_two: '',
      isUserNameValid: true,
      isPasswordValid: true,
      isUserNameEmpty: false,
      isPasswordEmpty: false,
      isPasswordConfirmationEmpty: false,
      isPasswordMatched: true,
      formData: {
        username: '',
        pubkey: '',
      },
      privateKey: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
        formData: {},
        privateKey: null,
      });
  }

  validation = async () => {
    if(this.state.username.length < 1){
      return;
    }

    if(this.state.username.length < 5) {
      this.setState({
        isUserNameValid: false,
        isUserNameEmpty: false,
      })
      Alert.alert(
        'Error',
        'Please choose a username with at least 5 characters',
        [
        {text: 'OK', onPress: () => console.log('Username invalid')},
        ],
        { cancelable: false }
      );
      return;
    }
    if(!alphanumericRegex.test(this.state.username) ) {
      this.setState({
        isUserNameValid: false,
        isUserNameEmpty: false,
      })
      Alert.alert(
        'Error',
        'Please choose a username containing only letters and numbers.',
        [
        {text: 'OK', onPress: () => console.log('Username invalid')},
        ],
        { cancelable: false }
      );
      return;
    }

    this.checkAvailability();
  }

  checkAvailability = () => {
    console.log('All valid');
    this.setState({
      isLoading: true,
    })
    fetchApi({
      url: 'register',
      payload: {
        checkAvailability: this.state.username
      },
      method: 'POST',
    })
      .then(response => {
        console.log('Response-->', response);
        this.setState({
          loginValid: null,
          isLoading: false,
        })
        if (response.error){
          Alert.alert(
            'Error',
            response.error,
            [
            {text: 'OK', onPress: () => console.log('Username invalid')},
            ],
            { cancelable: false }
          );
          return;
        }
        // TODO: only send to verify phone if phone not already verified
        this.props.navigation.navigate('RegisterVerifyPhone', { username: this.state.username });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          loading: false,
          errors: true,
        });
      });
  }

  onContinuePressed = () => {
    console.log('Continue Credentials', this.state.username);
    this.validation();
  }
  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>

            <Text style={styles.title}>Choose a Username</Text>
            <View style={styles.loginContainer}>
              <TextInput underlineColorAndroid="transparent" style={styles.input}
                placeholder=""
                placeholderTextColor='rgba(255,255,255,0.8)'
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                onChangeText={ (uname) => this.setState({ username: uname })}
                autoFocus={true}
                selectionColor='rgba(255,165,0,0.8)'
                placeholderTextColor='#FFF'
              />
  </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onContinuePressed}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

              <View style={styles.bottomContainer}>
                <Text style={{
                  color: 'white',
                  marginTop: 30,
                  textAlign: 'center',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  alignContent: 'flex-end'
                  }}
                onPress={() => this.props.navigation.goBack()}>
                Have an account? Sign In
                </Text>


            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.isLoading &&
        <ActivityIndicator style={styles.indicator} size="large"/> }
      </LinearGradient>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1899cc',
    flexDirection: 'column',
    paddingTop: 20,
    justifyContent: 'space-between'
  },

  content: {
    marginTop: 100,
    marginHorizontal: 50,
  },

  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  title: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '400',
  },

  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20,
    marginBottom: 0
  },

  loginContainer: {
    //alignItems: 'center',
    //marginHorizontal: 50,
    marginTop: 40,
    marginBottom: 80,
  },

  input: {
    height: 40,
    marginTop: 20,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#FFF',
    fontWeight: '400',
    textAlign: 'center',
  },

  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    marginTop: 40,
    borderRadius: 30
  },

  buttonText: {
    textAlign: 'center',
    color : 'black',
    fontWeight: '400',
    fontSize: 19
  },

  bottomContainer: {
    marginTop: 30,
    justifyContent: 'space-between'
  },

  bottom: {
    alignContent: 'flex-end'
  },

  image: {
    // height: 100,
    // width: 100,
    // marginBottom: '5%'
  },

  validation: {
    marginBottom: 20,
  },

  usernameValidation: {
    color: 'red',
    alignSelf: 'center',
  }
})


/*
<TextInput underlineColorAndroid="transparent" style={styles.input}
  placeholder="Password"
  placeholderTextColor='rgba(255,255,255,0.8)'
  returnKeyType='go'
  secureTextEntry={true}
  autoCorrect={false}
  ref={"txtPassword"}
  onChangeText={
    (pwd) => this.setState({ password_one: pwd })
  }
  value={this.state.password_one}
  placeholderTextColor='#FFF'
/>
<TextInput underlineColorAndroid="transparent" style={styles.input}
  placeholder="Confirm Password"
  placeholderTextColor='rgba(255,255,255,0.8)'
  returnKeyType='go'
  secureTextEntry={true}
  autoCorrect={false}
  ref={"txtPassword"}
  onChangeText={
    (pwd) => this.setState({ password_two: pwd })
  }
  value={this.state.password_two}
  placeholderTextColor='#FFF'
/>
*/
