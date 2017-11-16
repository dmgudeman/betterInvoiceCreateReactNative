import React, { Component } from 'react';
import {
 Picker,
 StyleSheet,
 Animated,
} from 'react-native';

class MyPicker3 extends Component {

render() {
 return (
   <Picker selectedValue = {this.props.language} onValueChange = {this.props.updateLanguage}>
    <Picker.Item label = "Java" value = "java" />
    <Picker.Item label = "JavaScript" value = "js" />
   </Picker>
 );
}
}
const styles = StyleSheet.create ({
});

export default MyPicker3;