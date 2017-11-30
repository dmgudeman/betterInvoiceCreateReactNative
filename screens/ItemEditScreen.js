
import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  View, 
  Text, 
  DatePickerIOS 
}                               from 'react-native';
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as actions             from '../actions';

class itemEditScreen extends Component {
  
  componentWillMount() {
    console.log('itemEditScreen componentWillMount this.props ', this.props);
    
   
  }
  onSubmit = () => {
    console.log('ItemEditScreen onSubmit this.props', this.props);
    const { amount, companyKey, date, description, fUserId, hours, id, total, hourly } = this.props
    
    const data  = ( (hours - 0 ) * (hourly - 0)) + (amount - 0);
    this.props.itemUpdate('total', data);
   
    console.log('date111111111', amount, companyKey, date, description, fUserId, hours, id, total, hourly  );
    this.props.itemEdit({ amount, companyKey, date, description, fUserId, hours, id, total, hourly })
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
          minDate="2017-01-01"
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
          console.log('ItemEditScreen render date.value', value);
          this.props.itemUpdate('date',value )}
        }
      />
        <FormLabel>Hours</FormLabel>
        <FormInput 
          value={this.props.hours}
          onChangeText={(input) => { 
              console.log('itemEdit HOURS input', input);
              this.props.itemUpdate('hours', value)
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

  const companyKey   = state.companies.company.companyKey;
  const hourly       = state.companies.company.hourly;
  const id           = state.item.id;
  const amount       = state.item.amount
  const date         = state.item.date;
  const description  = state.item.description;
  const fUserId      = state.item.fUserId;
  const hours        = state.item.hours;
  const total        = state.item.total;

  // const { amount, companyKey, date, description, fUserId, hours, id,  total,  } = state.item;
  return { amount, companyKey, date, description, fUserId, hours, id, total, hourly };
}
// const mapDispatchToProps = (dispatch) => {
//   const {itemUpdate, changeItemHours, itemEdit} = actions;
//   return bindActionCreators({itemUpdate, changeItemHours, itemEdit}, dispatch)
// }
export default connect(mapStateToProps, actions)(itemEditScreen);