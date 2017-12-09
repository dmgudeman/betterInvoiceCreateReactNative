
import React, { Component }     from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity }            from 'react-native';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import { connect }              from 'react-redux';
import * as actions             from '../../actions';
import ModalSelector            from 'react-native-modal-selector'
import GooglePlacesInput        from '../../components/GooglePlacesInput';
import colorHexPicker           from '../../assets/ColorHexUpdater';
import styles                   from './styles';
import {
  colorOptionsList,
  paymentTermsOptionsList,
}                               from '../../assets/OptionsLists';
import {validate }              from '../../utility/Validation.js';

class CompanyEditScreen extends Component {
  
  // For Validation
  state = {
    controls: {
      name: { 
        value: '',
        valid: true, 
        validationRules: { minLength: 2} },
        touched: false,
      hourly: { 
        value: '', 
        valid: true, 
        validationRules: { minLength: 2, isNumeric: true }, 
        touched: false,
      },
    }
  }

  updateInputState = (key, value) => {
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
    let navigator = this.props.navigation.state.params;
    const {address, color, companyKey, fUserId, hourly, hex, invoices, items, id, name, paymentTerms } = this.props.company
    console.log('COMPANYEDIT COMPONENTWILLMOUNT, this.props.company', this.props.company);
    // this.props.companyUpdate('company', navigator.company);
    // populates form
    this.props.companyUpdate('name', name);
    this.props.companyUpdate('paymentTerms', paymentTerms);
    this.props.companyUpdate('color', color);
    this.props.companyUpdate('hourly', hourly);
    this.props.companyUpdate('hex', hex);
    this.props.companyUpdate('invoices', invoices);
    this.props.companyUpdate('items', items);
    this.props.companyUpdate('address', address);
    this.props.companyUpdate('companyKey', id)
  }
  
  onSubmit = () => {
    const { name, color, paymentTerms, hex, hourly, invoices, items, address, 
      fUserId, companyKey, companyUpdate, companyEditSubmit, navigation } = this.props
    colorHexPicker(color, companyUpdate);
    let payload = {
      address, 
      color, 
      companyKey,
      fUserId,
      hex, 
      hourly, 
      invoices,
      items,
      name, 
      paymentTerms,
    }
   companyEditSubmit(payload);
   this.props.navigation.goBack();
  }
  
  render() {
    const colorOptions = colorOptionsList;
    const paymentTermsOptions = paymentTermsOptionsList;
    const {name, color, hourly, address, companyUpdate, companyEditSubmit, paymentTerms, navigation } = this.props;
    return (
      <View>
         <FormLabel>Name</FormLabel>
        <TouchableOpacity>
          <FormInput 
            valid={this.state.controls.name.valid}
            value={name}
            touched={this.state.controls.name.touched}
            onChangeText={(value) => {
              companyUpdate('name', value)
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
              }
            }
          >
            <FormInput 
              value={color} 
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
          onFocus={() => { navigation.navigate('googlePlacesInput', {address:address})}}
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
    )
  }
}

const mapStateToProps = (state) => {
  
  if (state.companies) {
    const company = state.companies.company || '';
    const active = state.companies.active || true;
    const address = state.companies.address || '';
    const companyKey = state.companies.companyKey || '';
    const color = state.companies.color || 'blue';
    const fUserId = state.auth.fUserId || '';
    const hex = state.companies.hex || '';
    const hourly = state.companies.hourly || '';
    const invoices = state.companies.invoices || '';
    const items = state.companies.items || '';
    const name = state.companies.name || '';
    const paymentTerms = state.companies.paymentTerms || '30';
    const userId = state.auth.userId || '';
    
    return { 
      active, address, companyKey, color, company,
      fUserId, hex, hourly, invoices, items, name, paymentTerms, userId };
    }
  return state;
} 

export default connect(mapStateToProps, actions )(CompanyEditScreen);