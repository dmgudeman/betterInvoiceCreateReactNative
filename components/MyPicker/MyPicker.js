import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import {
  Modal,
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
}                               from 'react-native';
import _                        from 'lodash';
import ModalSelector            from 'react-native-modal-selector'
import EStyleSheet              from 'react-native-extended-stylesheet';
import styles                   from './styles';
import * as actions             from '../../actions';




class MyPicker extends Component {
    //  options = _.map(this.props.navigation.state.params.optionsList, "option")

  componentWillMount() {
    console.log('MYPICKER');

    console.log('MYPICKER COMPONENTWILLMOUNT tthis.props.',this.props);
    
  }

  updater(option) {
    try { 
      console.log('llllllllllllllllllllllllllllllllll',list);
      this.props.companyUpdate(prop, option.label);
      this.props.companyUpdate('propValue', option.label)
    } catch (e) {
      console.log('error in render in MyPicker', e);
    }
  }
  
  render() {
    let index = 0;
    const data = [
        { key: index++, section: true, label: 'Fruits' },
        { key: index++, label: 'Red Apples' },
        { key: index++, label: 'Cherries' },
        { key: index++, label: 'Cranberries' },
        // etc...
        // Can also add additional custom keys which are passed to the onChange callback
        { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
    ];
    const { prop, propValue, list, listName } = this.props;
    console.log('MYPICKER RENDER list', list);
    console.log('MYPICKER RENDER this.props', this.props);
    console.log('MYPICKER RENDER this.props.prop', this.props.prop);
    console.log('MYPICKER RENDER this.props.propValue', this.props.propValue);
    return (
      <View>
        <ModalSelector 
          data={data}
          initValue="Select something yummy!"
                    // supportedOrientations={['landscape']
          onFocus={console.log( data)}
          onChange={(option)=>{console.log('oooooption', option)}}
          onChange={(option)=>{()=>this.updater(option) } }
        >
          <TextInput
              style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
              editable={false}
              placeholder="Select something yummy!"
              value={this.props.prop} 
          />
        </ModalSelector>
        <Text style = {styles.text}>{`Here ${propValue}`}</Text> 
        <Text>Hi There</Text>
     </View>
 
  )
         /* <Picker
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
        
        </Picker> */
       
  }
}
const mapStateToProps = (state) => {
  const prop = state.companies.prop;
  const propValue  = state.companies.propValue
  const list = state.companies.list
  const listName = state.companies.prop
  
  const textInputValue = state.companies.textInputValue || '';

  console.log('MYPICKER MAPSTATETOPROPS state', state);
  
  return {  list, listName, prop, propValue, textInputValue}
}

export default connect(mapStateToProps, actions)(MyPicker);



