
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    if (this.props.token){
    this.onAuthComplete(this.props);
    }
    // uncomment to clear token from local storage//////////////////////
  
    // AsyncStorage.removeItem('fb_token');
    
    // console.log("AuthScreen componentDidMount this.props",this.props);
  }

  componentWillReceiveProps(nextProps){
    // console.log('AuthScreen componentWillReceiveProps nextProps =', nextProps);
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    // console.log('AuthScreen onAuthComplete props.token.token  ', props.token.token);
    // console.log('AuthScreen onAuthComplete props.token.userId ', props.token.userId);
    if (props.token) {
      this.props.navigation.navigate('companies');
    }
  }
  render() {
    return (
      <View>
        <Text> auth screen </Text>
        <Text> auth screen </Text>
        <Text> auth screen </Text>
        <Text> auth screen </Text>

        <Text> auth screen </Text>
        </View>
    )
  }
}
function mapStateToProps({ auth }) {
  return {token: auth.token}
}

export default connect(mapStateToProps, actions)(AuthScreen);