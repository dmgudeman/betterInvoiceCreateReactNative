import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import {Option} from "react-native-chooser";

const MyPickerItem= ({option, renderItem}) => {
  componentWillMount = ()=> {
    console.log('MyPickerItem children', children );
    console.log('MyPickerItem option', option);
  }
  
  return (
      <View >
        <TouchableWithoutFeedback onPress={renderItem}>
        <Option value ={ `${option}`}>{option}</Option>
        </TouchableWithoutFeedback>
      </View>
  )
}

export default MyPickerItem;