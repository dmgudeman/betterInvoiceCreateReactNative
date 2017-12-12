import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import { CardSection, Card, Button, Header } from './common';
// import { Card, Button } from 'react-native-elements';
// import { MainNavigator } from '../App';
import * as _                   from 'lodash';
import * as actions from '../actions';
import colorHexPicker           from '../assets/ColorHexUpdater';
// import _addNavigationHelpers from '../assets/Navigation';

class ListItem extends Component {

  componentWillMount() {
    console.log('LISTITEM COMPONENTWILLMOUNT this.props', this.props);
    
    this.props.companyUpdate('company', this.props.company);
    console.log('LISTITEM COMPONENTWILLMOUNT this.props.company', this.props.company);
    
    this.props.itemUpdate('items', this.props.items )
    console.log('LISTITEM COMPONENTWILLMOUNT this.props.company.items', this.props.company.items);

  }
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const cardColor = this.props.company.hex || this.props.company.color;
    // console.log('LISTITEM RENDER navigate', navigation );
    
    return (
      <Card color={cardColor}>
        <CardSection>
          <View style={ styles.headerContentStyle}>
            <Text style={styles.headerTextStyle} onPress={
              _.debounce(()=> navigation. navigate('companyEdit'), 2000,{'leading':true, 'trailing':true}) 
            }
              >{ this.props.company.name }</Text>
          </View>
        </CardSection>
        <CardSection>
          <View style={styles.buttonRowStyle}>
            <Button style={ styles.buttonContentStyle } 
              onPress={ ()=> {
                // this.props.setCompany(this.props.company)
              console.log('LISTITEM RENDER ITEMMMS this.props', this.props.company.name);
              // this.props.companyUpdate('company', this.props.company);
              console.log('LISTITEM RENDER ITEMS this.props.company', this.props.company);
              
              this.props.itemUpdate('items', this.props.company.items )
              // console.log('LISTITEM ITEMS this.props.company.items', this.propsitems);
                navigate('items')}} 
            >Items</Button>
              
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              console.log('LISTITEM RENDER this.props', this.props);
              this.props.setCompany(this.props.company)
              navigate('itemCreate',{'goBackKey': navigation.state.key})}}>+Item</Button>
              

            <Button style={ styles.buttonContentStyle } onPress={() => { 
              console.log('LISTITEM RENDER this.props', this.props);
              this.props.setCompany(this.props.company)
              navigate('invoices')} }>Invoices</Button>

            <Button style={ styles.buttonContentStyle } onPress={() => { 
              console.log('LISTITEM RENDER this.props', this.props);
              this.props.setCompany(this.props.company)
              navigate('invoiceCreate')} }>+Invoice</Button>
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
mapStateToProps = (state) => {
  const color = state.companies.company.color || '';
  const hex = state.companies.company.hex || '';
  const company = state.companies.company || '';
  const items = state.companies.company.items || '';
}
export default connect(null, actions)(ListItem);