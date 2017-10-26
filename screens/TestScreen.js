
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class TestScreen extends Component {

  render() {

    return (
      <View>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Text>TestScreen</Text>
        <Button
          title= "ITEM EDIT"
          onPress={() => {
            this.props.navigation.navigate('itemEdit')} 
          }
        />
      </View>
    )
  }
}

export default TestScreen;