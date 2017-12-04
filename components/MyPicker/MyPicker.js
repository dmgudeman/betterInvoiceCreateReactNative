import React, { Component } from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Animated,
} from 'react-native';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';
import * as actions             from '../../actions';

const x = '';
const pickerProp = ''


class MyPicker extends Component {

  componentWillMount() {
    console.log('MYPICKER COMPONENTWILLMOUNT tthis.props.navigation.state.params.prop;',this.props.navigation.state.params.prop  );
    console.log('MYPICKER COMPONENTWILLMOUNT tthis.props.navigation.state.params.value;',this.props.navigation.state.params.value );
    prop =this.props.navigation.state.params.prop;  
    value = this.props.navigation.state.params.value;
    // console.log('MYPICKER COMPONENTWILLMOUNT this.x', x);
    // console.log('MYPICKER COMPONENTWILLMOUNT this.pickedProp', pickedProp);
    this.props.companyUpdate(prop, value);
    this.props.companyUpdate('prop', prop);
    this.props.companyUpdate('value',value)
  
  }
  render() {
    // console.log('MyPicker RENDER this.props.navigation.state.params.optionsList', this.props.navigation.state.params.optionsList);
    // console.log('MyPicker render this.props', this.props);
    // console.log('x', x);
    // console.log('y', y); 
    // console.log('this.props.kkkkkk', this.props.k);
    const { prop, value, list, listName } = this.props;
    return (
      <View>
         <Picker
            selectedValue = {pickerValue} onValueChange = {(value)=>{
              picker = value;
            } 
          }
        >
          {options.map((value)=> <Picker.Item label={value} value={value} key={"money"+value}/>)}
        </Picker>
        <Text style = {styles.text}>{`Here ${pickerProp}`}</Text> 
        <Text>Hi There</Text>
      </View>
     )
  }
}
const mapStateToProps = (state) => {
  const prop = state.companies.prop;
  const value  = state.companies.value
  const list = state.companies.list
  const listName = state.companies.prop

  console.log('MYPICKER MAPSTATETOPROPS state', state);
  
  return { prop, list,listName, value}
}

export default connect(mapStateToProps, actions)(MyPicker);



