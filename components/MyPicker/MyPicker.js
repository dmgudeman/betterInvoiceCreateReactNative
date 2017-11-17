import React, { Component } from 'react';
import MyPickerItem from './MyPickerItem';
import { View, Text } from 'react-native';

class MyPicker extends Component {

  render () {
    const {payload}=this.props;
    return (
      <MyPickerItem payload={payload}/>
    
    )
  }

}

export default MyPicker;