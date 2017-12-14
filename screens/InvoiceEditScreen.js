
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
import Icon                     from 'react-native-vector-icons/FontAwesome';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as _                   from 'lodash';
import * as actions             from '../actions';
import MyDatePicker             from '../components/MyDatePicker';


class invoiceEditScreen extends Component {
  
  componentWillMount() {
    
    console.log('invoiceEditScreen componentWillMount this.props ', this.props);
  }
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
  
  navBack = () => {
    resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'invoices'}),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  updateInvoices(){
   const  {invoice, invoices} = this.props
   console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL invoice', invoice);
   console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL this.props', this.props);
   for (var key in invoices) {
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', key, invoices[key]);  
    if (invoice.invoiceKey === invoices[key].invoiceKey) {
      invoices[key].beginDate = invoice.beginDate;
      console.log('YEAHHHHHH invoice.beginDate', invoice.beginDate);
    console.log('KKKKKKKKKKKKKKKKKKKKKKKkinvoices[key].beginDate',invoices[key].beginDate );
    console.log('KKKKKKKKKKKKKKKKKKKKKKKkinvoices[key].beginDate',invoices[key].beginDate );
      this.props.invoiceUpdate('invoices' + [key] + '.beginDate', invoice.beginDate)
    }
    this.props.invoiceUpdate('invoices', invoices)
  }
  }
  
  onSubmit = async () => {
    // console.log('InvoiceEditScreen onSubmit this.props', this.props);
    const {  
      beginDate, companyKey, coName, createdAt, description, 
      discount, dueDate, endDate, fUserId, invoiceKey, items, lastDate, total} = this.props
      await this.props.invoiceUpdate('lastDate', endDate);
      await this.props.companyUpdate('lastDate', endDate);
    // const formatDate = moment(createdAt).format();
    // this.props.invoiceUpdate('createdAt', formatDate);
   
    // console.log('INVOICEEDIT onSubmit',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total );
    await this.props.invoiceEdit({  
      beginDate, companyKey, coName, createdAt, description, 
      discount, dueDate, endDate, fUserId,  invoiceKey, items, lastDate, total})
      console.log('INVOICE EDIT ONSUBMIT this.props', this);
    await this.navBack();
  }

  render() {
    const {  beginDate, companyKey, coName, coInvoices, createdAt, description, 
      discount, dueDate, endDate, fUserId, invoice, invoiceKey, invoices, items, lastDate, total} = this.props;
    
    const route = {companyKey, fUserId, invoiceKey}
    return (
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={ moment(this.props.beginDate).format('MM/DD/YYYY') }
          onDateChange={async (value) => {
            await this.props.invoiceUpdateDB('beginDate', moment(value).toDate().toUTCString(), route )
            // this.props.invoiceEdit({...payload})
          console.log('1111 UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
            await this.props.invoiceUpdate('beginDate', moment(value).toDate().toUTCString() )
            console.log('2222 UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
            await this.props.invoiceUpdate('invoice', invoice )
            console.log('3333 UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
            await this.updateInvoices();
            console.log('4444 UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
            }
          }
        />
       
       
        <FormLabel>Stop Date</FormLabel>
        <MyDatePicker 
         date={ moment(this.props.endDate).format('MM/DD/YYYY') }
         onDateChange={(value) => {
           this.props.invoiceUpdate('endDate', moment(value).toDate().toUTCString() )
           }
         }
      />
      
        <FormLabel>Discount</FormLabel>
        <FormInput 
          value={this.props.discount}
          onChangeText={(value) => { 
              // console.log('invoiceEdit coName input', input);
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
  console.log('INVOICEEDITSCREEN MAPSTATETOPROPS state', state);
  const address  = state.invoice.address;
  
  const beginDate   = state.invoice.beginDate;
  const companyKey  = state.invoice.companyKey;
  const coName      = state.invoice.coName;
  const coInvoices = state.companies.company.invoices;
  const createdAt   = state.invoice.createdAt;
  const description = state.invoice.description;
  const discount    = state.invoice.discount;
  const dueDate     = state.invoice.dueDate;
  const endDate     = state.invoice.endDate;
  const fUserId     = state.invoice.fUserId;
  const invoiceKey  = state.invoice.invoiceKey;
  const invoices    = state.invoice.invoices || state.companies.company.invoices;
  const items       = state.invoice.items;
  const lastDate    = state.invoice.lastDate;
  const total       = state.invoice.total;
  const invoice     = { beginDate, companyKey, coInvoices, coName, createdAt, description, 
    discount,dueDate, endDate, fUserId, invoiceKey, invoices, items, lastDate, total};

  return { beginDate, companyKey, coInvoices, coName, createdAt, description, 
    discount,dueDate, endDate, fUserId, invoice,  invoiceKey, invoices, items, lastDate, total};
}
export default connect(mapStateToProps, actions )(invoiceEditScreen);