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
import Icon                     from 'react-native-vector-icons/FontAwesome';
import ModalSelector            from 'react-native-modal-selector'
import moment                   from 'moment';
import * as actions             from '../../actions';
import { MyPicker  }            from '../../components/MyPicker/MyPicker';
import colorHexUpdater           from '../../assets/ColorHexUpdater';
import AddressInput             from '../../components/AddressInput/AddressInput';
import {
  colorOptionsList,
  paymentTermsOptionsList,
}                               from '../../assets/OptionsLists';
import {validate }              from '../../utility/Validation.js';

class CompanyCreateScreen extends Component {
  state = {
    controls: {
      name: { 
        value: '',
        valid: false, 
        validationRules: { minLength: 2} },
        touched: false,
      hourly: { 
        value: '', 
        valid: false, 
        validationRules: { minLength: 2, isNumeric: true }, // isNumeric: true,
        touched: false,
      },
    
    }
  }

  updateInputState = (key, value) => {
    // console.log('COMPANYCREATESCREEN UPDATEINPUTSTATE key', key);
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules),
            touched: true
          }
        }
      }
    })
  }

  componentWillMount() {
    // const {address, color, companyKey, hex, hourly, name, paymentTerms } = this.props.company;
    // const company = {address, color, companyKey, hex, hourly, name, paymentTerms }
    // clear the form
    // this.props.companyUpdate('address', '');
    // this.props.companyUpdate('color', 'blue');
    // this.props.companyUpdate('companyKey','')
    // this.props.companyUpdate('hex', '');
    // this.props.companyUpdate('hourly', '');
    // this.props.companyUpdate('name', '');
    // this.props.companyUpdate('paymentTerms', '');
    
    // this.props.companyUpdate('company', company)
  }

  static navigationOptions = ({ navigation }) => {
    return {
    headerTitle: 'New Company',
    headerLeft: <Icon.Button 
    name="angle-left" 
    backgroundColor="transparent" 
    color="gray" 
    size={40}
    onPress= {()=> navigation.goBack(null) }/>,
    }
  }

  onSubmit = async () => {
    let company = '';
    const {address, color, fUserId, hourly, hex, id, name, paymentTerms } = this.props
    console.log('1 COMPANYCREATE ONSUBMIT THIS.props.color, this.props.hex ', color, this.props.hex); 
   let x = await colorHexUpdater(this.props.color)
   company.hex = x;
   await  this.props.companyUpdate('company', company)
    console.log('COMPANYCREATE ONSUBMIT HexUopdater resukts', x);
    console.log('COMPANYCREATE ONSUBMIT THIS.props', this.props);
    let payload = {
      address, 
      color, 
      fUserId,
      hex, 
      hourly, 
      name, 
      paymentTerms,
    }

   await this.props.companyCreate(payload);
   await  this.props.navigation.goBack()
  }
  render() {
    const colorOptions = colorOptionsList;
    const paymentTermsOptions = paymentTermsOptionsList;
    const navigation = this.props.navigation
    const {name, color, hourly, address, companyUpdate, paymentTerms} = this.props;
    let company = {name, color, hourly, address, companyUpdate, paymentTerms} 
   
  
    return (
      <View style = {styles.container}>
        <FormLabel>Name</FormLabel>
        <TouchableOpacity>
          <FormInput 
            valid={this.state.controls.name.valid}
            value={name}
            touched={this.state.controls.name.touched}
            onChangeText={(value) => {
              company.name = value;
              console.log('COMPANY CREAATE company.anme', name);
              companyUpdate( 'company', company)
              this.updateInputState('name', value)
            }
            }
          />
          {
            !this.state.controls.name.valid 
            && this.state.controls.name.touched 
            ? <FormValidationMessage >Name should be at least 2 characters </FormValidationMessage> : null
          }
        </TouchableOpacity> 

        <FormLabel>Hourly</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            valid={this.state.controls.hourly.valid}
            value={hourly}
            touched={this.state.controls.hourly.touched}
            keyboardType= 'numeric'
            onChangeText={(value) => {
              company.hourly = value
              companyUpdate('company', company)
              this.updateInputState('hourly', value)
            }
          }
          />
          {
            !this.state.controls.hourly.valid 
            && this.state.controls.hourly.touched 
            ? <FormValidationMessage > Hourly should be at least a two digit number </FormValidationMessage> : null
          }
   
        </TouchableOpacity>  

        <FormLabel>Payment Terms</FormLabel>
        <TouchableOpacity>
          <ModalSelector
            index={0}
            data={paymentTermsOptions}
            onChange={(option)=>{ 
              company.paymentTerms = option.label
              companyUpdate('company', company)
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
              company.hex =  colorHexUpdater(option.label)
              company.color = option.label 
              companyUpdate('company', company)
              }
            }
          >
            <FormInput 
              value={this.props.color} 
              placeholder="color"
            />
          </ModalSelector>
        </TouchableOpacity>

        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            value={address}
            onFocus={(value) => { 
              // using a workaround here because companyUpdate returns a proxy for address instead of a string
              company.address = value
              this.props.navigation.navigate('googlePlacesInput', {'company': company})
            }} 
            editable={true}
          />
        </TouchableOpacity>   
        <Button
          title= "Submit"
          onPress =  {() => 
            (this.state.controls.name.valid 
             && this.state.controls.hourly.valid )
             ? this.onSubmit(this.props, this.props.companyCreate) : null}
            
            backgroundColor={ 
              this.state.controls.name.valid 
              && this.state.controls.hourly.valid 
              ?'#bdc3c7':'#bdc3c745'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  },
  disabled: {
    backgroundColor: '#34495e80'
  }
});

const mapStateToProps = (state) => {
 if (state.companies.company) {
  // const active = state.companies.active || true;
  const address = state.companies.company.address || '';
  const color = state.companies.company.color || '';
  const companyKey = state.companies.company.companyKey|| '';
  const company = state.companies.company || '';
  const fUserId = state.auth.fUserId || '';
  const hex = state.companies.company.hex || '';
  const hourly = state.companies.company.hourly || '';
  const location = state.location || null;
  const name = state.companies.company.name || '';
  const paymentTerms = state.companies.company.paymentTerms || '30';
  const userId = state.auth.userId || '';
  return { 
    address, location, color, companyKey, company,
    fUserId, hex, hourly, name, paymentTerms, userId
    };
  }
  return state;
} 

export default connect(mapStateToProps, actions )(CompanyCreateScreen);