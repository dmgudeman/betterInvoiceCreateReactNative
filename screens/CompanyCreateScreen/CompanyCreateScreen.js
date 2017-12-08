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
import ModalSelector            from 'react-native-modal-selector'
import moment                   from 'moment';
import * as actions             from '../../actions';
import { MyPicker  }            from '../../components/MyPicker/MyPicker';
import colorHexPicker           from '../../assets/ColorHexUpdater';
import AddressInput             from '../../components/AddressInput/AddressInput';
import {
  colorOptionsList,
  paymentTermsOptionsList,
}                               from '../../assets/OptionsLists';
import {validate }                from '../../utility/Validation.js';

class CompanyCreateScreen extends Component {
  state = {
    controls: {
      name:         { valid: '', valid: false, validationRules: { minLength:2} },
      hourly:       { valid: '', valid: false, validationRules: {} },
      paymentTerms: { valid: '', valid: false, validationRules: {} },
      color:        { valid: '', valid: false, validationRules: {} },
      address:      { valid: '', valid: false, validationRules: {} },
    }
  }

  updateInputState = (key, value) => {
    console.log('COMPANYCREATESCREEN UPDATEINPUTSTATE key', key);
    console.log('COMPANYCREATESCREEN UPDATEINPUTSTATE value', value);
    
    this.setState(prevState => {
      return {
        controls: {
          ...prevState,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules)
          }
        }
      }
    })
  }

  componentWillMount() {
    this.props.companyUpdate('name', '');
    this.props.companyUpdate('paymentTerms', '');
    this.props.companyUpdate('color', 'blue');
    this.props.companyUpdate('hourly', '');
    this.props.companyUpdate('address', '');
    this.props.companyUpdate('companyKey','')
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: 'New Company',
    }
  }

  onSubmit = async () => {
    await colorHexPicker(this.props.color, this.props.companyUpdate);
  
    // console.log('COMPANYCREATESCREEN ONSUBMIT this.props.hex', this.props.hex);
    // console.log('COMPANYCREATESCREEN ONSUBMIT this.props', this.props);

    let payload = {
      name:this.props.name, 
      color:this.props.color, 
      hex: this.props.hex,
      paymentTerms: this.props.paymentTerms, 
      hourly: this.props.hourly, 
      address: this.props.address, 
      fUserId: this.props.fUserId,
      companyKey: this.props.companyKey
    }

    await this.props.companyCreate(payload);
    this.props.navigation.navigate('companies')
  }

  render() {
    const colorOptions = colorOptionsList;
    const paymentTermsOptions = paymentTermsOptionsList;
    const navigation = this.props.navigation
    const {name, color, hourly, address, companyUpdate, paymentTerms} = this.props;
     
    return (
      <View style = {styles.container}>
        <FormLabel>Name</FormLabel>
        <TouchableOpacity>
          <FormInput 
            value={name}
            onChangeText={(value) => {
              companyUpdate('name', value)
              
              this.updateInputState('name', value)
            }
            }
          />
        </TouchableOpacity> 

        <FormLabel>Hourly</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={hourly}
            onChangeText={(value) => companyUpdate('hourly', value)}
          />
        </TouchableOpacity>  

        <FormLabel>Payment Terms</FormLabel>
        <TouchableOpacity>
          <ModalSelector
            index={0}
            data={paymentTermsOptions}
            onChange={(option)=>{ 
              companyUpdate('paymentTerms', option.label)
              }
            }
          >
            <FormInput 
              value={this.props.paymentTerms} 
              editable={false}
              placeholder="Payment Terms"
              editable={true}
            />
          </ModalSelector>
        </TouchableOpacity>

        <FormLabel>Color</FormLabel>
        <TouchableOpacity>
          <ModalSelector
            // index={0}
            data={colorOptions}
            onChange={(option)=>{ 
              companyUpdate('color', option.label)
              }
            }
          >
            <FormInput 
              value={this.props.color} 
              editable={false}
              placeholder="color"
              editable={true}
            />
          </ModalSelector>
        </TouchableOpacity>

        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={address}
            onFocus={(value) => { 
              // using a workaround here because companyUpdate returns a proxy for address instead of a string
              this.props.navigation.navigate('googlePlacesInput', {address: value})
            }} 
            editable={true}
          />
        </TouchableOpacity>   
        <Button
          title= "Submit"
          onPress =  {() => this.onSubmit(this.props, this.props.companyCreate) }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    flex: 1
  },
  formLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 30, 
    height: 20,
    backgroundColor: 'green',
  },
  inputBox: {
     height: 50,
     marginLeft: 15,
     marginRight: 15,
     backgroundColor: 'red',
  },
  border: {
    height: 50,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
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
 
  const active = state.companies.active || true;
  const address = state.companies.address || '';
  const color = state.companies.color || '';
  const companyKey = state.companies.key || '';
  const fUserId = state.auth.fUserId || '';
  const hex = state.companies.hex || '';
  const hourly = state.companies.hourly || '';
  const location = state.location || null;
  const name = state.companies.name || '';
  const paymentTerms = state.companies.paymentTerms || '30';
  const userId = state.auth.userId || '';
  console.log('COMPANYCREATESCREEN MAPSTATETOPROPS state.companies.hex', state.companies.hex);
  console.log('COMPANYCREATESCREEN MAPSTATETOPROPS hex', hex);
  return { 
           companyKey, active, address, location, color, 
           fUserId, hex, hourly, name, paymentTerms, userId};
} 
// const mapDispatchToProps = (dispatch) => {
//   const {companyUpdate, companyCreate} = actions;
//   return bindActionCreators({companyUpdate, companyCreate}, dispatch)
// }
export default connect(mapStateToProps, actions )(CompanyCreateScreen);