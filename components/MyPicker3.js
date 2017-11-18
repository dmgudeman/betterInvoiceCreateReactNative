import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Animated,
  TouchableHighlight,
} from 'react-native';
import Style from './style';

class MyPicker3 extends Component {
  state = {user: ''}
  updateUser = (user) => {
     this.setState({ user: user })
  }
  render() {
     return (
        <View>
           <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
              <Picker.Item label = "Steve" value = "steve" />
              <Picker.Item label = "Ellen" value = "ellen" />
              <Picker.Item label = "Maria" value = "maria" />
           </Picker>
           <Text style = {styles.text}>{this.state.user}</Text>
        </View>
     )
  }
}

export default MyPicker3;

const styles = StyleSheet.create({
  text: {
     fontSize: 30,
     alignSelf: 'center',
     color: 'red'
  }
});
