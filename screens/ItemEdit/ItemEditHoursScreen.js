
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
import Icon                     from 'react-native-vector-icons/FontAwesome';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as actions             from '../../actions';
import Styles                   from '../Styles';

import MyDatePicker             from '../../components/MyDatePicker';
import { validate }             from '../../utility/Validation.js';

class itemEditHoursScreen extends Component {
  state = {
    controls: {
      hours: { 
        value: '', 
        valid: true, 
        validationRules: { isNumeric: true }, 
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
        onPress= { ()=> { navigation.goBack( navigation.state.params.goBackKey) }}/>,
      tabBarLabel:"Hours",
      tabBarIcon: ({ tintColor }) => <Icon name="hourglass" size={20} color="#3498db" />
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
    const { amount, date, hourly, hours, description, total, itemUpdate, itemTotalUpdate, itemCreate } = this.props;
    return (
      <View>
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
           date={ moment(this.props.date).format('MM/DD/YYYY') }
           onDateChange={(value) => {
             this.props.itemUpdate('date', moment(value).toDate().toUTCString() )
             }
          }
        />
         <FormLabel>Hours</FormLabel> 
         <FormInput 
           valid={this.state.controls.hours.valid}
           value={hours}
           touched={this.state.controls.hours.touched}
           keyboardType= 'numeric'
           onChangeText={(value) => {
            itemUpdate('hours', value) 
            itemTotalUpdate( value, this.props.amount, this.props.hourly)
             this.updateInputState('hours', value)
           }
         }
         />
         {
           !this.state.controls.hours.valid 
           && this.state.controls.hours.touched 
           ? <FormValidationMessage > Hours should be a number </FormValidationMessage> : null
         }
        
        <FormLabel>Description</FormLabel>
        <FormInput
          value={this.props.description}
          onChangeText={(value) => this.props.itemUpdate('description', value)}
        />

        <Text style={Styles.totalLabel}>Total</Text>
        <Text style={Styles.totalValue}>$ {this.props.total}</Text>

        <Button
          title= "Submit"
          onPress =  {() => 
            ( this.state.controls.hours.valid )
             ? this.onSubmit(this.props, itemCreate) : null}
            
            backgroundColor={ 
              this.state.controls.hours.valid 
              ?'#bdc3c7':'#bdc3c745'}
        /> 
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('MapStateToProps state', state);
  const fUserId      = state.auth.fUserId || '';
  const goBackKey    = state.item.goBackKey
  const companyKey   = state.companies.company.companyKey || '';
  const hourly       = state.companies.company.hourly || '';

  const id           = state.item.id || '';
  const amount       = state.item.amount || '';
  const date         = state.item.date || '';
  const description  = state.item.description || '';
  const hours        = state.item.hours || '';
  const total        = state.item.total || '';
  const item = { amount, companyKey, date, description, fUserId, hourly, hours, total}
  
  return { amount, companyKey, date, description, fUserId, goBackKey, hours, id, total, hourly };
}
export default connect(mapStateToProps, actions)(itemEditHoursScreen);