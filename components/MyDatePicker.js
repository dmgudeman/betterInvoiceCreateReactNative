import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  View,
  PanResponder,
  DatePickerIOS } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
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
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.props.changeDate({prop: date, value: date})}}
      />
    )
  }
}