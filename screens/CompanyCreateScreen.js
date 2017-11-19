import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  StyleSheet,
  View, 
  Text, 
  TextInput,
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
import MyPicker                 from '../components/MyPicker/MyPicker';
import RNGooglePlacePicker      from 'react-native-google-place-picker';
import moment                   from 'moment';
import * as actions             from '../actions';

class CompanyCreateScreen extends Component {
  paymentTermsOptionsList =''
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
    const navigation = this.props.navigation
    console.log('COMPANYCREATE RENDER this.props.paymentTermsOptionsList', this.props.paymentTermsOptionsList);
    return (
     <View>
        <FormLabel>Payment Terms</FormLabel>
        <TouchableOpacity>
          <TextInput style={{backgroundColor:'red', height: 50}}
            value={this.props.name}
            onFocus={() => { navigation.navigate('myPicker',{prop:'name', optionsList: this.props.paymentTermsOptionsList} )}}
            // onPress={()=>console.log('ButtonPressed')}
            editable={true}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPress.bind(this)}>
          <Text style={{color: '#72c02c', fontSize: 20, fontWeight:'bold'}}>
            Click me to push Google Place Picker!
          </Text>
        </TouchableOpacity>
        <View style={styles.location}>
          <Text style={{color: 'black', fontSize: 15}}> </Text>
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
  },
  button: {
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => {
  const paymentTermsOptionsList = [{option: "30"}, {option: "15"}, {option: "5"}] ;
  const active = state.companies.active || true;
  const address = state.companies.address || '';
  const location = state.location || null;

  const color = state.companies.color || 'blue';
  const fUserId = state.auth.fUserId || '';
  const hourly = state.companies.hourly || '';
  const name = state.companies.name || '';
  const paymentTerms = state.companies.paymentTerms || '30';
  const userId = state.auth.userId || '';
  
  
  return { paymentTermsOptionsList, active, address, location, color, fUserId, hourly, name, paymentTerms, userId };
} 
const mapDispatchToProps = (dispatch) => {
  const {companyUpdate, companyCreate} = actions;
  return bindActionCreators({companyUpdate, companyCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(CompanyCreateScreen);