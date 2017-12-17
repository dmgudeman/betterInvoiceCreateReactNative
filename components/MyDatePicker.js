import React, { Component } from 'react'
import { 
  StyleSheet,
  Text,
  View,
  PanResponder,
}                      from 'react-native';
import DatePicker      from 'react-native-datepicker';
import moment          from 'moment';
import DATE_RFC2822    from '../assets/Date';


const MyDatePicker = ({date, onDateChange}) => (
  <View style={styles.datePicker}>
    <DatePicker
      style={{width: 200}}
      date={ date }
      mode="date"
      placeholder="select date"
      format="MM/DD/YYYY"
      minDate="01/01/2017"
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
const styles = {
  datePicker: {
    marginLeft: 20,
    marginRight: 20,
  }
}
export default MyDatePicker;