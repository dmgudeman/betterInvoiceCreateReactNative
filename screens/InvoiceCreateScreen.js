
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
  
  filterByDateRange(beginDate, endDate) {
    let imDate = '';
    let bmDate = moment(beginDate).format();
    let emDate = moment(endDate).format();
    let filteredItems = [];
    // console.log(`INVOICE_EDIT filterByDateRange this.items.length= ${JSON.stringify(this.items.length)}`);
    // console.log(`INVOICE_EDIT filterByDateRange bmDate= ${JSON.stringify(bmDate)}`);
    // console.log(`INVOICE_EDIT filterByDateRange emDate= ${JSON.stringify(emDate)}`);

    if(this.items){
      let itemsArray = (Object).values(this.items);
      itemsArray.forEach(i => {
        imDate = moment(i.date)
        // console.log(`INVOICE_EDIT filterByDateRange imDate= ${JSON.stringify(imDate)}`);
        // console.log(`INVOICE_EDIT filterByDateRange bmDate= ${JSON.stringify(bmDate)}`);
        // console.log(`INVOICE_EDIT filterByDateRange emDate= ${JSON.stringify(emDate)}`);
        // console.log(`INVOICE_EDIT filterByDateRange im.isSorA(bm, day)= ${imDate.isSameOrAfter(bmDate, 'day')}`);
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
          // console.log(`INVOICE_EDIT filterByDateRange is[i]= ${JSON.stringify(i)}`);
          filteredItems.push(i)
        }
      })
    }
    console.log(`INVOICE_EDIT filterByDateRange filteredItems= ${JSON.stringify(filteredItems)}`);
    if(filteredItems.length>0) return filteredItems;
    return 0;
  } 
  onSubmit = () => {
    // console.log('InvoicecreateScreen onSubmit this.props', this.props);
    const {  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total} = this.props
    let items = this.filterByDateRange(beginDate, endDate);
    this.props.invoiceUpdate('items', items)
    const formatDate = moment(createdAt).format();
    this.props.invoiceUpdate('createdAt', formatDate);
    console.log('InvoicecreateScren onSubmit createdAt', createdAt);
    console.log('INVOICECREATE ONSUBMIT items', items);
   
    console.log('date111111111',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total );
    this.props.invoiceCreate({  beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, fUserId,  invoiceKey, items, total})
    this.props.navigation.goBack();
  }

  render() {
    return (
      
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          beginDate={this.props.beginDate}
          onDateChange={(value) => {
            console.log('ItemEditScreen render beginDate.value', value);
            this.props.invoiceUpdate('beginDate',value )}}
          />
       
        <FormLabel>Stop Date</FormLabel>
        <MyDatePicker 
          endDate={this.props.endDate}
          onDateChange={(value) => {
            console.log('ItemEditScreen render endDate.value', value);
            this.props.invoiceUpdate('endDate',value )}}
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
  
  const beginDate = state.invoice.beginDate || moment().format();
  const coName = state.invoice.coName || '';
  const createdAt= state.invoice.createdAt || moment().format;
  const description = state.invoice.description || '';
  const discount = state.invoice.discount || '';
  const dueDate = state.invoice.dueDate || '';
  const endDate = state.invoice.endDate || moment().format();
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