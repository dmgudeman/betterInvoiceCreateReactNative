import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
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

  componentWillMount() {
    // let navigator = this.props.navigation.state.params;
    // // console.log('WVContainer COMPONENTWILLMOUNT navigator', navigator);
    // const invoice = navigator.invoice;
    // this.props.companyUpdate('invoice', invoice);
    // console.log('WVContainer COMPONENTWILLMOUNT this.props', this.props);
  }

  // onMessage(event) {
  //   console.log('REACTNATIVEEEEEEEEEEEEEEEEEEEonMessage  event.nativeEvent.data ', event.nativeEvent.data);
  // }

  sendPostMessage() {
    console.log('REACTNATIVE sendPostMessage this.props.invoice', JSON.stringify(this.props.invoice));
    const x = JSON.stringify({ type: 'onLoad', invoice: this.props.invoice });
    console.log('INVOICEWEBVIEWCONTAINER  this.webView', this.webView);
    this.webView.postMessage(x);
  }

  sendPDFMessage() {
    const x = JSON.stringify({ type: 'pdf' });
    this.webView.postMessage(x);
  }

  render() {
    // this.webview.postMessage("Hello from RN");

    const payload = this.props.invoice;
    const itemsArray = _.map(payload.items, (val, id) => {
      return { ...val, id };
    });
    payload.itemsArray = itemsArray;
    console.log('WVContainer render payload', payload);
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
          //   injectedJavaScript={`()=> {
          //       console.log('HI THERE')
          //       var p = document.getElementById('description');
          //       var q = document.getElementById('name')
          //       p.firstChild.nodeValue = "Description: "${this.props.description};
          //       q.firstChild.nodeValue = "Name: "${this.props.name};
          //     }
          //   `
          // }
        />
        <Button
          title="Send PDF"
          onPress={() => {
            console.log('Inside onPress');
            // this.sendPDFMessage();
            axios.post(
              'https://jjgb7mjmt0.execute-api.us-west-1.amazonaws.com/dev/make-pdf',
              {
                message: `
                  <html>
                    <div>
                      <h1>Hi there</h1>
                    </div>
                  </html>
                  `
                ,
              },
            )
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            ;
          }}
        />
        {/* <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
          <Text style={{color: 'white', fontSize: 45}}>Send post message from react native</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const MapStateToProps = (state) => {
  console.log('WVContainer MAPSTATETOPROPS state', state);
  if (state.invoice) {
    const { invoice } = state;
    const description = state.invoice.description || '';
    const coName = state.invoice.coName || '';
    return { coName, description, invoice };
  }
  return state;
};

export default connect(MapStateToProps, actions)(InvoiceWebViewContainer);

