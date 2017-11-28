
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
import GooglePlacesInput from '../../components/GooglePlacesInput';
import styles from './styles';

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
    // console.log('CompanyEditScreen render this.props', this.props);
    return (
      <View>
         <FormLabel>Name</FormLabel>
        <TouchableOpacity>
        <FormInput 
          value={this.props.name}
          onChangeText={(value) => this.props.companyUpdate('name', value)}
        />
        </TouchableOpacity> 
        <FormLabel>Hourly</FormLabel> 
        <TouchableOpacity>
        <FormInput 
          value={this.props.hourly}
          onChangeText={(value) => this.props.companyUpdate('hourly', value)}
        />
        </TouchableOpacity>  
        <FormLabel>Payment Terms</FormLabel>
        <TouchableOpacity>
        <FormInput 
          value={this.props.paymentTerms}
          onFocus={() => { this.props.navigation.navigate('myPicker',{prop:'paymentTerms', value: this.props.paymentTerms, optionsList: this.props.paymentTermsOptionsList} )}}
          editable={true}
        />
        </TouchableOpacity>
        <FormLabel>Color</FormLabel>
        <TouchableOpacity>
        <FormInput 
          value={this.props.color}
          onFocus={() => { this.props.navigation.navigate('myPicker',{ prop:'color', value: this.props.color, optionsList: this.props.colorOptionsList} )}}
          editable={true}
        />
        </TouchableOpacity>
        
        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
        <FormInput 
          value={this.props.address}
          onFocus={() => { this.props.navigation.navigate('googlePlacesInput', {address:this.props.address})}}
          editable={true}
        />
        </TouchableOpacity>  
        
        {/* <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
          
        <FormInput 
          value={this.props.address}
          onChangeText={(value) => this.props.companyUpdate('address', value)}
        />
        </TouchableOpacity>   */}
        <Button
          title= "Submit"
          onPress =  {() => this.onSubmit(this.props, this.props.companyEditSubmit) }
          // onPress =  {() => console.log('COMPANYEDITSCREEN SUBMIT BUTTON this.props', this.props)}
        /> 
        {/* <Button
          title= "location"
          onPress =  {() => { this.props.navigation.navigate('googlePlacesInput')}}
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
    const colorOptionsList = [{option:'blue', option:'green'},{option:'yellow'}, {option: 'purple'},{option: 'brown'},{option: 'red'}]
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