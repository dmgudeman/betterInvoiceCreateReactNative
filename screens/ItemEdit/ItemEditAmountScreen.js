
import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { 
  Keyboard,
  View, 
  Text, 
}                               from 'react-native';
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                               from 'react-native-elements';
import Icon                     from 'react-native-vector-icons/FontAwesome';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as _                   from 'lodash';
import * as actions             from '../../actions';
import Styles                   from '../Styles';

import MyDatePicker             from '../../components/MyDatePicker';
import { validate }             from '../../utility/Validation';

class itemEditAmountScreen extends Component {

  state = {
    controls: {
      amount: { 
        value: '', 
        valid: false, 
        validationRules: { isNumeric: true }, // isNumeric: true,
        touched: false,
      },
    }
  }

  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules),
            touched: true
          }
        }
      }
    })
  }
  
  componentWillMount(){
    this.props.itemUpdate('goBackKey', this.props.navigation.state.params.goBackKey)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Item',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={40}
        onPress= {  _.debounce(()=> navigation.goBack(navigation.state.params.goBackKey), 2000,{'leading':true, 'trailing':true}) }
        />,
           tabBarLabel:"Amount",
      tabBarIcon: ({ tintColor }) => <Icon name="dollar" size={20} color="#3498db" />
    }
  }
  onSubmit = () => {
    const { amount, companyKey, date, description, fUserId, goBackKey, hours, id, total, hourly } = this.props
    
    const data  = ( (hours - 0 ) * (hourly - 0)) + (amount - 0);
    this.props.itemUpdate('total', data);
   
    this.props.itemEdit({ amount, companyKey, date, description, fUserId, hours, id, total, hourly })
    this.props.navigation.goBack(goBackKey);
  }

  render() {
    const { amount, date, hourly, hours, description, total, itemUpdate, itemTotalUpdate } = this.props;
    return (
      <View
        onStartShouldSetResponder= {(evt) => true }
        onResponderMove= {(evt)=> Keyboard.dismiss()}
      >
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={ moment(date).format('MM/DD/YYYY') }
          onDateChange={(value) => {
          itemUpdate('date', moment(value).toDate().toUTCString() )
          }
        }
        />
        <FormLabel>Amount</FormLabel> 
        <FormInput 
          valid={this.state.controls.amount.valid}
          value={amount}
          placeholder='Amount is necessary'
          keyboardType= 'numeric'
          onChangeText={(value) => {
            this.props.itemUpdate('amount', value)
            this.props.itemTotalUpdate( this.props.hours, value, this.props.hourly)
            this.updateInputState('amount', value)
            }
          }
        />
          {
            !this.state.controls.amount.valid 
            && this.state.controls.amount.touched 
            ? <FormValidationMessage > Amount should be a number </FormValidationMessage> : null
          }
        
        <FormLabel>Description</FormLabel>
        <FormInput
          value={description}
          onChangeText={(value) => itemUpdate('description', value)}
        />

        <Text style={Styles.totalLabel}>Total</Text>
        <Text style={Styles.totalValue}>$ {this.props.total}</Text>

        <Button
          title= "Submit"
          onPress =  {() =>{
            ( this.state.controls.amount.valid )
             ? this.onSubmit() : null}
          }
          backgroundColor={ 
            this.state.controls.amount.valid 
            ?'#bdc3c7':'#bdc3c745'}
          
        /> 
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('ITEMEDIT AMOUNT MSTP state', state);
  const amount       = state.item.amount || '';
  const companyKey   = state.companies.company.companyKey || '';
  const date         = state.item.date || '';
  const description  = state.item.description || '';
  const fUserId      = state.auth.fUserId || '';
  const goBackKey    = state.item.goBackKey
  const hourly       = state.companies.company.hourly || '';

  const hours        = state.item.hours || '';
  const id           = state.item.id || '';
  const name        = state.companies.company.name || '';  
  const total        = state.item.total || '';
  const item = { amount, companyKey, date, description, fUserId, hourly, hours, id, name, total}
  
  return { amount, companyKey, date, description, fUserId, hourly, hours, id, name, total, item };
}
export default connect(mapStateToProps, actions)(itemEditAmountScreen);