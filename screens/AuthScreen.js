
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../components/common';
import * as actions from '../actions';

const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const IDENTITY_POOL_ID = 'us-east-1:92ee94bb-b679-45b6-8fce-93030e8d9406';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    if (this.props.token) {
      // aws
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IndentityPoolId: IDENTITY_POOL_ID,
        Logins: {
          'graph.facebook.com': this.props.token,
        },
      });
      // Obtain AWS credentials
      AWS.config.credentials.get(() => {
        // Access AWS resources here.
        console.log(AWS.config.credentials);
      });
      // Original
      this.onAuthComplete(this.props);
    } else {
      console.log('There was a problem signing you in');
    }
    // uncomment to clear token from local storage//////////////////////
    // AsyncStorage.removeItem('fb_token');
    // console.log("AuthScreen componentDidMount this.props",this.props);
  }

  componentWillReceiveProps(nextProps) {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
      <Spinner />
      </View>
      // <View>
      //   <Text> auth screen </Text>
      //   <Text> auth screen </Text>
      //   <Text> auth screen </Text>
      //   <Text> auth screen </Text>

      //   <Text> auth screen </Text>
      //   </View>
    );
  }
}
function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
