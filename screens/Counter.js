import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
export default class Counter extends React.Component {
  render() {
      var textStyle = {
          fontSize: 25,
          color: "#333",
          fontWeight: "bold"
      };
     console.log('COUNTER THIS.PROPS', this.props);
      return (
        <View style={{backgroundColor: 'green', flex:1}}>
          <Text style={textStyle}>
              {this.props.display}
          </Text>
          <Button 
            onPress={ this.props.increase } 
            onFocus={this.props.utilsUpdate}
          >
            +</Button>
          </View>
      );
  }
}