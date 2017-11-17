import React, { Component } from 'react';
import MyPickerItem from './MyPickerItem';
import { View, Text } from 'react-native';

class MyPicker extends Component {

  render () {
    return (
      <MyPickerItem payload={'second page'}/>
    
    )
  }

}

export default MyPicker;