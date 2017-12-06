
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import { connect, connectAdvanced } from 'react-redux';
import * as actions from '../../actions';
import ModalSelector            from 'react-native-modal-selector'
import GooglePlacesInput from '../../components/GooglePlacesInput';
import styles from './styles';
import {
  colorOptionsList,
  paymentTermsOptionsList,
}                               from '../../assets/OptionsLists';


class CompanyEditScreen extends Component {
  
  componentWillMount() {
    console.log('COMPANYEDITSCREEN COMPONENTWILLMOUNT this.props', this.props);
    let navigator = this.props.navigation.state.params;
    const {address, color, companyKey, fUserId, hourly, id, name, paymentTerms } = navigator.company
    // this.props.companyUpdate('company', navigator.company);
    this.props.companyUpdate('name', name);
    this.props.companyUpdate('paymentTerms', paymentTerms);
    this.props.companyUpdate('color', color);
    this.props.companyUpdate('hourly', hourly);
    this.props.companyUpdate('address', address);
    this.props.companyUpdate('companyKey', id)
    console.log('COMPANYEDITSCREEN COMPONENETWILLMOUNT props object', {address, color, fUserId, hourly, companyKey, name, paymentTerms }  );
  }
  onSubmit(props, companyEditSubmit) {
    console.log('COMPANYEdit SCREEN ONSUBMIT props', props)
    let payload = {
      name:props.name, 
      color:props.color, 
      paymentTerms: props.paymentTerms, 
      hourly: props.hourly, 
      address: props.address, 
      fUserId: props.fUserId,
      companyKey: props.companyKey
    }

    console.log('COMPANYEdit SCREEN ONSUBMIT payload', payload);
    console.log('COMPANYEdit SCREEN ONSUBMIT companyEditSubmit', companyEditSubmit);
    this.props.companyEditSubmit(payload);
    this.props.navigation.navigate(this.props.navigation.navigate('companies', {address:this.props.address}))
  }
  
  render() {
    const colorOptions = colorOptionsList;
    const paymentTermsOptions = paymentTermsOptionsList;
    const navigation = this.props.navigation
    const {name, color, hourly, address, companyUpdate, companyEditSubmit, paymentTerms} = this.props;
    return (
      <View>
         <FormLabel>Name</FormLabel>
        <TouchableOpacity>
        <FormInput 
          value={name}
          onChangeText={(value) => companyUpdate('name', value)}
        />
        </TouchableOpacity> 
        <FormLabel>Hourly</FormLabel> 
        <TouchableOpacity>
        <FormInput 
          value={''.hourly}
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
        
        {/* <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          
        <FormInput 
          value={address}
          onChangeText={(value) => companyUpdate('address', value)}
        />
        </TouchableOpacity>   */}
        <Button
          title= "Submit"
          onPress =  {() => this.onSubmit(this.props, companyEditSubmit) }
          // onPress =  {() => console.log('COMPANYEDITSCREEN SUBMIT BUTTON this.props', this.props)}
        /> 
        {/* <Button
          title= "location"
          onPress =  {() => { navigation.navigate('googlePlacesInput')}}
          // onPress =  {() => console.log('COMPANYEDITSCREEN SUBMIT BUTTON this.props', this.props)}
        /> */}
      </View>
    )
  }
}
 

const mapStateToProps = (state) => {
  console.log('COMPANYEDIT MAPSTATETOPROPS state.companies', state.companies);
  console.log('state.companies is undefined ', state.companies === undefined  );
  console.log(state);
  if (state.companies) {
    // console.log('COMPANYEDIT MAPSTATETOPROPS state.companies.active', state.companies.active);
    const paymentTermsOptionsList = [{option: ''}, {option: "30"}, {option: "15"}, {option: "5"}] ;
    const colorOptionsList = [{option:'blue'}, {option:'green'},{option:'yellow'}, {option: 'purple'},{option: 'brown'},{option: 'red'}]
    const active = state.companies.active || true;

    const companyKey = state.companies.companyKey || '';
    const address = state.companies.address || '';
    const location = state.location || null;

    const color = state.companies.color || 'blue';
    const fUserId = state.auth.fUserId || '';
    const hourly = state.companies.hourly || '';
    const name = state.companies.name || '';
    const paymentTerms = state.companies.paymentTerms || '30';
    const userId = state.auth.userId || '';
    console.log('COMPANYEDITSCREEN MAPSTATETOPROPS props OBJECT', paymentTermsOptionsList, colorOptionsList, 
    companyKey, active, address, location, color, 
    fUserId, hourly, name, paymentTerms, userId);
    
    return { paymentTermsOptionsList, colorOptionsList, 
            companyKey, active, address, location, color, 
            fUserId, hourly, name, paymentTerms, userId };
  }
  return state;
} 
// const mapDispatchToProps = (dispatch) => {
//   const {companyUpdate, companyEditSubmit} = actions;
//   return bindActionCreators({companyUpdate, companyEditSubmit}, dispatch)
// }
export default connect(mapStateToProps, actions )(CompanyEditScreen);