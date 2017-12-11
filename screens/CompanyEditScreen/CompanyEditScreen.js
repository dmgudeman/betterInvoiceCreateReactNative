
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
import colorHexUpdater           from '../../assets/ColorHexUpdater';
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
    // let navigator = this.props.navigation.state.params;
    const {address, color, companyKey, fUserId, hourly, hex, invoices, items, id, name, paymentTerms } = this.props.company
    // console.log('COMPANYEDIT COMPONENTWILLMOUNT, this.props.company', this.props.company);
    // // this.props.companyUpdate('company', navigator.company);
    // // populates form
    this.props.companyUpdate('name', name);
    this.props.companyUpdate('paymentTerms', paymentTerms);
    this.props.companyUpdate('color', color);
    this.props.companyUpdate('companyKey', companyKey)
    this.props.companyUpdate('hourly', hourly);
    this.props.companyUpdate('hex', hex);
    items ? this.props.companyUpdate('invoices', invoices): null
    invoices ? this.props.companyUpdate('items', items): null
    this.props.companyUpdate('address', address);
    this.props.companyUpdate('companyKey', id)
  }
  
  onSubmit = async () => {
    const {address, color, companyKey, fUserId, hourly, hex, invoices, items, name, paymentTerms, companyEditSubmit } = this.props.company
    let company = {address, color, companyKey, fUserId, hourly, hex, invoices, items, name, paymentTerms};
    console.log('COMPANYEDIT ONSUBMIT this.props', this.props);
    await  this.props.companyUpdate('company', company)
   
      let payload = {...company}
        // address, 
        // color, 
        // companyKey,
        // fUserId,
        // hex, 
        // hourly, 
        // invoices,
        // items,
        // name, 
        // paymentTerms,
    // }
    console.log('COMPANYEDIT ONSUBMIT payload', payload)
   this.props.companyEditSubmit(payload);
   this.props.navigation.goBack();
  }
  

  render() {
    const colorOptions = colorOptionsList;
    const paymentTermsOptions = paymentTermsOptionsList;
    const {companyUpdate, companyEditSubmit} = this.props;
    const {name, color, hourly, fUserId, invoices, items,  address, companyKey, paymentTerms, navigation } = this.props;
    let company = {name, color, companyKey, companyEditSubmit, fUserId, hourly, invoices, items, address, paymentTerms} 
    console.log('COMPANYEDIT RENDER  company', company);
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
              companyUpdate('company', company)
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
            value={company.address}
            onFocus={(value) => { 
              // using a workaround here because companyUpdate returns a proxy for address instead of a string
              company.address = value
              companyUpdate('company', company)
              this.props.navigation.navigate('googlePlacesInput', {'company': company})
            }} 
            editable={true}
         />
        </TouchableOpacity>   
        <Button
          title= "Submit"
          onPress =  {() => {
            (this.state.controls.name.valid 
             && this.state.controls.hourly.valid )
             ? this.onSubmit() : null}
          }
            backgroundColor={ 
              this.state.controls.name.valid 
              && this.state.controls.hourly.valid 
              ?'#bdc3c7':'#bdc3c745'}
        />
        
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.companies.company) {
    // const active = state.companies.active || true;
    
    const address = state.companies.company.address || '';
    const color = state.companies.company.color || '';
    const companyKey = state.companies.company.companyKey|| '';
    const company = state.companies.company || '';
    const fUserId = state.auth.fUserId || '';
    const hex = state.companies.company.hex || '';
    const invoices = state.companies.company.invoices || '';
    const items = state.companies.company.items || '';
    const hourly = state.companies.company.hourly || '';
    const location = state.location || null;
    const name = state.companies.company.name || '';
    const paymentTerms = state.companies.company.paymentTerms || '30';
    const userId = state.auth.userId || '';
    return { 
      address, location, color, companyKey, company,
      fUserId, hex, hourly, invoices, items, name, paymentTerms, userId, 
      };
    }
    return state;
  }

export default connect(mapStateToProps, actions )(CompanyEditScreen);