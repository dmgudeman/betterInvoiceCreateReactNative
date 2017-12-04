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
  // console.log('MYPICKER COMPONENTWILLMOUNT this.x', x);
  // console.log('MYPICKER COMPONENTWILLMOUNT this.pickerProp', pickerProp);
  // console.log('MYPICKER COMPONENTWILLMOUNT this.props', this.props);
  }
  render() {
    // console.log('MyPicker RENDER this.props.navigation.state.params.optionsList', this.props.navigation.state.params.optionsList);
    // console.log('MyPicker render this.props', this.props);
    // console.log('x', x);
    // console.log('y', y); 
    // console.log('this.props.kkkkkk', this.props.k);

    return (
      <View>
        {/* <Picker
            selectedValue = {pickerValue} onValueChange = {(value)=>{
              picker = value;
            } 
          }
        >
          {options.map((value)=> <Picker.Item label={value} value={value} key={"money"+value}/>)}
        </Picker>
        <Text style = {styles.text}>{`Here ${pickerProp}`}</Text>  */}
        <Text>Hi There</Text>
      </View>
     )
  }
}
const mapStateToProps = (state) => {
  console.log('MYPICKER MAPSTATETOPROPS state', state);
  
  return {}
}

export default connect(mapStateToProps, actions)(MyPicker);



