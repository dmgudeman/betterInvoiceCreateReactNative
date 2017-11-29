import React, { Component } from 'react';
import { WebView, TouchableHighlight, Text, View } from 'react-native';
const webapp = require('../assets/MyWebView/index.html');

class MyWebView extends Component {

  constructor( props ) {
    super( props );

    this.webView = null;
}

onMessage( event ) {
    console.log( "(Method in MyWebview) On Message", event.nativeEvent.data );
}

sendPostMessage() {
    console.log( "Sending post message" );
    this.webView.postMessage( "Post message from react native" );
}

  render() {
    // this.webview.postMessage("Hello from RN");
   
    return (
       
      <WebView
        // source={{uri: 'https://github.com/facebook/react-native'}}
        ref={( webView ) => this.webView = webView}
        onMessage={this.onMessage}
        source={ webapp}
        style={{marginTop: 20}}
      >
       <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
  <Text style={{color: 'white', fontSize: 45}}>Send post message from react native</Text>
</TouchableHighlight>
    </WebView>
    );
  }
}
export default MyWebView;