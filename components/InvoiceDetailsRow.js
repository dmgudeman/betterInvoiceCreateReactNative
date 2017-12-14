import React, { Component } from 'react';
import { Text, View,TouchableWithoutFeedback, } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Card, Button, Header } from './common';
import * as actions from '../actions';
import moment from 'moment';


class InvoiceDetailsRow extends Component {    //({data, onPress }) => (

  componentWillMount() {
    console.log('INVOICE DETAIL WILL MOUNT this.props', this.props );
  }
  componentWillUpdate() {
    console.log('INVOICE DETAIL WILL UPDATE this.props', this.props );
  }
  componentDidUpdate() {
    console.log('INVOICE DETAIL DID UPDATE this.props', this.props );
  }
  componentWillReceiveProps () {
    console.log('INVOICE DETAIL WILL RECEIVE PROPS this.props', this.props );
  }
  componentDidCatch () {
    console.log('INVOICE DETAIL DID CATCH this.props', this.props );
  }

  render() {

    return(
      <Card>
        <CardSection>
          <TouchableWithoutFeedback onPress={this.props.onPress}>
            <View style={ styles.topRowContentStyle}>
              <View style={styles.topRowSectionStyle}>
                <Text>DUE DATE</Text>
                <Text style={styles.topRowTextStyle}>{moment(this.props.data.dueDate).format('MM/DD/YYYY')}</Text>
              </View>
              <View style={styles.topRowSectionStyle}>
                <Text>FROM</Text>
                <Text style={styles.topRowTextStyle}>{moment(this.props.data.beginDate).format('MM/DD/YYYY')}</Text>
              </View>
              <View style={styles.topRowSectionStyle}>
                <Text>TO</Text>
                <Text style={styles.topRowTextStyle}>{moment(this.props.data.endDate).format('MM/DD/YYYY')}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </CardSection>
        <CardSection>
          <TouchableWithoutFeedback onPress={this.props.onPress}>
            <View >
              <View >
                <Text style={{marginLeft:20}} >{this.props.data.description}</Text>
              </View>
              <View>
                <Text style={{marginLeft:20}}>Total: ${this.props.data.total}</Text>
              </View>
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

const MapStateToProps = (state) => {
  console.log('INVOICE DETAIL MSTP state ', state);

return {
   state
}
}
export default connect(MapStateToProps, actions)(InvoiceDetailsRow);