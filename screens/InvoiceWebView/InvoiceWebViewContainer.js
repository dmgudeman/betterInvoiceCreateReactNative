// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import _ from 'lodash';
import * as actions from '../../actions';

const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const IDENTITY_POOL_ID = 'us-east-1:92ee94bb-b679-45b6-8fce-93030e8d9406';

const webapp = require('./InvoiceWebView.html');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const styles = {
  webview: {
    width: deviceWidth,
    height: deviceHeight,
  },
};

class InvoiceWebViewContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Invoice',
      headerLeft: <Icon.Button
        name="angle-left"
        backgroundColor="transparent"
        color="gray"
        size={40}
        onPress={_.debounce(() => {
          navigation.goBack();
        }, 1000, { leading: true, trailing: true })}
      />,
    };
  };
  constructor(props) {
    super(props);
    this.webView = null;
  }
  componentWillMount() {
    this.awsAuth();
  }

  awsAuth() {

    if (this.props.token) {

      // aws
      // Set the region where your identity pool exists (us-east-1, eu-west-1)
      AWS.config.region = 'us-east-1';

// Configure the credentials provider to use your identity pool
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
      });
      console.log('AAAAAAAAAAAAAAAWS.config.credentials', AWS.config.credentials);
// Make the call to obtain credentials
      AWS.config.credentials.get(function () {

        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
      });
      var identityId = AWS.config.credentials.identityId;
      console.log('identityId', identityId);

    }
  }
  sendPostMessage() {
    const x = JSON.stringify({ type: 'onLoad', invoice: this.props.invoice });
    this.webView.postMessage(x);
  }
  sendPDFMessage = () => {
    console.log('inside sendPDFmessage ');
    const apiUrl = 'axios.post("https://it8sgn3kx5.execute-api.us-east-1.amazonaws.com/dev/makepdf';
    axios.get(apiUrl, { headers: { "Authorization": `Bearer-${this.props.token}` } });
    const x = `
      var markup = document.documentElement.innerHTML;
      var encodedData = btoa(markup).toString();
      console.log('ENCODED DATA', encodedData);

      axios.post("https://it8sgn3kx5.execute-api.us-east-1.amazonaws.com/dev/makepdf", 
        {"html_base64" : encodedData})
        .then((response)=>{ console.log(response); })
        .catch((err)=> {console.log(err); });
      `;
    this.webView.injectJavaScript(x);
  }

  render() {
    const payload = this.props.invoice;
    const itemsArray = _.map(payload.items, (val, id) => {
      return { ...val, id };
    });
    payload.itemsArray = itemsArray;
    return (

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <WebView
          ref={(webView) => {
            this.webView = webView;
          }}
          source={webapp}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          onLoad={() => {
            this.sendPostMessage();
          }}
        />
        <Button
          title="Send PDF"
          onPress={() => {
            console.log('Inside onPress');
            this.sendPDFMessage();
            }
          }
        />
      </View>
    );
  }
}

const MapStateToProps = (state) => {

  const { fUserId, token } = state.auth;
  console.log('token', token);
  if (state.invoice) {
    const { invoice } = state;
    const description = state.invoice.description || '';
    const coName = state.invoice.coName || '';
    return { coName, description, fUserId, invoice, token };
  }
  return state;
};

export default connect(MapStateToProps, actions)(InvoiceWebViewContainer);

