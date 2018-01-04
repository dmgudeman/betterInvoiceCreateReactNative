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
    console.log('CWM      INNNNNNNNNNNNN INVOICEWEBVIEWCONTAITNER');
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
  tempAlert(msg,duration) {
    const el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
    el.innerHTML = msg;
    setTimeout(function(){
      el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
  }

  sendPDFMessage = () => {
    console.log('inside sendPDFmessage x', x);
    // this.webView.postMessage(x);
    // axios.post("https://it8sgn3kx5.execute-api.us-east-1.amazonaws.com/dev/makepdf", {"html_base64" : "PGJvZHk+SGVsbG8gd29ybGQ8L2JvZHk+"})
     // axios.post('https://it8sgn3kx5.execute-api.us-east-1.amazonaws.com/dev/makepdf', {"html_base64" : "PGJvZHk+SGVsbG8gd29ybGQ8L2JvZHk+"})
    // const x = `
    //
    //     axios.post("https://it8sgn3kx5.execute-api.us-east-1.amazonaws.com/dev/makepdf", {"html_base64" : "PGJvZHk+SGVsbG8gd29ybGQ8L2JvZHk+"})
    //   alert("after axios");
    //
    // `
    // console.log(typeof x === 'string');
    const x = `
      var markup = document.documentElement.innerHTML;
      var encodedData = btoa(markup).toString();
      console.log('ENCODED DATA', encodedData);

      axios.post("https://it8sgn3kx5.execute-api.us-east-1.amazonaws.com/dev/makepdf", 
      {"html_base64" : encodedData})
      `;
    this.webView.injectJavaScript(x);
  }
  

  render() {
    // this.webview.postMessage("Hello from RN");

    const payload = this.props.invoice;
    const itemsArray = _.map(payload.items, (val, id) => {
      return { ...val, id };
    });
    payload.itemsArray = itemsArray;
    console.log('INVOICEWVContainer render payload', payload);
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
            this.sendPDFMessage();
          //   const data = btoa(`
          //         <html>
          //           <div>
          //             <h1>Hi there</h1>
          //           </div>
          //         </html>
          //         `);
          //   axios.post(
          //     'https://it8sgn3kx5.execute-api.us-east-1.amazonaws.com/dev/makepdf',
          // //     // 'https://sw9cyyeshd.execute-api.us-east-1.amazonaws.com/dev/mp-create8?url=https://github.com/adieuadieu/serverless-chrome',
          //     {
          //       html_base64: data,
          //     },
          //   )
          //     .then(function (response) {
          //       console.log(response);
          //     })
          //     .catch(function (error) {
          //       console.log(error);
          //     });
          //   ;
            }
          }
        />

        {/* <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.sendPostMessage()}>
          <Text style={{color: 'white', fontSize: 45}}>Send post message from react native</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const MapStateToProps = (state) => {
  console.log('INVOICEWVContainer MAPSTATETOPROPS state', state);
  if (state.invoice) {
    const { invoice } = state;
    const description = state.invoice.description || '';
    const coName = state.invoice.coName || '';
    return { coName, description, invoice };
  }
  return state;
};

export default connect(MapStateToProps, actions)(InvoiceWebViewContainer);

