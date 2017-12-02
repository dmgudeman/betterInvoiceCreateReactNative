
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
class InvoiceCreateScreen extends Component {
  
  componentWillMount() {
    console.log('INVOICECREATESCREEN COMPONENTWILLMOUNT this.props', this.props);
    this.props.invoiceUpdate('description', this.props.description);
    this.props.invoiceUpdate('discount', this.props.discount);
    this.props.invoiceUpdate('items', this.props.items );
    this.props.invoiceUpdate('createdAt', moment().format());
    this.props.invoiceUpdate('beginDate', moment().format());
    this.props.invoiceUpdate('endDate', moment().format());
    this.props.invoiceUpdate('companyKey', this.props.companyKey)
    this.props.invoiceUpdate('items', this.props.coItems);
    this.props.invoiceUpdate('fUserId', this.props.fUserId);
    this.props.invoiceUpdate('coName', this.props.coName);
    this.props.invoiceUpdate('invoiceKey', this.props.invoiceKey);
  
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
      console.log('INVOICECREATE FILTERBYDATERANGE itemsArray', itemsArray);
      itemsArray.forEach(i => {
        imDate = moment(i.date);
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
          filteredItems.push(i);
        }
      })
    }
    console.log('INVOICECREATE FILTERBYDATERANGE filteredItems', filteredItems);
    if(filteredItems.length>0) return filteredItems;
    return 0;
  } 
  onSubmit = () => {

    console.log('111111111111111InvoicecreateScreen onSubmit this.props', this.props);
    const {  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, paymentTerms, total} = this.props
    let  filteredItems = this.filterByDateRange(beginDate, endDate);
    if(!filteredItems) {
      console.log('INVOICECREATE ONSUBMIT filteredItems', filteredItems);
      Alert.alert(
        'Invoice Items',
        'There are no invoice items for this date range'
        ,[{text: 'Cancel', onPress: () => this.props.navigation.navigate('companies')}]
      )

    } else {
    this.props.invoiceUpdate('items', filteredItems);
    // console.log('INVOICECREATE ONSUBMIT AFTER filterItems this.props.items', this.props.items );
    }
    newDueDate = this.calcDueDate(this.createdAt);
    this.props.invoiceUpdate('dueDate', newDueDate);
    // console.log('dueDate', this.props.dueDate);
    // console.log('22222222222222222InvoicecreateScreen onSubmit this.props', this.props);

    if (this.props.items){
      let invoiceTotal = 0;
      let itemsArray = (Object).values(this.props.items);
        itemsArray.forEach(i => {
         invoiceTotal = invoiceTotal + i.total;
        });
        this.props.invoiceUpdate('total', invoiceTotal)
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', this.props.total);
      }
  
    // let invoice = {beginDate, companyKey, coName, createdAt,  
    //   description: this.props.description, discount: this.props.discount, 
    //   dueDate: this.props.dueDate, endDate, fUserId,
    //   invoiceKey, items: this.props.items, total: this.props.total}
//     console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
//     console.log('this.props.items', this.props)
//     console.log('this.props.total', this.props.total)
//  console.log('empty');
//  console.log('1',beginDate, );
//  console.log('2',beginDate, companyKey, );
//  console.log('3',beginDate, companyKey,);
//  console.log('4',beginDate, companyKey,  coName, );
//  console.log('5',beginDate, companyKey,  coName, createdAt, );
//  console.log('6',beginDate, companyKey,  coName, createdAt, description, discount, dueDate, );
//  console.log('7',beginDate, companyKey,  coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, );
//  console.log('8',beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, paymentTerms, total)
      let payload = this.props
      console.log('pppppppppppppppppayload', payload);
    this.props.invoiceCreate( payload)
    // this.props.navigation.goBack();
    
  }
  render() {
    console.log('INVOICECREATESCREEN RENDER this.props', this.props);
    console.log('INVOICECREATESCREEN RENDER this.props.beginDate', this.props.beginDate);
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

        <Button
          title= "To WebView"
          onPress ={ () => this.props.navigation.navigate('myWebView') }
        />

        <Button
          title= "To WebView2"
          onPress ={ () =>{ 

            this.props.navigation.navigate('myWebView2',{name: this.props.description})
           }
           }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('INVOICECREATESCREEN MAPSTATETOPROPS state', state );
  const fUserId = state.auth.fUserId || '';
  // console.log('fUserIdddddddddddddddddddddddddddddddddd', fUserId);

  const companyKey = state.companies.company.companyKey|| state.companies.company.id || '';
  const coName = state.companies.company.name || '';
  const coItems = state.companies.company.items || '';

  const beginDate = state.invoice.beginDate || '';
  const createdAt= state.invoice.createdAt || '';
  const items = state.invoice.items || '';
  const description = state.invoice.description || '';
  const discount = state.invoice.discount || '';
  const dueDate = state.invoice.dueDate || '';
  const endDate = state.invoice.endDate || '';
  const invoiceKey = state.invoice.invoiceKey || '';
  const paymentTerms = state.companies.company.paymentTerms || '';
  const total = state.invoice.total || '';
  // console.log('INVOICECREATESCREEN MAPSTATETOPROPS beginDate', beginDate );
  return { beginDate, companyKey, coItems, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, paymentTerms, total};
} 
// const mapDispatchToProps = (dispatch) => {
//   const {invoiceUpdate, changeInvoiceHours, invoiceCreate} = actions;
//   return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceCreate}, dispatch)
// }
export default connect(mapStateToProps, actions )(InvoiceCreateScreen);