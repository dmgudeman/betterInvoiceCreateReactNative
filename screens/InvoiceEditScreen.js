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
import { invoiceUpdateDB } from '../actions';


class invoiceEditScreen extends Component {
  
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
    return a.format(DATE_RFC2822); 
  }
  
  filterItems(beginDate, endDate, items) {
      // console.log('INVOICE EDIT FILTERITEMS items', items);
    let filteredItems = [];
    if(items) {
      let imDate = '';
      let bmDate = moment(beginDate).format();
      let emDate = moment(endDate).format();
      let itemsArray = (Object).values(items);
      itemsArray.forEach(i => {
        imDate = moment(i.date);
        if (imDate.isSameOrAfter(bmDate, 'day') && imDate.isSameOrBefore(emDate, 'day')) {
          filteredItems.push(i);
        }
      })
    }
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
    // for updating this screen
    const { beginDate, companies, company, companyKey, endDate, fUserId, 
            invoiceKey, invoices, invoiceUpdate, invoiceUpdateDB, items, navigation 
          } = this.props;
    
    // for updating state and DB
    let invoice = { ...this.props.invoice };
    const route = { companyKey, fUserId, invoiceKey };

    invoice.items = await this.filterItems(beginDate, endDate, items);
    await this.filteredItemsAlert(invoice.items);

    if (invoice.items && invoice.items.length > 0) {
     
      invoice.total = await this.calcInvoiceTotal(invoice.items);
      invoice.dueDate = await this.calcDueDate(invoice.endDate);
      invoice.lastDate = invoice.endDate;

      await invoiceUpdateDB( invoice, route );
      await invoiceUpdate('invoice', invoice );
     
      const newCompany = await update(company,  {invoices: {[invoiceKey]:{$set: invoice }}});
      await this.props.setCompany(newCompany);
      await navigation.goBack();
    }
  }


  render() {
    const {  beginDate, createdAt, description, discount, dueDate, endDate, 
             invoice, invoiceUpdate, setInvoice, total
          } = this.props;
    
    return (
        <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={ moment(beginDate).format('MM/DD/YYYY') }
          onDateChange={ async (value) => {
            let x = await update(invoice, {beginDate:{$set: moment(value).format(DATE_RFC2822)}})
            await invoiceUpdate('invoice', x )
            }
          }
        />
       
        <FormLabel>Stop Date</FormLabel>
        <MyDatePicker 
          date={ moment(endDate).format('MM/DD/YYYY') }
          onDateChange={ async (value) => {
            let x = await update(invoice, {endDate:{$set: moment(value).format(DATE_RFC2822)}})
            await invoiceUpdate('invoice', x );
            }
          }
        />
      
        <FormLabel>Discount</FormLabel>
        <FormInput 
          value={discount}
          onChangeText={ async (value) => { 
            let x = await update(invoice, {discount:{$set: value}})
            await setInvoice( x  );
            }
          }
        />
        <FormLabel>Description</FormLabel>
        <FormInput 
          value={description}
          onChangeText={ async (value) => {
            let x = await update(invoice, {description:{$set: value}})
            invoiceUpdate('invoice', x )
            }
          } 
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
  // console.log('INVOICE EDIT MSTP state', state);
  const invoices    = state.companies.company.invoices;
  const invoice     = state.invoice.invoice;

  const companies   = state.companies
  const company     = state.companies.company;

  const beginDate   = state.invoice.invoice.beginDate;
  const companyKey  = state.invoice.invoice.companyKey;
  const description = state.invoice.invoice.description;
  const discount    = state.invoice.invoice.discount;
  const endDate     = state.invoice.invoice.endDate;
  const fUserId     = state.invoice.invoice.fUserId;
  const invoiceKey  = state.invoice.invoice.invoiceKey;
  const items       = state.companies.company.items;
  return { beginDate, companies, company, companyKey,  description, discount, endDate, fUserId, invoice, invoices, invoiceKey, items};
}
export default connect(mapStateToProps, actions )(invoiceEditScreen);