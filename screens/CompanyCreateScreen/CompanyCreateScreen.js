import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  Keyboard,
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
import * as _                   from 'lodash';
import * as actions             from '../../actions';
import { MyPicker  }            from '../../components/MyPicker/MyPicker';
import colorHexUpdater          from '../../assets/ColorHexUpdater';
import AddressInput             from '../../components/AddressInput/AddressInput';
import {
  colorOptionsList,
  paymentTermsOptionsList,
}                               from '../../assets/OptionsLists';
import {validate }              from '../../utility/Validation.js';
import DATE_RFC2822             from '../../assets/Date';

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
    // this.props.companyClearCreate(this.props.fUserId);
    console.log('COMPANYCREATE COMPONENTWILLMOUNT this.props', this.props);
    // console.log('COMPANYCREATE COMPONENTWILLMOUNT company', company);
  }

  static navigationOptions = ({ navigation }) => {
    return {
    headerTitle: 'New Company',
    headerLeft: <Icon.Button 
    name="angle-left" 
    backgroundColor="transparent" 
    color="gray" 
    size={40}
    onPress= {  _.debounce(()=> navigation.goBack(null), 2000,{'leading':true, 'trailing':true}) }
    />,
    }
  }

  onSubmit = async () => {

    const {address, color, fUserId, hourly, hex,invoices, items, lastDate, name, paymentTerms } = this.props
    const company = {address, color, fUserId, hourly, hex,invoices, items, lastDate, name, paymentTerms }
    console.log('COMPANY CREATE ONSUBMIT company', company);

    await  this.props.companyUpdate('company', company)

    let payload = {
      address, 
      color, 
      fUserId,
      hex, 
      hourly, 
      invoices,
      items,
      lastDate,
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
    const {companyUpdate, } = this.props;
    const {  address, color, hex, hourly, invoice, items, name, paymentTerms} = this.props

    const company = { ...this.props.company }   
              console.log('COMPANYCREAATE RENDER name', (name === ''));
  
    return (
      <View
        onStartShouldSetResponder= {(evt) => true }
        onResponderMove= {(evt)=> Keyboard.dismiss()}
        style = {styles.container}
      >
        <FormLabel>Name</FormLabel>
        <TouchableOpacity>
          <FormInput 
            valid={this.state.controls.name.valid}
            value={name}
            touched={this.state.controls.name.touched}
            onChangeText={(value) => {
              companyUpdate( 'name', value)
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
              companyUpdate('hourly', value)
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
              companyUpdate('paymentTerms', option.label)
              }
            }
          >
            <FormInput 
              value={paymentTerms} 
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
              companyUpdate('hex', colorHexUpdater(option.label))
              }
            }
          >
            <FormInput 
              value={color} 
              placeholder="color"
            />
          </ModalSelector>
        </TouchableOpacity>

        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          <FormInput 
            multiline={true}
            value={address}
            onFocus={(value) => { 
              // using a workaround here because companyUpdate returns a proxy for address instead of a string
              companyUpdate('address', value)
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
  console.log('COMPANYCREATE MSTP state', state);
 if (state.company) {
  const address = state.company.address || '';
  const color = state.company.color || 'blue';
  const companyKey = state.company.companyKey|| '';
  const company = state.company || '';
  const fUserId = state.auth.fUserId || '';
  const hex = state.company.hex || '';
  const hourly = state.company.hourly || '';
  const invoices = state.company.invoices || '';
  const items = state.company.items || '';
  const lastDate = state.company.lasteDate || '';
  const location = state.location || null;
  const name = state.company.name || '';
  const paymentTerms = state.company.paymentTerms || '30';
  return { 
    address, location, color, companyKey, company,
    fUserId, hex, hourly, invoices, items,  lastDate, name, paymentTerms
    };
  }
  return state ;
}

export default connect(mapStateToProps, actions )(CompanyCreateScreen);