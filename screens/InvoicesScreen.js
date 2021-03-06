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
  componentWillMount() {
    console.log('INVOICES WILL MOUNT invoices', this.props.invoices );
  }
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
    const {invoices } = this.props
    console.log('goToINvoiceEdit invoice', invoice);
    this.props.setInvoice(invoice)
    const { navigate } = this.props.navigation
    navigate('invoiceEdit' )
  }

  renderItem =(invoice)=> {
    const data = this.props.invoices[invoice.index];
    return  (
       <InvoiceDetailsRow
         data = {data}
      
         onPress={() => this.goToInvoiceEdit(data)}/>
    )
  }
  _keyExtractor = (item, index) => index;
  render() {
    // console.log('INVOICES RENDER this.props', this.props);
    return (
      <View style={{height: '100%'}} >
        <FlatList 
          data = {this.props.invoices}
          keyExtractor = {this._keyExtractor}
          renderItem={this.renderItem}
        />
    </View>
    )
  }
}
const mapStateToProps = state => {
  console.log('INVOICES MSTP state', state);
  const fUserId    = state.auth.fUserId;
  if (state.company){
    const company    = state.company || '';
    const companyKey = state.companyKey || state.company.id;
    const coName     = state.company.name || '';
    const invoice    = state.invoice || '';
    const invoices = _.map(state.company.invoices, (val, id) => {
      return { ...val, id};
    });
    return { company, companyKey, coName, fUserId, invoice, invoices};
} return state;
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,

  }
})

export default connect(mapStateToProps, actions)(InvoicesScreen);