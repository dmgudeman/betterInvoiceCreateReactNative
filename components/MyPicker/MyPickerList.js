import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Picker } from 'react-native';
import MyPicker from './MyPicker';
// import {Option} from "react-native-chooser";

const MyPickerList= ({optionsArray}) => {
  renderItem =({item, index})=> {
    console.log('invoicesScreen renderItem item, index, item.id ', item, item.id, index);
    console.log('invoicesScreen renderItem  this.props.optionsArray[index].option',  `${this.props.optionsArray[index].option}`);
    // console.log(this.props.optionsArray);
    const option = this.props.optionsArray[index].option;
    return  (
      <MyPickerItem option ={option} /> 
    )
   
  }
return (
  <FlatList 
  data ={this.props.optionsArray}
  renderItem={this.renderItem}
  keyExtractor={(item) =>{item}}
/>
)
}

export default MyPickerList;