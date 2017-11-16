import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  StyleSheet,
  View, 
  Text, 
  TouchableOpacity,
  Picker,
}                               from 'react-native';
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import MyPicker3                  from '../components/MyPicker3';
// import MyPicker2                from '../components/MyPicker2';
import RNGooglePlacePicker      from 'react-native-google-place-picker';
import moment                   from 'moment';
import * as actions             from '../actions';

class CompanyCreateScreen extends Component {
  constructor() {
    super();
    this.state = {language: ''};
  }
  updateLanguage = (lang) => {
    this.setState({language: lang});
  }

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
     <View>
      <MyPicker3 
        style={styles.picker}
        language = {this.state.language}
        updateLanguage = {this.updateLanguage}
      />
        <Text> hi there </Text>
        <TouchableOpacity onPress={this.onPress.bind(this)}>
          <Text style={{color: '#72c02c', fontSize: 20, fontWeight:'bold'}}>
            Click me to push Google Place Picker!
          </Text>
        </TouchableOpacity>
        <View style={styles.location}>
          <Text style={{color: 'black', fontSize: 15}}>

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
  },
  pickerText: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red',
  },
  picker: {
    height: 20,
    width: 100
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