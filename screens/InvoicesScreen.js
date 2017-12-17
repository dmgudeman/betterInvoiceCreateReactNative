import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import * as actions from '../actions';
import store from '../store'
import InvoiceDetailsRow from '../components/InvoiceDetailsRow';

class InvoicesScreen extends Component {
  // componentWillMount() {
  //   console.log('INVOICES WILL MOUNT this.props', this.props );
  // }
  // componentWillUpdate() {
  //   console.log('INVOICES WILL UPDATE this.props', this.props );
  // }
  // componentDidUpdate() {
  //   console.log('INVOICES DID UPDATE this.props', this.props );
  // }
  // componentWillReceiveProps () {
  //   console.log('INVOICES WILL RECEIVE PROPS this.props', this.props );
  // }
  // componentDidCatch () {
  //   console.log('INVOICES DID CATCH this.props', this.props );
  // }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Invoices',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={40}
        onPress= {  _.debounce(()=> navigation.goBack(), 1000,{'leading':true, 'trailing':true}) }
      />,
        
    }
  }
  goToInvoiceEdit = (invoice) => {
    // const invoice = {...data};
    // this.props.setInvoices(this.props.coInvoices)
    this.props.setInvoice(invoice)
    const { navigate } = this.props.navigation
    navigate('invoiceEdit' )
  }

  renderItem =(invoice)=> {
    const data = this.props.invoices[invoice.index];
    // data.createdAt = moment(data.createdAt).format("L");
    return  (
       <InvoiceDetailsRow
         data = {data} 
         onPress={() => this.goToInvoiceEdit(data)}/>
    )
  }

  render() {
    console.log('INVOICES RENDER this.props', this.props);
    return (
      <View style={{height: '100%'}} >
        <FlatList 
          data = {this.props.invoices}
          keyExtractor = {(item) => item.invoiceKey}
          renderItem={this.renderItem}
        />
    </View>
    )
  }
}
const mapStateToProps = state => {
  console.log('INVOICES MSTP state', state);
  if (state.companies.company){
  const company = state.companies.company || '';
  const companyKey = state.companies.company.companyKey || state.companies.company.id;
  const coInvoices = state.companies.company.invoices || '';
  const coName = state.companies.company.name || '';
  const fUserId = state.auth.fUserId;

  const invoices = _.map(state.companies.company.invoices, (val, id) => {
    return { ...val, id};
  });

  // const invoices = state.invoice.invoices || '';
  return { company, companyKey, coInvoices, coName, fUserId, invoices};
} return state;
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,

  }
})

export default connect(mapStateToProps, actions)(InvoicesScreen);