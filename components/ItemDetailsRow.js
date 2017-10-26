import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Card, Button, Header } from './common';
import * as actions from '../actions';

class ItemDetailsRow extends Component {

  constructor(props) {
    super(props);
    console.log('ITEMSDETAILSROW ', this.props);

  }

  componentWillMount(){
    console.log('ITEMSDETAILSROW ', this.props);
  }
  render() {
    const{date, hours, amount, description } = this.props.item
    return (
      <View >
        <CardSection>
          <Text> {date} {hours}</Text>
        </CardSection>
      </View>
      
    )
  }
}

export default ItemDetailsRow;