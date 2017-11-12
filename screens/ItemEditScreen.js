
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text, DatePickerIOS }       from 'react-native';
import { connect } from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                           from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import * as actions from '../actions';

class ItemEditScreen extends Component {
  
  componentWillMount() {
    const {dispatch} = this.props
    console.log('ItemEditScreen componentWillMount this.props ', this.props);
  }
  onSubmit = () => {
    // const { amount, coId, date, description, fUserId, hours, id,  total,  } = this.props
    let total = (
      (hours - 0 ) * (hourly - 0)) + (amount - 0);
   
    console.log('date111111111', amount, coId, date, description, fUserId, hours, id,  total, );
    this.props.itemEdit({ amount, coId, date, description, fUserId, hours, id,  total, })
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <FormLabel>Date</FormLabel>
        <DatePicker
          style={{width: 200}}
          date={this.props.date}
          mode="date"
          placeholder="select date"
          format="LL"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
        }}
        onDateChange={(value) => {
          this.props.itemUpdate('date',value )}
        }
      />
        <FormLabel>Hours</FormLabel>
        <FormInput 
          value={this.props.hours}
          onChangeText={(input) => { 
              console.log('ITEMEDIT HOURS input', input);
              this.props.changeItemHours( input)
            }
          }
        />
        <FormLabel>Amount</FormLabel>
        <FormInput 
      value={this.props.amount}
        onChangeText={(value) => this.props.itemUpdate('amount', value)}
        />
        <FormLabel>Description</FormLabel>
        <FormInput
        value={this.props.description}
        onChangeText={(value) => this.props.itemUpdate('description', value)}
        />
        <Button
          title= "Submit"
          onPress =  {this.onSubmit }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('ITEMEDIT ItemEditScreen state', state);
  const id = state.item.id;
  const amount = state.item.amount
  const coId = state.item.coId;
  const date = state.item.date;
  const description = state.item.description;
  const fUserId = state.item.fUserId;
  const hours = state.item.hours;
 
  const total = state.item.total;

  console.log('itemEdit mapStateToProps hours', hours );

  // const { amount, coId, date, description, fUserId, hours, id,  total,  } = state.item;
  return { 
    amount, coId, date, description, fUserId, hours, id, total

   };
}
const mapDispatchToProps = (dispatch) => {
  const {itemUpdate, changeItemHours} = actions;
   return bindActionCreators({itemUpdate, changeItemHours}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(ItemEditScreen);