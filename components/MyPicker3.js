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
import style from './style';
import * as actions             from '../actions';

class MyPicker3 extends Component {
  propName = this.props.navigation.state.params.prop; 
 
  componetWillMount() {
    this.props.optionsList = this.props.navigation.state.params.optionsList;
    console.log('MYPICKER3 componentWillMount this.props.optionsList', this.props.optionsList );
  
  }
 
 render() {
             const navigation = this.props.navigation
             console.log('MYPICKER3 RENDER this.props.navigation.state.params.optionsList', this.props.navigation.state.params.optionsList);
             console.log('MYPICKER3 render this.props.optionsList', this.props.optionsList);
              const options = _.map(this.props.navigation.state.params.optionsList, "option")
             console.log('MYPICKER3 render options',options);
     return (
        <View>
           <Picker
              selectedValue = {this.props[this.propName]} onValueChange = {(value)=>{ 
                this.props.companyUpdate(this.propName, value )}
              }
            >
            {options.map((value)=> <Picker.Item label={value} value={value} key={"money"+value}/>)}
           </Picker>
           <Text style = {styles.text}>{`Here ${this.props[this.propName]}`}</Text> 
        </View>
     )
  }
}
const mapStateToProps = (state) => {
    const name = state.companies.name || '';
    // const optionsArray = [{option:'Mark'},{option:'Ted'},{option:'Randy'}]
    const optionsList = ''
    
  return { name, optionsList};
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
     color: 'red',

  }
});
