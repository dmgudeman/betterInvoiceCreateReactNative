import React, { Component } from 'react';
import { Text, View,TouchableWithoutFeedback, } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Card, Button, Header } from './common';
import * as actions from '../actions';
import moment from 'moment';


class ItemDetailsRow extends Component {
 

  componentWillMount(){
    console.log('ITEMSDETAILSROWXXXXXXXX ', this.props);
    console.log('ITEMSDETAILROW this.props.onPress', this.props.onPress);

  }

  render() {
    const {date, hours, amount, description, total } = this.props.item;
    const x = this.props.onPress
    return (
      <Card>
        <CardSection>
        <TouchableWithoutFeedback onPress={x()}>
          <View style={ styles.topRowContentStyle}>
            <View style={styles.topRowSectionStyle}>
              <Text>DATE</Text>
              <Text style={styles.topRowTextStyle}>{date}</Text>
            </View>
            <View style={styles.topRowSectionStyle}>
              <Text>HOURS</Text>
              <Text style={styles.topRowTextStyle}>{hours}</Text>
            </View>
            <View style={styles.topRowSectionStyle}>
              <Text>AMOUNT</Text>
              <Text style={styles.topRowTextStyle}>{amount}</Text>
            </View>
            <View style={styles.topRowSectionStyle}>
              <Text>TOTAL</Text>
              <Text style={styles.topRowTextStyle}>{total}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        </CardSection>
        <CardSection>
        <TouchableWithoutFeedback onPress={this.goToItemEdit}>
          <View style={styles.bottomRowContentStyle}>
            <Text style={styles.bottomRowTextStyle}>{description}</Text>
          </View>
        </TouchableWithoutFeedback>
        </CardSection>
      </Card>
    )
  }
}


const styles = {
  containerStyle:{
     border: 1
  },
  topRowContentStyle:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
  },
  topRowSectionStyle: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  topRowTextStyle: {
    flex: 1,
    textAlign: 'center'
  },
  bottomRowContentStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 35,
  },
  bottomRowTextStyle: {
    flex: 1
  }
}

export default ItemDetailsRow;