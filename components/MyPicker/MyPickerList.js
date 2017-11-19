import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Picker, FlatList} from 'react-native';
import MyPickerItem from './MyPicker/';
// import {Option} from "react-native-chooser";

const MyPickerList= ({optionsArray}) => {
  console.log('MYPICKERLIST optionsArray', optionsArray)
  renderItem =({item, index})=> {
    console.log('invoicesScreen renderItem item, index, item.id ', item, item.id, index);
    // console.log('invoicesScreen renderItem  this.props.optionsArray[index].option',  `${this.props.optionsArray[index].option}`);
    // console.log(this.props.optionsArray);
    const option =optionsArray[index].option;
    return  (
      <Picker.Item label={option} value={option}/>
    )
   
  }
 
return (
  // <View >
  //    {console.log('MYPICKERLIST optionsArray', optionsArray)}
  //    {this.renderItem()}
  // </View>
  // null
  <Picker>
  <FlatList
  data ={optionsArray}
  renderItem={this.renderItem}
  keyExtractor={(item) =>{item}}/>
  </Picker>

)
}

export default MyPickerList;