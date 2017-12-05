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
     options = _.map(this.props.navigation.state.params.optionsList, "option")

  componentWillMount() {
    console.log('MYPICKER COMPONENTWILLMOUNT tthis.props.navigation.state.params.prop;',this.props.navigation.state.params.prop  );
    console.log('MYPICKER COMPONENTWILLMOUNT tthis.props.navigation.state.params.value;',this.props.navigation.state.params.propValue );
    prop =this.props.navigation.state.params.prop;  
    propValue = this.props.navigation.state.params.value;
    // console.log('MYPICKER COMPONENTWILLMOUNT this.x', x);
    // console.log('MYPICKER COMPONENTWILLMOUNT this.propValue', propValue);
    this.props.companyUpdate(prop, propValue);
    this.props.companyUpdate('prop', prop);
    this.props.companyUpdate('propValue', propValue)
    // const options = _.map(this.props.navigation.state.params.optionsList, "option")
  
  }
  render() {
    // console.log('MyPicker RENDER this.props.navigation.state.params.optionsList', this.props.navigation.state.params.optionsList);
    // console.log('MyPicker render this.props', this.props);
    // console.log('x', x);
    // console.log('y', y); 
    // console.log('this.props.kkkkkk', this.props.k);
    const { prop, propValue, list, listName } = this.props;
    console.log('MYPICKER RENDER list', list);
    return (
      <View>
         <Picker
            selectedValue = {propValue} 
            onValueChange = {(value)=>{
              try{
                console.log('llllllllllllllllllllllllllllllllll',list);
              this.props.companyUpdate(prop, value);
              this.props.companyUpdate('propValue', value)
              } catch (e) {
                console.log('error in render in MyPicker', e);
              }
              // propValue = value;
            } 
          }
          >
          {this.props.list.map((value)=> <Picker.Item label={value} value={value} key={"money"+value}/>)}
        
        </Picker>
        <Text style = {styles.text}>{`Here ${propValue}`}</Text> 
        <Text>Hi There</Text>
      </View>
     )
  }
}
const mapStateToProps = (state) => {
  const prop = state.companies.prop;
  const propValue  = state.companies.propValue
  const list = state.companies.list
  const listName = state.companies.prop


  console.log('MYPICKER MAPSTATETOPROPS state', state);
  
  return {  list, listName, prop, propValue}
}

export default connect(mapStateToProps, actions)(MyPicker);



