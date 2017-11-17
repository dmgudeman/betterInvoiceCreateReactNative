import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MyPickerItem extends Component {
  componentWillMount() {
    // const {payload} = this.props
  }
  render () {
    const {payload} = this.props;
    return (
      <View>
        <Text>2nd apge {payload} </Text>
      </View>

    
    )
  }

}

export default MyPickerItem;