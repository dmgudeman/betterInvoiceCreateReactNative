import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  StyleSheet,
  View, 
  Text, 
  TouchableOpacity,
}                               from 'react-native';
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import RNGooglePlacePicker      from 'react-native-google-place-picker';
import moment                   from 'moment';
import * as actions             from '../actions';

class CompanyCreateScreen extends Component {

  componentWillMount() {
    
  }

  onPress() {
    RNGooglePlacePicker.show((response) => {
      if (response.didCancel) {
        console.log('User cancelled GooglePlacePicker');
      }
      else if (response.error) {
        console.log('GooglePlacePicker Error: ', response.error);
      }
      else {
        this.setState({
          location: response
        });
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress.bind(this)}>
          <Text style={{color: '#72c02c', fontSize: 20, fontWeight:'bold'}}>
            Click me to push Google Place Picker!
          </Text>
        </TouchableOpacity>
        <View style={styles.location}>
          <Text style={{color: 'black', fontSize: 15}}>
            {JSON.stringify(this.state)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  location: {
    backgroundColor: 'white',
    margin: 25
  }
});

const mapStateToProps = (state) => {
  const company = state.company || null;
  if (company) {
  const active = state.company.active || true;
  const address = state.company.address || '';
  const location = state.location || null;

  const color = state.company.color || 'blue';
  const fUserId = state.auth.fUserId || '';
  const hourly = state.company.hourly || '';
  const name = state.company.name || '';
  const paymentTerms = state.company.paymentTerms || '30';
  const userId = state.auth.userId || '';
  }
  
  return {company};
} 
const mapDispatchToProps = (dispatch) => {
  const {companyUpdate, companyCreate} = actions;
  return bindActionCreators({companyUpdate, companyCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(CompanyCreateScreen);