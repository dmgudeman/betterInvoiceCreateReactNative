import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  View,
  PanResponder,
  DatePickerIOS } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

const MyDatePicker = ({createdAt, invoiceUpdate}) => (
      <DatePicker
      style={{width: 200}}
      date={createdAt}
      mode="date"
      placeholder="select date"
      format="LL"
      minDate="2017-01-01"
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
      console.log('InvoiceEditScreen render date.value', value);
      this.props.invoiceUpdate('date',value )}
    }
  />
    
  
)

export default MyDatePicker;