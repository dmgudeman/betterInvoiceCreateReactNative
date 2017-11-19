import React, { Component } from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import {
  FlatList,
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
import MyPickerList from  './MyPicker/MyPickerItem';


class MyPicker3 extends Component {
  propName = this.props.navigation.state.params.prop; 
  textBLock ='';
  // optionsArray = this.props.navigation.state.params.optionsArray;
  componentWillMount() {
    console.log('myPicker3 componentDidMount this.propName', this.propName);
    console.log('this.props.optionsArray', this.props.optionsArray);
    this.textBlock = this.runThis(this.props.optionsArray)
    console.log('componentWillMount hhhhhhhhhhh this.textBlock', this.textBLock);
  //   const {prop} = this.props.navigation.state.params.prop; 
    // console.log('this.props.navigation.state.params.prop', this.props.navigation.state.params.prop);
  }
  renderItem =({item, index})=> {
    console.log('invoicesScreen renderItem item, index, item.id ', item, item.id, index);
    console.log('invoicesScreen renderItem  this.props.optionsArray[index].option',  `${this.props.optionsArray[index].option}`);
    // console.log(this.props.optionsArray);
    const option = this.props.optionsArray[index].option;
    return  (
      <MyPickerItem option ={option} /> 
    )
   
  }

 runThis = (data)=> {
   
  for (let i=0; i<data.length; i++ ){
    console.log('ddddddddddddddddddddata',  `${this.textBLock}`);
    this.textBlock = `${this.textBlock}  <Picker.Item label = "${data[i].option}" value = "${data[i].option}"/>`
    console.log('ddddddddddddddddddddata',  `${this.textBLock}`);
  }
  console.log('iiiinnnnn runThis  this.textBlock', this.textBlock);
  return this.textBlock;

}
 
 
 render() {
             const navigation = this.props.navigation
             console.log('MYPICKER3 render this.props.optionsArray', this.props.optionsArray);
     return (
        <View>
         
         {/* <FlatList 
                  data ={this.props.optionsArray}
                  renderItem={this.renderItem}
                  keyExtractor={(item) =>{item}}
                /> */}
           <Picker
              selectedValue = {this.props[this.propName]} onValueChange = {(value)=>{ 
                this.props.companyUpdate(this.propName, value )}
              }
            >
              {/* { <MyPickerList optionsArray ={this.props.optionsArray} />} */}
              {this.textBLock}
                
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
    const name = state.companies.name || '';
    const optionsArray = [{option:'Mark'},{option:'Ted'},{option:'Randy'}]
    
  return {name, optionsArray};
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
