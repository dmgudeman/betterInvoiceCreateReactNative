

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class ItemEditScreen extends Component {
  
 
  nameChange() {
    console.log('Text has changed');
    console.log('this.props');
  }
  render() {
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput 
          onChangeText={this.nameChange}
        />
      </View>
    )
  }
}

export default ItemEditScreen;