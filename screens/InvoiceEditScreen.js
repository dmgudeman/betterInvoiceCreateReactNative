
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
import update                   from 'immutability-helper';
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
   for (var key in invoices) {
    if (invoice.invoiceKey === invoices[key].invoiceKey) {
      invoices[key].beginDate = invoice.beginDate;
      this.props.invoiceUpdate('invoices' + [key] + '.beginDate', invoice.beginDate)
    }
    this.props.invoiceUpdate('invoices', invoices)
  }
  }
  
  onSubmit = async () => {
    const {  
      // beginDate, companyKey, coName, createdAt, description, 
      // discount, dueDate, endDate, fUserId, inoviinvoiceKey, items, lastDate, total} = this.props
      invoice, invoiceKey, invoices } = this.props

      console.log('INVOICE EDIT SUBMIT invoices', invoices);
      console.log('INVOICE EDIT SUBMIT invoice', invoice);
      let x = update(invoices, {[invoiceKey]: {$set:invoice}})
      this.props.companyUpdate('invoices', x)
      console.log('INVOICE EDIT SUBMIT x', x);



      // await this.props.invoiceUpdate('lastDate', endDate);
      // await this.props.companyUpdate('lastDate', endDate);
    // const formatDate = moment(createdAt).format();
    // this.props.invoiceUpdate('createdAt', formatDate);
   
    // console.log('INVOICEEDIT onSubmit',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total );
    // await this.props.invoiceEdit({  
    //   beginDate, companyKey, coName, createdAt, description, 
    //   discount, dueDate, endDate, fUserId,  invoiceKey, items, lastDate, total})
    await this.navBack();
  }

  render() {
    const {  beginDate, companyKey, coName, coInvoices, company, createdAt, description, 
      discount, dueDate, endDate, fUserId, invoice, invoiceKey, invoices, items, lastDate, total} = this.props;
      console.log('INVOICE EDIT RENDER beginDate',beginDate);
    
    const route = {companyKey, fUserId, invoiceKey}
    return (
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={ moment(this.props.beginDate).format("MM/DD/YYYY") }
          onDateChange={async (value) => {
            // await this.props.invoiceUpdateDB('beginDate', moment(value).toDate().toUTCString(), route )
            let x =await  update(invoice, {beginDate:{$set: value}})
            let y = await update(invoices, {[invoiceKey]:{$set: x}} )
            let z = await update(company.invoices, {invoices:{$set: y}})
            await this.props.setInvoices(y);
            await this.props.setCompany(z);
          console.log('INVOICE EDIT RENDER x in beginDate',x);
           console.log('INVOICE EDIT RENDER y in beginDate',y);
            // await this.props.invoiceUpdate('beginDate', moment(value).toDate().toUTCString() )
            await this.props.invoiceUpdate('invoice', x);
            await this.props.companyUpdate('invoices', y);

            
            // await this.updateInvoices();
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
  console.log('INVOICE EDIT MSTP state', state);
  const invoices = state.companies.company.invoices;
  const invoice = state.invoice.invoice;
  const company = state.companies.company;
  // const address  = state.invoice.address;
  const beginDate = state.invoice.invoice.beginDate;
  // const companyKey  = state.invoice.companyKey;
  // const coName      = state.invoice.coName;
  // const coInvoices = state.companies.company.invoices;
  // const createdAt   = state.invoice.createdAt;
  const description = state.invoice.invoice.description;
  const discount    = state.invoice.invoice.discount;
  // const dueDate     = state.invoice.dueDate;
  const endDate     = state.invoice.invoice.endDate;
  // const fUserId     = state.invoice.fUserId;
  const invoiceKey  = state.invoice.invoice.invoiceKey;
  // const invoices    = state.invoice.invoices || state.companies.company.invoices;
  // const items       = state.invoice.items;
  // const lastDate    = state.invoice.lastDate;
  // const total       = state.invoice.total;
  // const invoice     = { beginDate, companyKey, coInvoices, coName, createdAt, description, 
  //   discount,dueDate, endDate, fUserId, invoiceKey, invoices, items, lastDate, total};

  // // return { beginDate, companyKey, coInvoices, coName, createdAt, description, 
  //   discount,dueDate, endDate, fUserId, invoice,  invoiceKey, invoices, items, lastDate, total};
  return { beginDate, company, description, discount, endDate, invoice, invoices, invoiceKey};
}
export default connect(mapStateToProps, actions )(invoiceEditScreen);