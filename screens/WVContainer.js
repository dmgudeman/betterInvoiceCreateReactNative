import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, TouchableHighlight, Text, View, StyleSheet, Dimensions } from 'react-native';
import * as actions from '../actions';

const webapp = require('../assets/MyWebView2/index.html');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class WVContainer extends Component {

  constructor( props ) {
    super( props );
    this.webView = null;
  }

  componentWillMount() {
    let navigator = this.props.navigation.state.params;
    
    // console.log('WVContainer COMPONENTWILLMOUNT navigator.description', navigator.description);
    // console.log('WVContainer COMPONENTWILLMOUNT navigator', navigator);
    const invoice = navigator.invoice;
    this.props.companyUpdate('invoice', invoice);
    // console.log('WVContainer COMPONENTWILLMOUNT this.props', this.props);
  }

  onMessage( event ) {
    console.log( "REACTNATIVE onMessage  event.nativeEvent.data ", event.nativeEvent.data );
  }

  sendPostMessage() {
    console.log( "REACTNATIVE sendPostMessage this.props.coName", `${this.props.coName}` );
    this.webView.postMessage( `${this.props.coName}`, {prop:'coName'} );
  }
  sendPostMessage2() {
    console.log( "REACTNATIVE sendPostMessage this.props.description", `${this.props.description}` );
    this.webView.postMessage (`${this.props.description} ` );
  }

  render() {
    // this.webview.postMessage("Hello from RN");
   
    return (

      <View style={{flex:1, alignItems: 'flex-end'}}> 
        <WebView
          // source={{uri: 'https://github.com/facebook/react-native'}}
          ref={webView => {this.webView = webView; }}
          onMessage={() =>this.onMessage()}
          source={ webapp}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          onLoad={()=>{
            this.sendPostMessage();
            this.sendPostMessage2();
            let x = this.props.coName;
          }
            }
          
          injectedJavaScript={`()=> {
              console.log('HI THERE')
              var p = document.getElementById('description');
              var q = document.getElementById('name')
              p.firstChild.nodeValue = "Description: "${this.props.description};
              q.firstChild.nodeValue = "Name: "${this.props.name};
            }
          `
        }
        />
        <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
          <Text style={{color: 'white', fontSize: 45}}>Send post message from react native</Text>
        </TouchableHighlight>
       </View>
    );
  }
}

const MapStateToProps = (state) => {
  // console.log('WVContainer MAPSTATETOPROPS state', state);
  if (state.invoice){
    const description = state.invoice.description || '';
    const coName = state.invoice.coName || '';
    return { coName, description }
  } else {
    return state
  }
}

export default connect(MapStateToProps, actions)(WVContainer);

const styles = {
  webview: {
    width: deviceWidth,
    height: deviceHeight
  }
}