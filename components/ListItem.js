import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import { CardSection, Card, Button, Header } from './common';
// import { Card, Button } from 'react-native-elements';
import { MainNavigator } from '../App';
import * as actions from '../actions';
import colorHexPicker           from '../assets/ColorHexUpdater';
import _addNavigationHelpers from '../assets/Navigation';

class ListItem extends Component {
  constructor(props) {
    super(props);
   this.debouncedOnpress = _.debounce(this._onPressFunc, 2000, {'leading': true, 'trailing': false,});
  }

  _onPressFunc = () => {
        console.log("Debounced!");
      this.props.navigation.navigate('companyEdit',  {company: this.props.company}) 
  } 
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const color = this.props.company.hex || this.props.company.color;
    console.log('LISTITEM RENDER navigate', navigation );
    
    return (
      <Card color={color}>
     
        <CardSection>
          <View style={ styles.headerContentStyle}>
            <Text style={styles.headerTextStyle} onPress={
            
              this.debouncedOnpress }
              // () => 
              // { navigate('companyEdit',  {company: this.props.company})} }
              >{ this.props.company.name }</Text>
          </View>
        </CardSection>
        <CardSection>
          <View style={styles.buttonRowStyle}>
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setCompany(this.props.company)
              navigate('items')}}>Items</Button>
              
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setCompany(this.props.company)
              navigate('itemCreate',{'goBackKey': navigation.state.key})}}>+Item</Button>
              
            <Button style={ styles.buttonContentStyle } onPress={() => { 
              this.props.setCompany(this.props.company)
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