import React, { Component } from 'react';
import { View, Text, DatePickerIOS }       from 'react-native';
import { connect } from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                           from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import moment from 'moment';
import * as actions from '../actions'

import MyDatePicker from '../components/MyDatePicker';

class ItemCreateScreen extends Component {

  componentWillMount() {
   
  }
  onSubmit = () => {
    const {amount, companyKey, date, description, fUserId, hourly, hours, total} = this.props
    console.log('ITEMCREATESCREEN ONSUBMIT hours', hours);
    console.log('ITEMCREATESCREEN ONSUBMIT hourly', hourly);
    console.log('ITEMCREATESCREEN ONSUBMIT fUserId', fUserId);
    const data  = ( (hours - 0 || 0 ) * (hourly - 0 || 0)) + (amount - 0 || 0);
    console.log('ITEMCREATESCREEN ONSUBMIT data', data);
    this.props.itemUpdate('total', data);
    console.log('ITEMCREATE ONSUBMIT this.props', this.props);
    console.log('ITEMCREATESCREEN ONSUBMIT total', total);

    this.props.itemCreate({amount, companyKey, date, description, fUserId, hourly, hours, total});
    this.props.navigation.goBack();
  }

  render() {
    console.log('ITEMCREATESCREEN RENDER this.prop', this.props);
    return (
      <View>
  
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={this.props.date}
          onDateChange={(value) => {
            // console.log('ItemEditScreen render beginDate.value', value);
            this.props.itemUpdate('date', value )
            }
          }
        />
        <FormLabel>Hours</FormLabel>
        <FormInput 
          onChangeText={(value) => { 
              this.props.itemUpdate('hours', value) 
              this.props.itemTotalUpdate( value, this.props.amount, this.props.hourly)
            }
          }
          
        />
        <FormLabel>Amount</FormLabel>
        <FormInput 
          onChangeText={(value) => {
            this.props.itemUpdate('amount', value)
            this.props.itemTotalUpdate( this.props.hours, value, this.props.hourly)
            }
          }
        />
        <FormLabel>Description</FormLabel>
        <FormInput 
          onChangeText={(value) => this.props.itemUpdate('description', value)}
        />
      
        <Text style={{marginLeft:40, fontSize: 25 }}>Total: ${this.props.total}</Text>
        <Button
          title= "Submit"
          onPress =  {this.onSubmit }
        />
        <Button
          title= "Submit"
          onPress =  {this.onSubmit }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  console.log('ITEMCREATESCREEN MAPSTATETOPROPS state', state);
  const fUserId =     state.auth.fUserId || '';

  const companyKey =  state.companies.company.companyKey || '';
  const hourly =      state.companies.company.hourly;
  
  const amount =      state.item.amount || 0
  const date =        state.item.date || moment().format();
  const description = state.item.description || '';
  const hours =       state.item.hours || '';
  const total =       state.item.total || '';
  const item = { amount, companyKey, date, description, fUserId, hourly, hours, total}

  console.log('ITEMCREATESCREEN MAPSTATETOPROPS item', item);
  return { amount, companyKey, date, description, fUserId, hourly, hours, total};
}
export default connect(mapStateToProps, actions)(ItemCreateScreen);