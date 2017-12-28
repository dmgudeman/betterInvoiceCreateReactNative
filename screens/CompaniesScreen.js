// @flow
import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import ListItem from '../components/ListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class CompaniesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Companies',
      headerRight:
        <Button
          title="+Business"
          // onPress= {_.debounce(()=>navigation.navigate('companyCreate'), 2000,{'leading':true, 'trailing':false})}
          onPress={async () => {
            await console.log('COMPANIES NAV OPTIONS navigation', navigation);
            await navigation.state.params.clearCompany();
            await navigation.navigate('companyCreate');
            }
          }
        />
      ,
      headerLeft: null
    }

  }

  componentWillMount() {
    console.log('COMPANIES CWM this.props.navigation.state.key', this.props.navigation.state.key);
    this.props.fetchCompanies(this.props.fUserId);
    this.props.navigation.setParams({
      clearCompany: this.props.clearCompany,
      key: 'companies',
    });
  }

  componentDidMount() {
    this.props.fetchCompanies(this.props.fUserId);
  }

  goToCompanyEdit = (company) => {
    this.props.setCompany(company);
    this.props.navigation.navigate('companyEdit');
  };

  goToInvoices = (company) => {
    this.props.setCompany(company);
    this.props.setInvoices(company.invoices);
    this.props.navigation.navigate('invoices');
  };
  goToInvoiceCreate = (company) => {
    this.props.setCompany(company);
    this.props.invoiceCreateClear(company);
    this.props.navigation.navigate('invoiceCreate');
  };
  goToItems = (company) => {
    this.props.setCompany(company);
    this.props.setItems(company.items);
    this.props.navigation.navigate('items');
  };
  goToItemCreate = (company) => {
    this.props.setCompany(company);
    this.props.setItems(company.items);
    this.props.clearItem();
    this.props.navigation.navigate('itemCreate');
  };
  renderItem = ({ item, index }) => {
    // console.log('COMPANIES RENDERITEM  item', item );
    return (<
        ListItem company={item}
                 navigation={this.props.navigation}
                 goToInvoices={this.goToInvoices}
                 goToInvoiceCreate={this.goToInvoiceCreate}
                 goToItems={this.goToItems}
                 goToItemCreate={this.goToItemCreate}
                 goToCompanyEdit={this.goToCompanyEdit}
      />
    )
  }

  render() {
    const navigation = this.props.navigation
    return (<
      View style={styles.container}>
      <
        FlatList data={this.props.companies}
                 renderItem={this.renderItem}
                 keyExtractor={
                   (item) => item.id
                 }

      />
      <
      /
      View>
      );
      }
      }

      const mapStateToProps = (state) => {
      const fUserId = state.auth.fUserId || '';
      const company = state.company || '';
      const companies = _.map(state.companies, (val, id) => {
      return {...val, id};
    });

      return {
      fUserId,
      companies,
      company,
    };
    };

      export default connect(mapStateToProps, actions)(CompaniesScreen);