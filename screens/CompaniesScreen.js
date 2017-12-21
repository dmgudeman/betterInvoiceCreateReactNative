import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { debounce } from 'underscore';
import { Button } from 'react-native-elements';
import Icon                     from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';

import { AsyncStorage } from 'react-native';
import * as actions from '../actions';
import ListItem from '../components/ListItem'


class CompaniesScreen extends Component {
  componentWillMount() {
    // console.log('COMPANIES CWM this.props', this.props);
    this.props.fetchCompanies(this.props.fUserId);
  }


  componentDidMount() {
    this.props.fetchCompanies(this.props.fUserId)
  }
  goToInvoices=(company)=>{
    this.props.setCompany(company);
    this.props.setInvoices(company.invoices);
    this.props.navigation.navigate('invoices');
  }
  goToInvoiceCreate=(company)=>{
    this.props.setCompany(company);
    this.props.invoiceCreateClear(company);
    this.props.navigation.navigate('invoiceCreate');
  }
  renderItem =({item, index})=> {
    // console.log('COMPANIES RENDERITEM  item', item );
    return  (
      <ListItem 
        company={item} 
        navigation={this.props.navigation}
        goToInvoices={this.goToInvoices}
        goToInvoiceCreate={this.goToInvoiceCreate}
      />
    )
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Companies',
    headerRight:
        <Button
          title= "+Business"
          onPress= {_.debounce(()=>navigation.navigate('companyCreate'), 2000,{'leading':true, 'trailing':false})}
        />
        ,
        headerLeft: null
    }
   
  }
  render() {
    const navigation = this.props.navigation
    return (
      <View style={styles.container}>
        <FlatList
          data = {this.props.companies}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const fUserId = state.auth.fUserId || '';
  const company = state.companies.company || '';
  const companies = _.map(state.companies.companies, (val, id) => {
    return { ...val, id};
  });

  return {
    fUserId,
    companies,
    company,
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  }
})

export default connect(mapStateToProps, actions)(CompaniesScreen);