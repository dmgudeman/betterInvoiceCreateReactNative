
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

import MyDatePicker from '../components/MyDatePicker';

class itemEditScreen extends Component {
  
  componentWillMount() {
    console.log('itemEditScreen componentWillMount this.props ', this.props);
    // this.props.itemUpdate('date', moment().format()  )
    // this.props.itemUpdate('hours', '');
    // this.props.itemUpdate('amount', '');
    // this.props.itemUpdate('description', '');
    // this.props.itemTotalUpdate(0, 0, this.props.hourly) 
   
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
    console.log('ITEMEDITSCREEN RENDER this.props.hours', this.props.hours);
    return (
      <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={this.props.date}
          onDateChange={(value) => {
            // console.log('ItemEditScreen render beginDate.value', value);
            this.props.itemUpdate('date', value )
            }
          }
        />
        <FormLabel>Hours</FormLabel>
        <FormInput 
          value={`${this.props.hours}`}
          onChangeText={(value) => { 
            this.props.itemUpdate('hours', value) 
            this.props.itemTotalUpdate( value, this.props.amount, this.props.hourly)
          }
        }
        />
        <FormLabel>Amount</FormLabel>
        <FormInput 
          value={this.props.amount}
          onChangeText={(value) => {
            this.props.itemUpdate('amount', value)
            this.props.itemTotalUpdate( this.props.hours, value, this.props.hourly)
            }
          }
        />
        <FormLabel>Description</FormLabel>
        <FormInput
        value={this.props.description}
        onChangeText={(value) => this.props.itemUpdate('description', value)}
        />
        <Text style={{marginLeft:40, fontSize: 25 }}>Total: ${this.props.total}</Text>
        <Button
          title= "Submit"
          onPress =  {this.onSubmit }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const fUserId      = state.auth.fUserId || '';
  
  const companyKey   = state.companies.company.companyKey || '';
  const hourly       = state.companies.company.hourly;
  const id           = state.item.id || '';
  
  const amount =      state.item.amount || 0
  const date =        state.item.date || moment().format();
  const description = state.item.description || '';
  const hours =       state.item.hours || '';
  const total =       state.item.total || '';
  const item = { amount, companyKey, date, description, fUserId, hourly, hours, total}
  
    console.log('ITEMCREATESCREEN MAPSTATETOPROPS item', item);
  

  // const { amount, companyKey, date, description, fUserId, hours, id,  total,  } = state.item;
  return { amount, companyKey, date, description, fUserId, hours, id, total, hourly };
}
// const mapDispatchToProps = (dispatch) => {
//   const {itemUpdate, changeItemHours, itemEdit} = actions;
//   return bindActionCreators({itemUpdate, changeItemHours, itemEdit}, dispatch)
// }
export default connect(mapStateToProps, actions)(itemEditScreen);