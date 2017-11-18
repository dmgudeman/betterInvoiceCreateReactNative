import React from 'react';
import { StyleSheet, Text, View, AppRegistry} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import firebase from 'firebase';
import EStyleSheet from 'react-native-extended-stylesheet';


import Navigator from './config/routes';
import store from './store';

EStyleSheet.build({
  $primaryBlue: '#4f6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',
  
  $white: '#FFFFFF',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',


});

export default class App extends React.Component {
  state = { loggedIn: null };
  
    componentWillMount() {
      firebase.initializeApp({
        apiKey: "AIzaSyAfldBZz7sGRngB3p1GKgRTHxsEzT5rHGo",
        authDomain: "better-invoice-firebase.firebaseapp.com",
        databaseURL: "https://better-invoice-firebase.firebaseio.com",
        projectId: "better-invoice-firebase",
        storageBucket: "better-invoice-firebase.appspot.com",
        messagingSenderId: "1016088883434"
      });
  
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    
    }
  
  render() {
    
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
