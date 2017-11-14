
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

class InvoiceCreateScreen extends Component {
  
  componentWillMount() {
    const {dispatch} = this.props

    console.log('invoicecreateScreen componentWillMount this.props ', this.props);
  }
  onSubmit = () => {
    // console.log('InvoicecreateScreen onSubmit this.props', this.props);
    const {  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total} = this.props
    
    const formatDate = moment(createdAt).format();
    this.props.invoiceUpdate('createdAt', formatDate);
    console.log('InvoicecreateScren onSubmit createdAt', createdAt);
   
    console.log('date111111111',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total );
    this.props.invoiceCreate({  beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, fUserId,  invoiceKey, total})
    this.props.navigation.goBack();
  }

  render() {
    return (
      
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          beginDate={this.props.beginDate}
          invoiceUpdate={this.props.invoiceUpdate}
          />
       
       
        <FormLabel>Stop Date</FormLabel>
        <MyDatePicker 
          endDate={this.props.endDate}
          invoiceUpdate={this.props.invoiceUpdate}
      />
      
        <FormLabel>Discount</FormLabel>
        <FormInput 
          value={this.props.discount}
          onChangeText={(input) => { 
              console.log('invoicecreate coName input', input);
              this.props.invoiceUpdate('coName', value)
            }
          }
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
  const companyKey = Object.keys(state.companies.companies)[0];
  const fUserId = state.auth.fUserId || '';
  
  const beginDate = state.invoice.beginDate || '';
  const coName = state.invoice.coName || '';
  const createdAt= state.invoice.createdAt || '';
  const description = state.invoice.description || '';
  const discount = state.invoice.discount || '';
  const dueDate = state.invoice.dueDate || '';
  const endDate = state.invoice.endDate || '';
  const invoiceKey = state.invoice.invoiceKey || '';
  const total = state.invoice.total || '';
   console.log('XXXXXXXXXXXXXXXXXXX',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total);
  return { beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total};
} 
const mapDispatchToProps = (dispatch) => {
  const {invoiceUpdate, changeInvoiceHours, invoiceCreate} = actions;
  return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(InvoiceCreateScreen);