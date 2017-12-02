import React, { Component } from 'react';
import { View, Text , FlatList, List, Listinvoice} from 'react-native';
import InvoiceDetailsRow from '../components/InvoiceDetailsRow';
import { connect } from 'react-redux';
import { selectInvoice, invoiceUpdate } from '../actions/InvoiceActions';
import _ from 'lodash';
import moment from 'moment';
import * as actions from '../actions';
import store from '../store'

class InvoicesScreen extends Component {

componentWillMount() {
    // console.log('this.props in invoicesScreen', [...this.props.invoices]);
    // console.log('invoiceSCREEN componentWillMount this.props', this.props);
    // this.invoicesArray = [...this.props.invoices]
  }

  goToInvoiceEdit = (data) => {
    // console.log('invoiceS SCREEN goToinvoiceEdit data', data);
    const {amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate,fUserId,  invoiceKey, items, total} = data;
    // const formatDate = moment(createdAt).format();
    // this.props.invoiceUpdate('createdAt', formatDate);
    const invoice = {amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, fUserId, invoiceKey, items, total};
    console.log('invoiceS SCREEN goToinvoiceEdit invoice', invoice);
    
    this.props.selectInvoice(invoice)
  
    const { navigate } = this.props.navigation
    navigate('invoiceEdit')
  }

  renderItem =(invoice)=> {
    // console.log('invoicesScreen renderItem invoice', invoice);

    const data = this.props.invoices[invoice.index];
    console.log('invoicesScreen renderinvoice data', data);
    data.createdAt = moment(data.createdAt).format("L");
    console.log('invoicesScreen renderinvoice date.createdAt', data.createdAt);
    return  (
       <InvoiceDetailsRow
         data = {data} 
         onPress={() => this.goToInvoiceEdit(data)}/>
    )
  }
  // _keyExtractor = (invoice, index) => {
  //   console.log('INVOICESSCREEN keyExtractor item, index', item,index);
  //   return index;
  // }

  render() {
    // console.log('INVOICES SCREEN render this.props.invoices', this.props.invoices);
    return (
        <FlatList 
          data = {this.props.invoices}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
    )
  }
}
const mapStateToProps = state => {
  console.log('INVOICESSCREEN MAPSTATETOPROPS state', state);
  const companyKey = state.companies.company.companyKey || state.companies.company.id;
  const coName = state.companies.company.name;
  const fUserId = state.auth.fUserId;
  const invoices = _.map(state.companies.company.invoices, (val, id) => {
  
    return { ...val, id};
  });
  console.log('INVOICESSCREEN MAPSTATETOPROPS invoices', invoices);
  return { companyKey, coName, fUserId, invoices};
}

export default connect(mapStateToProps, actions)(InvoicesScreen);