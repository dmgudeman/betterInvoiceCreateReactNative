
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
    this.props.invoiceUpdate('items', this.props.coItems );
    this.props.invoiceUpdate('createdAt', moment().format());
    this.props.invoiceUpdate('beginDate', moment().format());
    this.props.invoiceUpdate('endDate', moment().format());
  
  }
  calcDueDate(date){
    let a = moment(date);
    a.add(this.props.paymentTerms, 'days');
    this.dueDate = a.format(); 
    return this.dueDate;
  }
  
  filterByDateRange(beginDate, endDate) {
    let imDate = '';
    let bmDate = moment(beginDate).format();
    let emDate = moment(endDate).format();
    let filteredItems = [];
   

    if(this.props.items){
      let itemsArray = (Object).values(this.props.items);
      // console.log('INVOICECREATE FILTERBYDATERANGE this.props.items', this.props.items);
      // console.log('INVOICECREATE FILTERBYDATERANGE itemsArray', itemsArray);
      itemsArray.forEach(i => {
        imDate = moment(i.date);
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
          filteredItems.push(i);
        }
      })
    }
    // console.log('INVOICECREATE FILTERBYDATERANGE', filteredItems);
    if(filteredItems.length>0) return filteredItems;
    return 0;
  } 
  onSubmit = async () => {
    console.log('111111111111111InvoicecreateScreen onSubmit this.props', this.props);
    const {  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total} = this.props
    let  filteredItems = await this.filterByDateRange(beginDate, endDate);
    this.props.invoiceUpdate('items', filteredItems);
    console.log('INVOICECREATE ONSUBMIT AFTER filterItems this.props.items', this.props.items );
    newDueDate = await this.calcDueDate(this.createdAt);
    this.props.invoiceUpdate('dueDate', newDueDate);
    console.log('dueDate', this.props.dueDate);
    console.log('22222222222222222InvoicecreateScreen onSubmit this.props', this.props);

    if (this.props.items){
      let invoiceTotal = 0;
      // console.log('this.props.items', this.props.items);
      let itemsArray = (Object).values(this.props.items);
      // console.log('itemsArray ', itemsArray);
        itemsArray.forEach(i => {
          // console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiinvoiceTotal', invoiceTotal);
          invoiceTotal = invoiceTotal + i.total;
        });
      // console.log('invoiceTotal', invoiceTotal);
      if (invoiceTotal) {
        this.props.invoiceUpdate('total', invoiceTotal);

      } else {
        this.props.invoiceUpdate('total', 0);
      }
    }
    console.log('INVOICECREATE ONSUBMIT THIS.PROPS ',  this.props);
    // console.log('3333333333333this.props', this.props);
      // this.props.invoiceCreate({description: this.props.description})
    // let invoice = {beginDate, companyKey, coName, createdAt,  
    //   description: this.props.description, discount, 
    //   dueDate: this.props.dueDate, endDate, fUserId,
    //   invoiceKey, items: this.props.items, total: this.props.total}
    let invoice = {...this.props}
    console.log('INVOICECREATE ONSUBMIT THIS.PROPS  ------ after ', this.props);
    this.props.invoiceCreate({invoice})
    // await this.props.navigation.goBack();
  }
  render() {
    return (
      
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={this.props.beginDate}
          onDateChange={(value) => {
            // console.log('ItemEditScreen render beginDate.value', value);
            this.props.invoiceUpdate('beginDate',value )
            }
          }
        />
       
        <FormLabel>Stop Date</FormLabel>
        <MyDatePicker 
          date={this.props.endDate}
          onDateChange={(value) => {
            // console.log('ItemEditScreen render endDate.value', value);
            this.props.invoiceUpdate('endDate', value )
            }
          }
        />
      
        <FormLabel>Discount</FormLabel>
        <FormInput 
          value={this.props.discount}
          onChangeText={(value) => { 
            // console.log('invoicecreate coName input', value);
            this.props.invoiceUpdate('discount', value)
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
  const coItems = state.companies.companies[companyKey].items || '';
  const paymentTerms = state.companies.companies[companyKey].paymentTerms || '';

  const createdAt= state.invoice.createdAt || moment().format();
  const description = state.invoice.description || '';
  const discount = state.invoice.discount || '';
  const dueDate = state.invoice.dueDate || '';
  const endDate = state.invoice.endDate || moment().format();
  const invoiceKey = state.invoice.invoiceKey || '';
  const items = state.invoice.items || '';
  const total = state.invoice.total || '';
    // console.log('XXXXXXXXXXXXXXXXXXX',  beginDate, companyKey, coItems, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, coItems, paymentTerms, total);
  return { beginDate, companyKey, coItems, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, paymentTerms, total};
} 
const mapDispatchToProps = (dispatch) => {
  const {invoiceUpdate, changeInvoiceHours, invoiceCreate} = actions;
  return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(InvoiceCreateScreen);