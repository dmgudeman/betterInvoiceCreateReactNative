import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  Alert,
  View, 
  Text, 
}                               from 'react-native';
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import Icon                     from 'react-native-vector-icons/FontAwesome';
import update                   from 'immutability-helper';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as _                   from 'lodash';
import * as actions             from '../actions';
import MyDatePicker             from '../components/MyDatePicker';
import DATE_RFC2822             from '../assets/Date';


class invoiceEditScreen extends Component {
  componentWillMount() {
    console.log('INVOICE EDIT CWM actions', actions );
  }
  // componentWillMount() {
    
  //   console.log('invoiceEditScreen componentWillMount this.props ', this.props);
  // }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Invoice',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={40}
        onPress= {  _.debounce(()=> navigation.goBack(), 1000,{'leading':true, 'trailing':true}) }
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

    } 
  }
  calcTotal( ){

      let invoiceTotal = 0;

      console.log('INVOICE EDIT this.props.items', this.props.items);
      let itemsArray = Object.values(this.props.items);
      itemsArray.forEach(i => {
        invoiceTotal = invoiceTotal + i.total;
        });
      console.log('invoiceTotal', invoiceTotal);
      this.props.invoiceUpdate('total', invoiceTotal);
    }
  

  // calcInvoiceTotal =  () => {
  //   if (this.props.items){
  //     let invoiceTotal = 0;
  //     let itemsArray = (Object).values(this.props.items);
  //       itemsArray.forEach(i => {
  //         invoiceTotal = invoiceTotal + i.total;
  //     });
  //   }
  // }
  onSubmit = async () => {
   const {company, invoice, invoiceKey, invoiceEdit, invoiceUpdate, invoicesUpdate, invoices,  navigation, setCompany} = this.props

    
    await this.props.invoiceUpdate('lastDate', this.props.invoice.lastDate )
    await console.log('INVOICE EDIT 1 ONSUBMIT .lastDate', invoice.lastDate );
    await this.filterByDateRange(this.props.invoice.beginDate, this.props.invoice.endDate, this.props.invoice.items);
    // console.log('INVOICE CREATE 2 ONSUBMIT this.props', this.props);
    await this.filteredItemsAlert();
    await this.calcTotal();
    await console.log('INVOICE EDIT  LLLLLLLLLLLLLLl this.props.invoice ', this.props.invoice);
    await console.log('INVOICE EDIT  LLLLLLLLLLLLLLl invoice ', invoice);
    await this.calcDueDate();
    await console.log('KKKKKKKKKKKKKKKKKKKK invoice', invoice);
    let newInvoice = await Object.assign({}, {...this.props.invoice}, {coItems: null})
    await console.log('NNNNNNNNNNNNNNNNNNNNNNNN', newInvoice)
    await invoiceEdit(newInvoice)

     let a = {[invoiceKey]:newInvoice}
    await invoicesUpdate( this.props.invoices, a );
     
      const newCompany = await update(company,  {invoices: {[invoiceKey]:{$set: newInvoice }}});
      console.log('nnnnnnnnnnnnnnnnnnnewwwwwwwwwcompany', newCompany);
      await this.props.setCompany(newCompany);
      await navigation.goBack();
    }
  


  render() {
    const {  beginDate, createdAt, description, discount, dueDate, endDate, 
             invoice, invoiceUpdate, setInvoice, total
          } = this.props;
    
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

        <Button
          title= "Publish Invoice"
          onPress = { () =>{
            let description = this.props.description 
            this.props.navigation.navigate('wvContainer')
           }
          }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('INVOICE CREATE MSTP state', state);
  const fUserId      = state.auth.fUserId || '';
  
  // const coInvoices     = state.companies.company.invoices          || '';
  const coItems      = state.companies.company.items             || '';
  const company      = state.companies.company                   || ''
  const companyKey   = state.companies.company.companyKey        || '' ;
  const coLastDate   = state.companies.company.lastDate          || '';
  const paymentTerms = state.companies.company.paymentTerms      || '';
  
  // const invoice     = state.invoice
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

  const invoices    = state.invoices            || '';
  const invoice = {beginDate, company, companyKey, coItems, coLastDate, createdAt, description, 
    discount, dueDate, endDate, fUserId, invoiceKey, items, invoices, lastDate, paymentTerms, total}
  return { 
    beginDate, company, companyKey, coItems, coLastDate, createdAt, description, 
    discount, dueDate, endDate, fUserId, invoiceKey, items, invoice, invoices, lastDate, paymentTerms, total};
} 
// const mapDispatchToProps = (dispatch) => {
//   const {invoicesUpdate, invoiceUpdate } = actions;
//   return bindActionCreators({invoicesUpdate, invoiceUpdate, invoiceEdit}, dispatch)
// }
export default connect(mapStateToProps, actions )(invoiceEditScreen)