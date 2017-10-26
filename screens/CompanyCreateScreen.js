
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import TestScreen from './TestScreen';

class CompanyCreateScreen extends Component {

  
  render() {
    console.log('CompanyCreateScreen render this.props', this.props);
    return (
      <View>
        <Text>CompanyCreateScreen</Text>
        <Button
          title= "TEST"
          onPress={() => {
            console.log('Button Pressed');
            this.props.navigation.navigate('tertiary')} 
          }
        />
      </View>
    )
  }
}
export default CompanyCreateScreen;