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

const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";

const MyDatePicker = ({date, onDateChange}) => (
  <View>
      <DatePicker
      style={{width: 200}}
      date={ date}
      mode="date"
      placeholder="select date"
      format="MM/DD/YYYY"
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
    onDateChange={(value) => {
      console.log('MYDATEPICKER ONDATECHANGE value', moment(value).format(DATE_RFC2822));
      onDateChange(moment(value).format(DATE_RFC2822) )}}
    
  />
  </View>  
  
)

export default MyDatePicker;