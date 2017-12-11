import React, { Component } from 'react';
import { Text, View,TouchableWithoutFeedback, } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Card, Button, Header } from './common';
import * as actions from '../actions';
import moment from 'moment';


const InvoiceDetailsRow = ({data, onPress }) => (
      <Card>
        <CardSection>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={ styles.topRowContentStyle}>
              <View style={styles.topRowSectionStyle}>
                <Text>DUE DATE</Text>
                <Text style={styles.topRowTextStyle}>{moment(data.dueDate).format('MM/DD/YYYY')}</Text>
              </View>
              <View style={styles.topRowSectionStyle}>
                <Text>FROM</Text>
                <Text style={styles.topRowTextStyle}>{moment(data.beginDate).format('MM/DD/YYYY')}</Text>
              </View>
              <View style={styles.topRowSectionStyle}>
                <Text>TO</Text>
                <Text style={styles.topRowTextStyle}>{moment(data.endDate).format('MM/DD/YYYY')}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </CardSection>
        <CardSection>
          <TouchableWithoutFeedback onPress={onPress}>
            <View >
              <View >
                <Text style={{marginLeft:20}} >{data.description}</Text>
              </View>
              <View>
                <Text style={{marginLeft:20}}>Total: ${data.total}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </CardSection>
      </Card>
)

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
    textAlign: 'center',
  },
  // bottomRowContentStyle: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   height: 35,
  //   width: '100%',
  

  // },
  // bottomRowTextStyle: {
  //   flex: 1,
  //   width: 100,
  //   backgroundColor: 'green'
  // }
}

export default InvoiceDetailsRow;