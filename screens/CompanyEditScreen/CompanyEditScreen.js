
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CompanyEditScreen extends Component {
  
  componentWillMount() {
    console.log('COMPANYEDITSCREEN COMPONENTWILLMOUNT this.props', this.props);
    let navigator = this.props.navigation.state.params;
    const {address, color, companyKey, fUserId, hourly, id, name, paymentTerms } = navigator.company
    this.props.companyUpdate('company', navigator.company);
    console.log('COMPANYEDITSCREEN COMPONENETWILLMOUNT props object', {address, color, fUserId, hourly,id, name, paymentTerms }  );
  }
  onSubmit(props, companyEdit) {
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
    companyEdit(payload);
  }
  
  render() {
    console.log('CompanyEditScreen render this.props', this.props);
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
          onFocus={() => { navigation.navigate('myPicker',{prop:'paymentTerms', value: this.props.paymentTerms, optionsList: this.props.paymentTermsOptionsList} )}}
          editable={true}
        />
        </TouchableOpacity>
        <FormLabel>Color</FormLabel>
        <TouchableOpacity>
        <FormInput 
          value={this.props.color}
          onFocus={() => { navigation.navigate('myPicker',{ prop:'color', value: this.props.color, optionsList: this.props.colorOptionsList} )}}
          editable={true}
        />
        </TouchableOpacity>
        <FormLabel>Address</FormLabel> 
        <TouchableOpacity>
        <FormInput 
          value={this.props.address}
          onChangeText={(value) => this.props.companyUpdate('address', value)}
        />
        </TouchableOpacity>  
        <Button
          title= "Submit"
          onPress =  {() => this.onSubmit(this.props, this.props.companyCreate) }
        />
      </View>
    )
  }
}
 

const mapStateToProps = (state) => {
  console.log('COMPANYEDIT MAPSTATETOPROPS state', state);
  const paymentTermsOptionsList = [{option: ''}, {option: "30"}, {option: "15"}, {option: "5"}] ;
  const colorOptionsList = [{option:'blue', option:'green'},{option:'yellow'}, {option: 'purple'},{option: 'brown'},{option: 'red'}]
  const active = state.companies.active || true;

  const companyKey = state.companies.key || '';
  const address = state.companies.address || '';
  const location = state.location || null;

  const color = state.companies.color || 'blue';
  const fUserId = state.auth.fUserId || '';
  const hourly = state.companies.hourly || '';
  const name = state.companies.name || '';
  const paymentTerms = state.companies.paymentTerms || '30';
  const userId = state.auth.userId || '';
  console.log('COMPANYEDITSCREEN MAPSTATETOPROPS props', paymentTermsOptionsList, colorOptionsList, 
  companyKey, active, address, location, color, 
  fUserId, hourly, name, paymentTerms, userId);
  
  return { paymentTermsOptionsList, colorOptionsList, 
           companyKey, active, address, location, color, 
           fUserId, hourly, name, paymentTerms, userId };
} 
const mapDispatchToProps = (dispatch) => {
  const {companyUpdate, companyEdit} = actions;
  return bindActionCreators({companyUpdate, companyEdit}, dispatch)
}
export default connect(mapStateToProps, actions )(CompanyEditScreen);