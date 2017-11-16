import React, { Component } from 'react';
import { View, Text , FlatList, List, Listinvoice} from 'react-native';
import InvoiceDetailsRow from '../components/InvoiceDetailsRow';
import { connect } from 'react-redux';
import { selectInvoice, invoiceUpdate } from '../actions/InvoiceActions';
import _ from 'lodash';
import moment from 'moment';
import store from '../store'

class InvoicesScreen extends Component {

componentWillMount() {
    // console.log('this.props in invoicesScreen', [...this.props.invoices]);
    // console.log('invoiceSCREEN componentWillMount this.props', this.props);
    // this.invoicesArray = [...this.props.invoices]
  }

  goToInvoiceEdit = (data) => {
    // console.log('invoiceS SCREEN goToinvoiceEdit data', data);
    const {amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate,fUserId,  invoiceKey, total} = data;
    const formatDate = moment(createdAt).format();
    this.props.invoiceUpdate('createdAt', formatDate);
    const invoice = {amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, fUserId, invoiceKey, total};
    // console.log('invoiceS SCREEN goToinvoiceEdit invoice', invoice);
    
    this.props.selectInvoice(invoice)
  
    const { navigate } = this.props.navigation
    navigate('invoiceEdit')
  }

  renderItem =(invoice)=> {
    // console.log('invoicesScreen renderItem invoice', invoice);

    const data = this.props.invoices[invoice.index];
    // console.log('invoicesScreen renderinvoice data', data);
    data.createdAt = moment(data.createdAt).format("L");
    // console.log('invoicesScreen renderinvoice date.createdAt', data.createdAt);
    return  (
       <InvoiceDetailsRow
         data = {data} 
         onPress={() => this.goToInvoiceEdit(data)}/>
    )
  }
  _keyExtractor = (invoice, index) => index;


  render() {
    return (
        <FlatList 
          data = {this.props.invoices}
          keyExtractor = {this._keyExtractor}
          renderItem={this.renderItem}
        />
    )
  }
}
const mapStateToProps = state => {
  const companyKey = Object.keys(state.companies.companies)[0];
  const  fUserId = state.auth.fUserId;
  const invoices = _.map(state.companies.companies[companyKey].invoices, (val, id) => {
  
    return { ...val, id};
  });
  
  return { fUserId, companyKey, invoices};
}

export default connect(mapStateToProps, {selectInvoice, invoiceUpdate})(InvoicesScreen);