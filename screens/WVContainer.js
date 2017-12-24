import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, TouchableHighlight, Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import * as actions from '../actions';

// const webapp = require('../assets/MyWebView2/index.html');
const webapp = require('../assets/InvoicesPrePDF.html')
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class WVContainer extends Component {

  constructor( props ) {
    super( props );
    this.webView = null;
  }

  componentWillMount() {
    // let navigator = this.props.navigation.state.params;
    
    // // console.log('WVContainer COMPONENTWILLMOUNT navigator.description', navigator.description);
    // // console.log('WVContainer COMPONENTWILLMOUNT navigator', navigator);
    // const invoice = navigator.invoice;
    // this.props.companyUpdate('invoice', invoice);
    // console.log('WVContainer COMPONENTWILLMOUNT this.props', this.props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Invoice',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={40}
        onPress= {  _.debounce(()=> navigation.goBack(), 1000,{'leading':true, 'trailing':true}) }
      />,
        
    }
  }
  onMessage( event ) {
    console.log( "REACTNATIVEEEEEEEEEEEEEEEEEEEonMessage  event.nativeEvent.data ", event.nativeEvent.data );
  }

  sendPostMessage() {
    console.log( 'REACTNATIVE sendPostMessage JSON.stringify(this.props.invoice)', JSON.stringify(this.props.invoice) );
    let x = JSON.stringify(this.props.invoice)
    this.webView.postMessage(x);
  }
  // sendPostMessage2() {
  //   console.log( "REACTNATIVE sendPostMessage this.props.description", `${this.props.description}` );
  //   this.webView.postMessage (`${this.props.description}` );
  //   this.webView.invoice =  this.props.invoice
  // }

  render() {
    // this.webview.postMessage("Hello from RN");

    const payload = this.props.invoice;
    const itemsArray = _.map(payload.items, (val, id) => {
      
        return { ...val, id};
      });
      payload.itemsArray = itemsArray;
      console.log('WVContainer render payload', payload);
    return (

      <View style={{flex:1, alignItems: 'flex-end'}}> 
        <WebView
          // source={{uri: 'https://github.com/facebook/react-native'}}
          ref={webView => {this.webView = webView; }}
          onMessage={() =>this.onMessage}
          source={ webapp}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          onLoad={()=>{
            this.sendPostMessage();
            // this.sendPostMessage2();
            invoice = payload
          }
          
            }
          
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
        {/* <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
          <Text style={{color: 'white', fontSize: 45}}>Send post message from react native</Text>
        </TouchableHighlight> */}
       </View>
    );
  }
}

const MapStateToProps = (state) => {
  console.log('WVContainer MAPSTATETOPROPS state', state);
  if (state.invoice){
    const invoice = state.invoice;
    const description = state.invoice.description || '';
    const coName = state.invoice.coName || '';
    return { coName, description, invoice }
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