
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
// import MyDatePicker from '../components/MyDatePicker';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import * as actions from '../actions'
// import {react-timezone} from 'react-timezone';


class ItemEditScreen extends Component {
 
  
  componentDidMount() {
    console.log('ITEMEDITSCREEN componentDidMount this.props', this.props);
  }
   
  
  onSubmit = () => {
    const { fUserId, coId, date, hours, amount, description, hourly } = this.props
    let total = (
      (hours - 0 ) * (hourly - 0)) + (amount - 0);
   
    console.log('date111111111', fUserId, coId, date, hours, amount, description, total);
    this.props.itemCreate({ fUserId, coId, date, hours, amount, description, total})
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
          value={this.props.hours}
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
  const coId = Object.keys(state.companies.companies)[0];
  // console.log('ITEMEDITSCREEN mapStateToProps state', state);
  // console.log('state', state);
  // console.log('state.companies',Object.keys(state.companies.companies)[0]);
  // console.log('state.companies.companies[0].hourly',state.companies.companies[coId].hourly);
  const { date, hours, amount, description } = state.item;
  const  fUserId = state.auth.fUserId;
  const hourly = state.companies.companies[coId].hourly;
 
  // console.log('coIdddddddddddd', coId);
  return { date, hours, amount, description, hourly, fUserId, coId};
}
export default connect(mapStateToProps, actions)(ItemEditScreen);