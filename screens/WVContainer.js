import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView, TouchableHighlight, Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import * as actions from '../actions';
import axios from 'axios';

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
  sendWVtoCloud= () => {
      axios.post ('https://us-central1-better-invoice-firebase.cloudfunctions.net/pdfMaker',
      <WebView
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
          invoice = payload
          }
        }
        />)
        .then((response)=>{
          console.log('WebView Sent ');
          console.log('response', response);

        })
        .catch((error)=> {
          console.log('ERRRORRR', error);
        })
  }

  render() {
    const payload = this.props.invoice;
    const itemsArray = _.map(payload.items, (val, id) => { return { ...val, id}; });
    payload.itemsArray = itemsArray;
    console.log('WVContainer render payload', payload);
    return (
      <View style={{flex:1, alignItems: 'flex-end'}}> 
         <Button
          title= "Make PDF"
          onPress ={this.sendWVtoCloud} 
          backgroundColor={ 
            this.state.controls.hours.valid 
            ?'#bdc3c7':'#bdc3c745'}
        /> 
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