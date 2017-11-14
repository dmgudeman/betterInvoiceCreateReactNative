
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
import MyDatePicker             from '../components/MyDatePicker';

class invoiceEditScreen extends Component {
  
  componentWillMount() {
    const {dispatch} = this.props
    console.log('invoiceEditScreen componentWillMount this.props ', this.props);
  }
  onSubmit = () => {
    console.log('InvoiceEditScreen onSubmit this.props', this.props);
    const {  amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, invoiceKey, total} = this.props
    
    this.props.invoiceUpdate('createdAt', moment(date).format('MM-DD-YYYY h:mm A'));
    const data  = ( (hours - 0 ) * (hourly - 0)) + (amount - 0);
    this.props.invoiceUpdate('total', data);
   
    console.log('date111111111',  amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, invoiceKey, total );
    this.props.invoiceEdit({  amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, invoiceKey, total})
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <FormLabel>Created</FormLabel>
        <MyDatePicker 
          createdAt={this.props.createdAt}
          invoiceUpdate={this.props.invoiceUpdate}
      />
        <FormLabel>Company</FormLabel>
        <FormInput 
          value={this.props.coName}
          onChangeText={(input) => { 
              console.log('invoiceEdit coName input', input);
              this.props.invoiceUpdate('coName', value)
            }
          }
        />
        <FormLabel>Description</FormLabel>
        <FormInput 
      value={this.props.amount}
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
  const invoiceKey = state.invoice.invoiceKey
  const total = state.invoice.total;

  // const { amount, coId, date, description, fUserId, hours, id,  total,  } = state.invoice;
  return { amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, invoiceKey, total};
}
const mapDispatchToProps = (dispatch) => {
  const {invoiceUpdate, changeInvoiceHours, invoiceEdit} = actions;
  return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceEdit}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(invoiceEditScreen);