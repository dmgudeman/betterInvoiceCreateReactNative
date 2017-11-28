import React, { Component } from 'react';
import { WebView } from 'react-native';
const webapp = require('../assets/MyWebView/index.html');

class MyWebView extends Component {

  onMessage(data) {
    //Prints out data that was passed.
    console.log(data);
  }


  render() {
    // this.webview.postMessage("Hello from RN");
    
    
    return (
      <WebView
        // source={{uri: 'https://github.com/facebook/react-native'}}
       
        ref="webview"
        onMessage={this.onMessage}
        source={ webapp}
        style={{marginTop: 20}}
      />
    );
  }
}
export default MyWebView;