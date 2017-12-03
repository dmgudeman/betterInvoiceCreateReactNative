
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
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as actions             from '../actions';
import MyDatePicker             from '../components/MyDatePicker';

class invoiceEditScreen extends Component {
  
  componentWillMount() {
    // const {dispatch} = this.props
    console.log('invoiceEditScreen componentWillMount this.props ', this.props);
  }
  onSubmit = () => {
    // console.log('InvoiceEditScreen onSubmit this.props', this.props);
    const {  beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, fUserId, invoiceKey, items, total} = this.props
    
    // const formatDate = moment(createdAt).format();
    // this.props.invoiceUpdate('createdAt', formatDate);
   
    // console.log('INVOICEEDIT onSubmit',  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total );
    this.props.invoiceEdit({  beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId,  invoiceKey, items, total})
    this.props.navigation.goBack();
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
         date={ moment(this.props.beginDate).format('MM/DD/YYYY') }
         onDateChange={(value) => {
           this.props.invoiceUpdate('endDate',moment(value).toDate().toUTCString() )
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
  
  const address = state.invoice.address;
  
  const beginDate = state.invoice.beginDate;
  const companyKey = state.invoice.companyKey;
  const coName = state.invoice.coName;
  const createdAt= state.invoice.createdAt;
  const description = state.invoice.description;
  const discount = state.invoice.discount;
  const dueDate = state.invoice.dueDate;
  const endDate = state.invoice.endDate;
  const fUserId = state.invoice.fUserId;
  const invoiceKey = state.invoice.invoiceKey;
  const items = state.invoice.items;
  const total = state.invoice.total;

  // const { amount, companyKey, date, description, fUserId, hours, id,  total,  } = state.invoice;
  return { beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, fUserId, invoiceKey, items, total};
}
// const mapDispatchToProps = (dispatch) => {
//   const {invoiceUpdate, changeInvoiceHours, invoiceEdit} = actions;
//   return bindActionCreators({invoiceUpdate, changeInvoiceHours, invoiceEdit}, dispatch)
// }
export default connect(mapStateToProps, actions )(invoiceEditScreen);