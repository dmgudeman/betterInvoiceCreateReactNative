import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { CardSection, Card, Button, Header } from './common';
// import { Card, Button } from 'react-native-elements';
import ItemEditScreen from '../screens/ItemEditScreen'; 
import ItemCreateScreen from '../screens/ItemCreateScreen';
import { MainNavigator } from '../App';

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
            <Text style={styles.headerTextStyle} onPress={() => { navigate('companyEdit')} }>{ this.props.company.name }</Text>
          </View>
        </CardSection>
        <CardSection>
          <View style={styles.buttonRowStyle}>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              navigate('items',{coId:this.props.company.id})} }>Details</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { navigate('invoices')} }>Invoices</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { navigate('invoiceCreate')} }>+Invoice</Button>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              navigate('itemCreate',{params: { coId: this.props.company.id}} )}}>+Item</Button>
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

export default ListItem;