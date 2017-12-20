
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
import Icon                     from 'react-native-vector-icons/FontAwesome';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as _                   from 'lodash';
import * as actions             from '../actions'

import MyDatePicker             from '../components/MyDatePicker';
import DATE_RFC2822             from '../assets/Date';

class InvoiceCreateScreen extends Component {
  // componentWillMount() {

  // }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Invoice',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 

        color="gray" 
        size={40}
        onPress= {  _.debounce(()=> navigation.goBack(null), 1000,{'leading':true, 'trailing':true}) }
      />,
    }
  }
  calcDueDate(){
    let a = moment(this.props.createdAt);
    a.add(this.props.paymentTerms *1, 'days');
    let dueDate = a.format(DATE_RFC2822); 
    this.props.invoiceUpdate('dueDate', dueDate)
  }

  
  filterByDateRange(beginDate, endDate, coItems) {
    let imDate = '';
    let bmDate = moment(beginDate).format();
    let emDate = moment(endDate).format();
    let filteredItems = [];
    let itemsArray = (Object).values(this.props.coItems);
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
      Alert.alert(
        'Invoice Items',
        'There are no invoice items for this date range'
        ,[{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}]
      )

    } else {
      let invoiceTotal = 0;
      let itemsArray = (Object).values(this.props.items);
      itemsArray.forEach(i => {
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
    }
  }
  onSubmit = async () => {

    const x = {...this.props.invoice}
    this.props.invoiceUpdate('lastDate', x.endDate )
    // console.log('INVOICE CREATE 1 ONSUBMIT this.props', this.props);
    await this.filterByDateRange(x.beginDate, x.endDate, x.items);
    // console.log('INVOICE CREATE 2 ONSUBMIT this.props', this.props);
    await this.filteredItemsAlert();
    await this.calcDueDate();
   
    let y = Object.assign({}, {...this.props.invoice}, {coItems: null})
    // console.log('INVOICE CREATE ONSUBMIT y', y);
    await this.props.invoiceCreate({invoice: y})
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
             this.props.invoiceUpdate( 'endDate', moment(value).toDate().toUTCString() )
             }
          }
        />
      
        <FormLabel>Discount</FormLabel>
        <FormInput 
          value={this.props.discount}
          onChangeText={(value) => { 
            this.props.invoiceUpdate('discount', value) }
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
  console.log('INVOICE CREATE MSTP state', state);
  const fUserId      = state.auth.fUserId || '';
  
  const coItems      = state.companies.company.items             || '';
  const company      = state.companies.company                   || ''
  const companyKey   = state.companies.company.companyKey        || '' ;
  const coLastDate   = state.companies.company.lastDate          || '';
  const paymentTerms = state.companies.company.paymentTerms      || '';
  const invoice     = state.invoice
  const beginDate   = state.invoice.beginDate   || moment().format();
  const createdAt   = state.invoice.createdAt   || moment().format();
  const description = state.invoice.description || '';
  const discount    = state.invoice.discount    || '';
  const dueDate     = state.invoice.dueDate     || '';
  const endDate     = state.invoice.endDate     || moment().format();
  const invoiceKey  = state.invoice.invoiceKey  || '';
  const items       = state.invoice.items       || '';
  const lastDate    = state.invoice.lastDate    || moment().format();
  const total       = state.invoice.total       || '';
  return { 
    beginDate, company, companyKey, coItems, coLastDate, createdAt, description, 
    discount, dueDate, endDate, fUserId, invoiceKey, items, invoice, lastDate, paymentTerms, total};
} 
export default connect(mapStateToProps, actions)(InvoiceCreateScreen);