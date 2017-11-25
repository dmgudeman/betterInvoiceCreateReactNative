
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class CompanyEditScreen extends Component {

  
  render() {
    console.log('CompanyEditScreen render this.props', this.props);
    return (
      <View>
        <Text>CompanyEditScreen</Text>
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
const mapStateToProps =  (state) => {
  console.log('COMPANYEDIT MAPSTATETOPROPS state', state);
}
export default CompanyEditScreen;