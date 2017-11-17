import React, { Component } from 'react';
import {Select, Option} from "react-native-chooser";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class MyPicker5 extends Component {

  constructor(props) {
    super(props);
    this.state = {value : "Select Me Please"}
  }
  onSelect(value, label) {
    this.setState({value : value});
  }

  render() {
    return (
      <View style={styles.container}>
        <Select
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.value}
            style = {{borderWidth : 1, borderColor : "green"}}
            textStyle = {{}}
            backdropStyle  = {{backgroundColor : "#d3d5d6"}}
            optionListStyle = {{backgroundColor : "#F5FCFF"}}
          >
          {/* <Option value = {{name : "azhar"}}>Azhar</Option> */}
          <Option value = "johnceena">Johnceena</Option>
          <Option value = "undertaker">Undertaker</Option>
          <Option value = "Daniel">Daniel</Option>
          <Option value = "Roman">Roman</Option>
          <Option value = "Stonecold">Stonecold</Option>
          <Option value = "Rock">Rock</Option>
          <Option value = "Sheild">Sheild</Option>
          <Option value = "Orton">Orton</Option>

        </Select>
      </View>
    );
  }
}

const styles = {
  container:
  {}
}