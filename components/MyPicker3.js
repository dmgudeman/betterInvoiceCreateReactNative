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
import EStyleSheet from 'react-native-extended-stylesheet';
import style from './style';
import * as actions             from '../actions';


class MyPicker3 extends Component {
  propName = this.props.navigation.state.params.prop; 
  componentWillMount() {
    console.log('myPicker3 componentDidMount this.propName', this.propName);
  //   const {prop} = this.props.navigation.state.params.prop; 
    // console.log('this.props.navigation.state.params.prop', this.props.navigation.state.params.prop);
  }


 
  render() {
     return (
        <View>
           <Picker
              selectedValue = {this.props[this.propName]} onValueChange = {(value)=>{ 
                console.log('MYPICKER3 render this.props',this.propValue);
                this.props.companyUpdate(this.propName, value )}
              }
            >
              <Picker.Item label = "Steve" value = "steve" />
              <Picker.Item label = "Ellen" value = "ellen" />
              <Picker.Item label = "Maria" value = "maria" />
           </Picker>
           <Text style = {styles.text}>{`Here ${this.props[this.propName]}`}</Text>
        </View>
     )
  }
}
const mapStateToProps = (state) => {
  console.log('MyPicker3 mapStateToProps this.propName', this.propName);
    const name = state.companies.name || '';
    
  return {name};
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
