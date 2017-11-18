import React, { Component } from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Animated,
  TouchableHighlight,
} from 'react-native';
import Style from './style';
import * as actions             from '../actions';


class MyPicker3 extends Component {
 
  render() {
     return (
        <View>
           <Picker selectedValue = {this.props.name} onValueChange = {(value)=>{ this.props.companyUpdate('name',value )}}>
              <Picker.Item label = "Steve" value = "steve" />
              <Picker.Item label = "Ellen" value = "ellen" />
              <Picker.Item label = "Maria" value = "maria" />
           </Picker>
           <Text style = {styles.text}>{this.props.name}</Text>
        </View>
     )
  }
}
const mapStateToProps = (state) => {
  const company = state.companies.company || null;
  if (company) {
    const name = state.company.name || '';
  }
  return {company};
} 

const mapDispatchToProps = (dispatch) => {
  const {companyUpdate, companyCreate} = actions;
  return bindActionCreators({companyUpdate, companyCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(MyPicker3);

const styles = StyleSheet.create({
  text: {
     fontSize: 30,
     alignSelf: 'center',
     color: 'red'
  }
});
