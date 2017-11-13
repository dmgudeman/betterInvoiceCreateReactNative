
import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  View, 
  Text, 
  DatePickerIOS 
}                               from 'react-native';
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as actions             from '../actions';

class invoiceEditScreen extends Component {
  
  componentWillMount() {
    const {dispatch} = this.props
    console.log('invoiceEditScreen componentWillMount this.props ', this.props);
  }
  onSubmit = () => {
    console.log('InvoiceEditScreen onSubmit this.props', this.props);
    const { amount, coId, date, description, fUserId, hours, id, total, hourly } = this.props
    
    this.props.invoiceUpdate('date', moment(date).format('MM-DD-YYYY h:mm A'));
    const data  = ( (hours - 0 ) * (hourly - 0)) + (amount - 0);
    this.props.invoiceUpdate('total', data);
   
    console.log('date111111111', amount, coId, date, description, fUserId, hours, id, total, hourly  );
    this.props.invoiceEdit({ amount, coId, date, description, fUserId, hours, id, total, hourly })
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
        <FormLabel>Hours</FormLabel>
        <FormInput 
          value={this.props.hours}
          onChangeText={(input) => { 
              console.log('invoiceEdit HOURS input', input);
              this.props.invoiceUpdate('hours', value)
            }
          }
        />
        <FormLabel>Amount</FormLabel>
        <FormInput 
      value={this.props.amount}
        onChangeText={(value) => this.props.invoiceUpdate('amount', value)}
        />
        <FormLabel>Description</FormLabel>
        <FormInput
        value={this.props.description}
        onChangeText={(value) => this.props.invoiceUpdate('description', value)}
        />
        <Button
          title= "Submit"
          onPress =  {this.onSubmit }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const fUserId = state.invoice.fUserId;
  
  const address = state.invoice.address;
  const amount = state.invoice.amo
  const beginDate = state.invoice.beginDate;
  const companyKey = state.invoice.companyKey;
  const coName = state.invoice.coName;
  const createdAt= state.invoice.createdAt;
  const description = state.invoice.description;
  const discount = state.invoice.discount;
  const dueDate = state.invoice.dueDate;
  const endDate = state.invoice.endDate;
  const invoiceKey = state.invoice.invoiceKey;
  const total = state.invoice.total;

  // const { amount, coId, date, description, fUserId, hours, id,  total,  } = state.invoice;
  return { amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, invoiceKey, total};
}
const mapDispatchToProps = (dispatch) => {
  const {invoiceUpdate, changeInvoiceHours, invoiceEdit} = actions;
  return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceEdit}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(invoiceEditScreen);