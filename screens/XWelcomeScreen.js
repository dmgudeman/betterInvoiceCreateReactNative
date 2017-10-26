import _ from 'lodash';
import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { View, Text, AsyncStorage } from 'react-native';

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    // let token = await AsyncStorage.getItem('fb_token');
    // console.log("WELCOME SCREEN 02 is token null or false ", (token === null || token === false ));


    // if (token) {
    //   console.log("WELCOME SCREEN 03 In componenWilMOunt token =    ", token);
    //   // this.setState({ token });
    //   this.props.navigation.navigate('companies');
    // } else {
    //   console.log("WELCOME SCREEN 04 In componenWilMOunt4     ", token);
      // this.setState({ token: false })
      this.props.navigation.navigate('auth');
    // }
  }


  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }
  }
}

export default WelcomeScreen;