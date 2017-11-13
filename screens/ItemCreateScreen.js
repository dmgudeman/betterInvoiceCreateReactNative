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
import * as actions from '../actions'

class ItemCreateScreen extends Component {

  onSubmit = () => {
    const {amount, coId, date, description, fUserId, hourly, hours, total} = this.props
    console.log('ITEMCREATESCREEN ONSUBMIT hours', hours);
    console.log('ITEMCREATESCREEN ONSUBMIT hourly', hourly);
    console.log('ITEMCREATESCREEN ONSUBMIT amount', amount);
    const data  = ( (hours - 0 || 0 ) * (hourly - 0 || 0)) + (amount - 0 || 0);
    console.log('ITEMCREATESCREEN ONSUBMIT data', data);
    this.props.itemUpdate('total', data);
    console.log('ITEMCREATESCREEN ONSUBMIT data', total);

    this.props.itemSubmit({amount, coId, date, description, fUserId, hourly, hours, total});
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <FormLabel>Date</FormLabel>
        <DatePicker
          style={{width: 200}}
          date={this.props.date}
          mode="date"
          placeholder="select date"
          format="LL"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
        }}
        onDateChange={(value) => {
          this.props.itemUpdate('date',value )}
        }
      />
        <FormLabel>Hours</FormLabel>
        <FormInput 
          onChangeText={(value) => { 
              this.props.itemUpdate('hours', value) 
            }
          }
        />
        <FormLabel>Amount</FormLabel>
        <FormInput 
          onChangeText={(value) => this.props.itemUpdate('amount', value)}
        />
        <FormLabel>Description</FormLabel>
        <FormInput 
          onChangeText={(value) => this.props.itemUpdate('description', value)}
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
  const amount = state.item.amount || 0
  const coId = Object.keys(state.companies.companies)[0];
  const date = state.item.date;
  const description = state.item.description;
  const fUserId = state.auth.fUserId;
  const hours = state.item.hours;
  const hourly = state.companies.companies[coId].hourly;
  const total = state.item.total;

  return { amount, coId, date, description, fUserId, hourly, hours, total};
}
export default connect(mapStateToProps, actions)(ItemCreateScreen);