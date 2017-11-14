import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  View,
  PanResponder,
  DatePickerIOS 
}                      from 'react-native';
import DatePicker      from 'react-native-datepicker';
import moment          from 'moment';

const MyDatePicker = ({date, onDateChange}) => (
      <DatePicker
      style={{width: 200}}
      date={moment(date).format("L")}
      mode="date"
      placeholder="select date"
      format="L"
      minDate="01-01-2017"
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
    onDateChange={(value) => onDateChange(value )}
    
  />
    
  
)

export default MyDatePicker;