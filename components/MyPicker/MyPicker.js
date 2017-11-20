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

class MyPicker extends Component {
  propName = this.props.navigation.state.params.prop;  
  propValue= this.props.navigation.state.params.value;
  

  componentWillMount() {
  this.props.companyUpdate(propName, this.propName)
  this.props.companyUpdate(propValue, this.propValue );
  }
  render() {
    const navigation = this.props.navigation

    // console.log('MyPicker RENDER this.props.navigation.state.params.optionsList', this.props.navigation.state.params.optionsList);
    console.log('MyPicker render this.props', this.props);
    const options = _.map(navigation.state.params.optionsList, "option")
    console.log('MyPicker render this.props.propName', this.propName);
    return (
      <View>
        <Picker
            selectedValue = {this.props[this.propName]} onValueChange = {(value)=>{ 
              this.propValue = value;
              this.props.companyUpdate(this.propName, value )}
            }
        >
          {options.map((value)=> <Picker.Item label={value} value={value} key={"money"+value}/>)}
        </Picker>
        <Text style = {styles.text}>{`Here ${this.propValue}`}</Text> 
      </View>
     )
  }
}
const mapStateToProps = (state) => {
   propName = '';
   propValue = '';

  return {propName, propValue}
} 

const mapDispatchToProps = (dispatch) => {
  const {companyUpdate, companyCreate} = actions;
  return bindActionCreators({companyUpdate, companyCreate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(MyPicker);



