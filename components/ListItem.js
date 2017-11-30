import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import { CardSection, Card, Button, Header } from './common';
// import { Card, Button } from 'react-native-elements';
import ItemEditScreen from '../screens/ItemEditScreen'; 
import ItemCreateScreen from '../screens/ItemCreateScreen';
import { MainNavigator } from '../App';
import * as actions from '../actions';

const setParamsAction = ( params, key ) => {NavigationActions.setParams({
  params, key
})}
class ListItem extends Component {
  
  render() {

    const { navigate } = this.props.navigation

    return (
      <Card color={this.props.company.color}>
        <CardSection>
          <View style={ styles.headerContentStyle}>
            <Text style={styles.headerTextStyle} onPress={() => 
              { navigate('companyEdit',  {company: this.props.company})} }>{ this.props.company.name }</Text>
          </View>
        </CardSection>
        <CardSection>
          <View style={styles.buttonRowStyle}>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setCompany(this.props.company)
              navigate('items')}}>Details</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setInvoices(this.props.company.invoices);
              navigate('invoices')} }>Invoices</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              console.log('LISTITEM RENDER this.props', this.props);
              this.props.setCompany(this.props.company)
              navigate('invoiceCreate')} }>+Invoice</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setCompany(this.props.company)
              navigate('itemCreate')}}>+Item</Button>
          </View>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    height: 45,

  },
  headerTextStyle: {
    fontSize: 22,
    color: 'white'
  },
  buttonRowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
  },
  buttonContentStyle: {
    flex: 1,
  }
}

export default connect(null, actions)(ListItem);