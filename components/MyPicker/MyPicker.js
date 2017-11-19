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
 
  componetWillMount() {
    this.props.optionsList = this.props.navigation.state.params.optionsList;
    console.log('MyPicker componentWillMount this.props.optionsList', this.props.optionsList );
  
  }
 
 render() {
             const navigation = this.props.navigation
             console.log('MyPicker RENDER this.props.navigation.state.params.optionsList', this.props.navigation.state.params.optionsList);
             console.log('MyPicker render this.props.optionsList', this.props.optionsList);
              const options = _.map(this.props.navigation.state.params.optionsList, "option")
             console.log('MyPicker render options',options);
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
export default connect(mapStateToProps, mapDispatchToProps )(MyPicker);



