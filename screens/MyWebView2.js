import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, TouchableHighlight, Text, View, StyleSheet, Dimensions } from 'react-native';
import * as actions from '../actions';

const webapp = require('../assets/MyWebView2/index.html');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class MyWebView2 extends Component {

  constructor( props ) {
    super( props );

    this.webView = null;
}
componentWillMount() {
  let navigator = this.props.navigation.state.params;
   
  console.log('MYWEBVIEW2 COMPONENTWILLMOUNT navigator.description', navigator.description);
  console.log('MYWEBVIEW2 COMPONENTWILLMOUNT navigator', navigator);
  const invoice = navigator.invoice;
  this.props.companyUpdate('invoice', invoice);
  console.log('MYWEBVIEW2 COMPONENTWILLMOUNT this.props', this.props);
}

onMessage( event ) {
    console.log( "(Method in MyWebView2) On Message", event.nativeEvent.data );
}

sendPostMessage() {
    console.log( "Sending post message this.props", this.props );
    this.webView.postMessage( `THTHTHTHTH" ${this.props.description}` );
}

  render() {
    // this.webview.postMessage("Hello from RN");
   
    return (
      <View style={{flex:1, alignItems: 'flex-end'}}> 
        <WebView
          // source={{uri: 'https://github.com/facebook/react-native'}}
          ref={webView => {this.webView = webView; }}
          onMessage={this.onMessage}
          source={ webapp}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          
        />
        <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
          <Text style={{color: 'white', fontSize: 45}}>Send post message from react native</Text>
        </TouchableHighlight>
       </View>
    );
  }
}

const MapStateToProps = (state) => {
  console.log('MYWEBVIEW2 MAPSTATETOPROPS state', state);
  if (state.companies){
  const description = state.companies.description || '';
  return { description }
  } else {
    return state
  }
}

export default connect(MapStateToProps, actions)(MyWebView2);

const styles = {
  webview: {
    width: deviceWidth,
    height: deviceHeight
  }
}