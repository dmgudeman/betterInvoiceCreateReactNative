
import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  View, 
  Text, 
  Alert,
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
import * as actions             from '../actions'

import MyDatePicker             from '../components/MyDatePicker';
import DATE_RFC2822             from '../assets/Date';

class InvoiceCreateScreen extends Component {
  
  componentWillMount() {
     const { companyKey, coItems, coName, fUserId, paymentTerms } = this.props;
    this.props.invoiceCreateClear({ companyKey, coItems, coName, fUserId, paymentTerms });
  }
  calcDueDate(){
    console.log('INVOICECREATESCREEN CALCDUEDATE date', this.props.createdAt);
    console.log('INVOICECREATESCREEN CALCDUEDATE this.props.paymentTerms', this.props.paymentTerms);
    console.log('INVOICECREATESCREEN CALCDUEDATE this.props.createdAt', this.props.createdAt);
    let a = moment(this.props.createdAt);
    console.log('INVOICECREATESCREEN CALCDUEDATE a', a);
    a.add(this.props.paymentTerms *1, 'days');
    let dueDate = a.format(DATE_RFC2822); 
    console.log('INVOICECREATESCREEN CALCDUEDATE dueDate', dueDate);
    this.props.invoiceUpdate('dueDate', dueDate)
  }

  
  filterByDateRange(beginDate, endDate, coItems) {
    let imDate = '';
    let bmDate = moment(beginDate).format();
    let emDate = moment(endDate).format();
    let filteredItems = [];
    let itemsArray = (Object).values(this.props.coItems);
      // console.log('INVOICECREATE FILTERBYDATERANGE this.props.items', this.props.items);
      // console.log('INVOICECREATE FILTERBYDATERANGE itemsArray', itemsArray);
    itemsArray.forEach(i => {
      imDate = moment(i.date);
      if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
        filteredItems.push(i);
      }
      console.log('INVOICECREATESCREEN FILTERBYDATERANGE filteredItems', filteredItems);
    })
    if (!filteredItems) this.props.invoiceUpdate('items', "0")
    this.props.invoiceUpdate('items', filteredItems);
  }
  filteredItemsAlert(){
    if(this.props.coItems && this.props.coItems.length === 0) {
      console.log('INVOICECREATESCREEN FILTEREDITEMSALERT this.props.items.length', this.props.items.length);
      console.log('INVOICECREATESCREEN FILTEREDITEMSALERT this.props.items.length');
      Alert.alert(
        'Invoice Items',
        'There are no invoice items for this date range'
        ,[{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}]
      )

    } else {
      let invoiceTotal = 0;
      // console.log('this.props.items', this.props.items);
      let itemsArray = (Object).values(this.props.items);
      // console.log('itemsArray ', itemsArray);
      itemsArray.forEach(i => {
        // console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiinvoiceTotal', invoiceTotal);
        invoiceTotal = invoiceTotal + i.total;
        });
      console.log('invoiceTotal', invoiceTotal);
      this.props.invoiceUpdate('total', invoiceTotal);
    }
  }

  calcInvoiceTotal =  () => {
    if (this.props.items){
      let invoiceTotal = 0;
      let itemsArray = (Object).values(this.props.items);
        itemsArray.forEach(i => {
          invoiceTotal = invoiceTotal + i.total;
      });
      // if (invoiceTotal) {
      //   this.props.invoiceUpdate('total', invoiceTotal);

      // } else {
      //   this.props.invoiceUpdate('total', 0);
      // }
    }
  }
  onSubmit = async () => {
    const {  beginDate, companyKey, coItems, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total} = this.props
    await this.filterByDateRange(beginDate, endDate, coItems);
    await this.filteredItemsAlert();
    await this.calcDueDate();
    await this.calcInvoiceTotal();
   
  
    let invoice = {
      beginDate, companyKey, coName, createdAt,  
      description: this.props.description, discount, 
      dueDate: this.props.dueDate, endDate, fUserId,
      invoiceKey, items: this.props.items, total: this.props.total
    }
    console.log('INVOICECREATESCREEN ONSUBMITTTTTTTTTTTTTTTTTTT invoice', invoice);
    this.props.invoiceCreate({invoice})
    await this.props.navigation.goBack();
  }
  render() {
  
    return (
      
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={ moment(this.props.beginDate).format('MM/DD/YYYY') }
          onDateChange={(value) => {
            this.props.invoiceUpdate('beginDate',moment(value).toDate().toUTCString() )
            }
          }
        />
        <FormLabel>Stop Date</FormLabel>
        <MyDatePicker 
           date={ moment(this.props.endDate).format('MM/DD/YYYY') }
           onDateChange={(value) => {
             this.props.invoiceUpdate('endDate',moment(value).toDate().toUTCString() )
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
  const fUserId = state.auth.fUserId || '';
   
  const coItems = state.companies.company.items || '';
  const companyKey = state.companies.company.companyKey;
  const coName = state.companies.company.name || '';
  const paymentTerms = state.companies.company.paymentTerms || '';

  const beginDate = state.invoice.beginDate || moment().format();
  const createdAt= state.invoice.createdAt || moment().format();
  const description = state.invoice.description || '';
  const discount = state.invoice.discount || '';
  const dueDate = state.invoice.dueDate || '';
  const endDate = state.invoice.endDate || moment().format();
  const invoiceKey = state.invoice.invoiceKey || '';
  const items = state.invoice.items || '';
  const total = state.invoice.total || '';
  return { beginDate, companyKey, coItems, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, paymentTerms, total};
} 
// const mapDispatchToProps = (dispatch) => {
//   const {invoiceUpdate, changeInvoiceHours, invoiceCreate, XX} = actions;
//   return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceCreate, XX}, dispatch)
// }
export default connect(mapStateToProps, actions)(InvoiceCreateScreen);