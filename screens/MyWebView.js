import React, { Component } from 'react';
import { WebView, TouchableHighlight, Text, View, StyleSheet, Dimensions } from 'react-native';

const webapp = require('../assets/MyWebView/index.html');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


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



export default MyWebView;

const styles = {
  webview: {
    width: deviceWidth,
    height: deviceHeight
  }
}