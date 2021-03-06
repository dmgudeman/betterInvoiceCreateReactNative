// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import * as actions from '../../actions';

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

  sendPostMessage() {
    const x = JSON.stringify({ type: 'onLoad', invoice: this.props.invoice });
    this.webView.postMessage(x);
  }
  sendPDFMessage = () => {
    console.log('inside sendPDFmessage ');
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

