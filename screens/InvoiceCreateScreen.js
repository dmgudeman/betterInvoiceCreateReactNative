
import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  View, 
  Text, 
  DatePickerIOS 
}                               from 'react-native';
import { connect }              from 'react-redux';
import thunk from 'redux-thunk';
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
   

    if(this.props.items){
      let itemsArray = (Object).values(this.props.items);
      console.log('INVOICECREATE this.items', this.props.items);
      console.log('INVOICECREATE itemsArray', itemsArray);
      itemsArray.forEach(i => {
        imDate = moment(i.date)
       
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
          
          filteredItems.push(i)
        }
      })
    }
    console.log('filteredItems', filteredItems);
    if(filteredItems.length>0) return filteredItems;
    return 0;
  } 
  onSubmit = async () => {
    console.log('111111111111111InvoicecreateScreen onSubmit this.props', this.props);
    const {  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total} = this.props
    let  filteredItems = await this.filterByDateRange(beginDate, endDate);

    await this.props.invoiceUpdate('items', filteredItems)
    // console.log('InvoicecreateScreen onSubmit this.props', this.props);
    // const formatDate = moment().format();
    // this.props.invoiceUpdate('createdAt', formatDate);
    console.log('22222222222222222InvoicecreateScreen onSubmit this.props', this.props);
    console.log('INVOICECREATE ONSUBMIT items', items);

    if (items){
      console.log('items', items);
      let invoiceTotal = 0 ;
      let itemsArray = await (Object).values(items);
      console.log('itemsArray ', itemsArray);
        await itemsArray.forEach(i => {
          console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiinvoiceTotal', invoiceTotal);
          invoiceTotal = invoiceTotal + i.total;
        });
      console.log('invoiceTotal', invoiceTotal);
      if (invoiceTotal) {
        await this.props.invoiceUpdate('total', invoiceTotal.toString());
      } else {
        await this.props.invoiceUpdate('total', 0);
      }
    }
    console.log('date111111111',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total );
    console.log('3333333333333this.props', this.props);
    
    await this.props.invoiceCreate({  beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, fUserId,  invoiceKey, items, total: this.props.total })
    await this.props.navigation.goBack();
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
  const coName = state.companies.companies[companyKey].name || '';
  const items = state.companies.companies[companyKey].items || ''

  const createdAt= state.invoice.createdAt || moment().format();
  const description = state.invoice.description || '';
  const discount = state.invoice.discount || '';
  const dueDate = state.invoice.dueDate || '';
  const endDate = state.invoice.endDate || moment().format();
  const invoiceKey = state.invoice.invoiceKey || '';
  const total = state.invoice.total || '';
   console.log('XXXXXXXXXXXXXXXXXXX',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total);
  return { beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total};
} 
const mapDispatchToProps = (dispatch) => {
  const {invoiceUpdate, changeInvoiceHours, invoiceCreate} = actions;
  return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(InvoiceCreateScreen);