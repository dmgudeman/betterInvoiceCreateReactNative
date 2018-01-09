
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
      // Set the region where your identity pool exists (us-east-1, eu-west-1)
      AWS.config.region = 'us-east-1';

// Configure the credentials provider to use your identity pool
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'IDENTITY_POOL_ID',
      });

// Make the call to obtain credentials
      AWS.config.credentials.get(function(){

        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
      });
      var identityId = AWS.config.credentials.identityId;

      console.logi('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhidentityId', identityId)
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
