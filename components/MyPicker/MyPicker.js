import React, { Component } from 'react';
import MyPickerItem from './MyPickerItem';
import {Select, Option} from "react-native-chooser";
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import styles from './styles';

const OPTION_ARRAY =[];

export default class MyPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {value : "Select Me Please"}
  }

  
  onSelect(value, label) {
    this.setState({value : value});
  }
  renderItem =(option)=> {
    console.log('MYPICKER renderItem option ', option);
    return  (
       <MyPickerItem
         option = {option} 
         renderItem={this.renderItem}
         />
    )
  }
  // _keyExtractor = (option, index) => index;

  render() {
    const {labelText} = this.props;
    console.log('MYPICKER render this.props.optionsArray', this.props.optionsArray);
    return (
      <View style={styles.container}>
      <Text style={styles.labelStyle}>{labelText} </Text>
      
        <Select
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.value}
            style = {{borderWidth : 1, borderColor : "green"}}
            textStyle = {{}}
            backdropStyle  = {{backgroundColor : "#d3d5d6"}}
            optionListStyle = {{backgroundColor : "#F5FCFF"}}
            onPress={this.renderItem}
          >
          <View>
          <FlatList 
            option = {this.props.optionsArray}
            // keyExtractor = {this._keyExtractor}
            renderItem={this.renderItem}
           
          />
          {/* <Option value = "johnceena">Johnceena</Option>
          <Option value = "undertaker">Undertaker</Option>
          <Option value = "Daniel">Daniel</Option>
          <Option value = "Roman">Roman</Option>
          <Option value = "Stonecold">Stonecold</Option>
          <Option value = "Rock">Rock</Option>
          <Option value = "Sheild">Sheild</Option>
          <Option value = "Orton">Orton</Option> */}
        </View>
        </Select>
      </View>
    );
  }
}

// const styles ={
// container: {
//   marginTop: 30,
//   marginLeft: 30
// },
// textStyle: {
//   color: 'red',
//   marginLeft: 30,
//   marginBottom:10,

// },
// inputStyle: {
//   color: '#000',
//   paddingRight: 5,
//   paddingLeft: 5,
//   fontSize: 18,
//   lineHeight: 23,
//   flex: 2
// },
// labelStyle: {
//   fontSize: 18,
//   paddingLeft: 20,
//   flex: 1
// },
// containerStyle: {
//   height: 40,
//   flex: 1,
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: 'green',
//   paddingLeft: 10,
//   paddingRight: 10,
// }
// }
// class MyPicker extends Component {

//   render () {
//     const {payload}=this.props;
//     return (
//       <MyPickerItem payload={payload}/>
    
//     )
//   }

// }

// export default MyPicker;