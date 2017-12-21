import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View,TouchableWithoutFeedback, } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { CardSection, Card, Button, Header } from './common';
import * as actions from '../actions';
import moment from 'moment';
import DATE_RFC2822 from '../assets/Date'

class  ItemDetailsRow extends Component { 
 
     render() {
       const {onPress } = this.props
       const { date, amount, hours, total, description } = this.props.data;

     return (
      <Card>
        <CardSection>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={ styles.topRowContentStyle}>
            <View style={styles.topRowSectionStyle}>
              <Text>DATE</Text>
              <Text style={styles.topRowTextStyle}>{moment(date).format('MM/DD/YYYY')}</Text>
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
              <Text style={styles.topRowTextStyle}>{ total}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        </CardSection>
        <CardSection>
        <TouchableWithoutFeedback onPress={onPress}>
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

const MapStateToProps = (state) => {
  console.log('ITEMDETAILSROW MSTP state ', state);

return {
   state
}
}
export default connect(MapStateToProps, actions)(ItemDetailsRow);