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
import colorHexPicker           from '../assets/ColorHexUpdater';

const setParamsAction = ( params, key ) => {NavigationActions.setParams({
  params, key
})}
class ListItem extends Component {
   
  render() {
    // if(this.props.color) {
    //   colorHexPicker(this.props.color, this.props.companyUpdate)
    // }
    // console.log('LISITEM RENDER this.props', this.props);
    const { navigate } = this.props.navigation
    const color = this.props.company.hex || this.props.company.color;
    // console.log('LISTITEM RENDER this.props.company.color', color);
    
    return (
      <Card color={color}>
       {/* <Card color={"#3498db"}> */}
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
              navigate('items')}}>Items</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setCompany(this.props.company)
              navigate('itemCreate')}}>+Item</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setCompany(this.props.company);
              navigate('invoices')} }>Invoices</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              // console.log('LISTITEM RENDER this.props', this.props);
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
}
export default connect(null, actions)(ListItem);