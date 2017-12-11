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
  goToInvoiceEdit = (data) => {
    const invoice = {...data};
    this.props.selectInvoice(invoice)
    const { navigate } = this.props.navigation
    navigate('invoiceEdit')
  }

  renderItem =(invoice)=> {
    const data = this.props.invoices[invoice.index];
    data.createdAt = moment(data.createdAt).format("L");
    return  (
       <InvoiceDetailsRow
         data = {data} 
         onPress={() => this.goToInvoiceEdit(data)}/>
    )
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <FlatList 
          data = {this.props.invoices}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
    </View>
    )
  }
}
const mapStateToProps = state => {
  const companyKey = state.companies.company.companyKey || state.companies.company.id;
  const coName = state.companies.company.name;
  const fUserId = state.auth.fUserId;
  const invoices = _.map(state.companies.company.invoices, (val, id) => {
  
    return { ...val, id};
  });
  return { companyKey, coName, fUserId, invoices};
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,

  }
})

export default connect(mapStateToProps, actions)(InvoicesScreen);