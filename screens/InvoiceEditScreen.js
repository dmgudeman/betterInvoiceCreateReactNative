
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
  
  calcDueDate(){
    let a = moment(this.props.createdAt);
    a.add(this.props.paymentTerms *1, 'days');
    return a.format(DATE_RFC2822); 
  }
  
  filterItems(beginDate, endDate, items) {
      console.log('INVOICE EDIT FILTERITEMS items', items);
    let filteredItems = [];
    if(items) {
      let imDate = '';
      let bmDate = moment(beginDate).format();
      let emDate = moment(endDate).format();
      let itemsArray = (Object).values(items);
      console.log('INVOICE EDIT FILTERITEMS bmDate', bmDate);
      console.log('INVOICE EDIT FILTERITEMS emDate', emDate);
      itemsArray.forEach(i => {
        imDate = moment(i.date);
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
          filteredItems.push(i);
        }
      })
    }
    console.log('INVOICECREATESCREEN FILTERITEMS filteredItems', filteredItems);
    return filteredItems;
  }

  filteredItemsAlert(itemsArray){
    if(!itemsArray.length >0){
      Alert.alert(
        'Invoice Items',
        'There are no invoice items for this date range'
        ,[{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}]
      )
    }
  }

  calcInvoiceTotal =  (itemsArray) => {
    let invoiceTotal = 0;
    itemsArray.forEach(i => {
      invoiceTotal = invoiceTotal + i.total;
    });
    return invoiceTotal;
  }
  
  
  onSubmit = async () => {
    const { beginDate, companyKey, endDate, fUserId, invoiceKey, invoices, items, navigation, invoiceUpdate, setInvoice} = this.props;
    const route = { companyKey, fUserId, invoiceKey };
    let invoice = { ...this.props.invoice };

    invoice.items = await this.filterItems(beginDate, endDate, items);
    await this.filteredItemsAlert(invoice.items);
    if(invoice.items){
      invoice.total = await this.calcInvoiceTotal(invoice.items);
      invoice.dueDate = await this.calcDueDate(invoice.endDate);
      invoice.lastDate = invoice.endDate;
      console.log('INVOICE EDIT ONSUBMIT invoice', invoice);
            // await this.props.invoiceUpdateDB('beginDate', moment(value).format(DATE_RFC2822), route )
      await this.props.invoiceUpdateDB(invoice,  route )
      await update(company,{invoices: {[invoiceKey]:{$set: invoice }}});
      //       let a = await update(company,{invoices: {[invoiceKey]:{beginDate:{$set: value}}}})
      await setInvoice(invoice);

      //     await this.props.setCompany(a)


      // await navigation.goBack();
    }
  }

  render() {
    const {  beginDate, companyKey, coName, coInvoices, company, createdAt, description, 
      discount, dueDate, endDate, fUserId, invoice, invoiceKey, invoices, invoiceUpdate, items, lastDate, total} = this.props;
      console.log('INVOICE EDIT RENDER this.props', this.props);
    
    const route = {companyKey, fUserId, invoiceKey}
    return (
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={ beginDate }
          onDateChange={ async (value) => {


            let x = await update(invoice, {beginDate:{$set: moment(value).format(DATE_RFC2822)}})

            await this.props.setInvoice(x);

            // let y = await update(invoices, {[invoiceKey]:{$set: x}} )
            // let z = await update(company, {invoices:{$set: y}})
            
          //   await this.props.setInvoices(y);
          //   await this.props.setCompany(z);
          // console.log('INVOICE EDIT RENDER x in beginDate',x);
          //  console.log('INVOICE EDIT RENDER y in beginDate',y);
          //   // await this.props.invoiceUpdate('beginDate', moment(value).toDate().toUTCString() )
          //   await this.props.companyUpdate('invoices', y);

            
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
  const invoices    = state.companies.company.invoices;
  const invoice     = state.invoice.invoice;
  const company     = state.companies.company;
  // const address  = state.invoice.address;
  const beginDate   = state.invoice.invoice.beginDate;
  const companyKey  = state.invoice.invoice.companyKey;
  // const coName      = state.invoice.coName;
  // const coInvoices = state.companies.company.invoices;
  // const createdAt   = state.invoice.createdAt;
  const description = state.invoice.invoice.description;
  const discount    = state.invoice.invoice.discount;
  // const dueDate     = state.invoice.dueDate;
  const endDate     = state.invoice.invoice.endDate;
  const fUserId     = state.invoice.invoice.fUserId;
  const invoiceKey  = state.invoice.invoice.invoiceKey;
  // const invoices    = state.invoice.invoices || state.companies.company.invoices;
  const items       = state.companies.company.items;
  // const lastDate    = state.invoice.lastDate;
  // const total       = state.invoice.total;
  // const invoice     = { beginDate, companyKey, coInvoices, coName, createdAt, description, 
  //   discount,dueDate, endDate, fUserId, invoiceKey, invoices, items, lastDate, total};

  // // return { beginDate, companyKey, coInvoices, coName, createdAt, description, 
  //   discount,dueDate, endDate, fUserId, invoice,  invoiceKey, invoices, items, lastDate, total};
  return { beginDate, company, companyKey,  description, discount, endDate, fUserId, invoice, invoices, invoiceKey, items};
}
export default connect(mapStateToProps, actions )(invoiceEditScreen);