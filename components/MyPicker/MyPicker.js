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
const pickedProp = ''


class MyPicker extends Component {

  componentWillMount() {
  x = this.props.navigation.state.params.prop;  
  pickedProp= this.props.navigation.state.params.value;
  // console.log('MYPICKER COMPONENTWILLMOUNT this.x', x);
  // console.log('MYPICKER COMPONENTWILLMOUNT this.pickedProp', pickedProp);
  this.props.companyUpdate(x, pickedProp)
  // console.log('MYPICKER COMPONENTWILLMOUNT this.props', this.props);
  }
  render() {
    const navigation = this.props.navigation
    let y = this.props.navigation.state.params.prop; 
    // console.log('MyPicker RENDER this.props.navigation.state.params.optionsList', this.props.navigation.state.params.optionsList);
    // console.log('MyPicker render this.props', this.props);
    // console.log('x', x);
    // console.log('y', y); 
    // console.log('this.props.kkkkkk', this.props.k);
    const options = _.map(navigation.state.params.optionsList, "option")

    return (
      <View>
        <Picker
            selectedValue = {pickedProp} onValueChange = {(value)=>{
              pickedProp = value;
              // console.log('pickedProp', pickedProp); 
              // console.log('yyyyyyyyyyyyy', y); 
              // console.log('vvvvvvvvv' , value);
              // console.log('this.props.kkkkkkkk', this.props.k);
              this.props.companyUpdate( y, value );
            } 
          }
        >
          {options.map((value)=> <Picker.Item label={value} value={value} key={"money"+value}/>)}
        </Picker>
        <Text style = {styles.text}>{`Here ${pickedProp}`}</Text> 
      </View>
     )
  }
}
const mapStateToProps = (state) => {
  k = state.companies[x] || '';
  // console.log('MAPSTATETOPROPS x', x);
  return {k}
}

const mapDispatchToProps = (dispatch) => {
  const {companyUpdate, companyCreate} = actions;
  return bindActionCreators({companyUpdate, companyCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(MyPicker);



