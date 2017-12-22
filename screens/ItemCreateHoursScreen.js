import React, { Component }     from 'react';
import { 
  Keyboard,
  ScrollView,
  Text,
  TextInput, 
  TouchableWithoutFeedback,
  View,
}                               from 'react-native';
   
import { connect }              from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage,
}                               from 'react-native-elements';
import dismissKeyboard          from 'react-native-dismiss-keyboard';
import update                   from 'immutability-helper';
import Icon                     from 'react-native-vector-icons/FontAwesome';
import { NavigationActions }    from 'react-navigation';
import DatePicker               from 'react-native-datepicker';
import Moment                   from 'react-moment';
import moment                   from 'moment';
import * as _                   from 'lodash';
import * as actions             from '../actions'
import CompaniesScreen          from './CompaniesScreen';
import MyDatePicker             from '../components/MyDatePicker';
import { validate }             from '../utility/Validation.js';

class ItemCreateHoursScreen extends Component {
  // Validation
  state = {
    controls: {
      hours: { 
        value: '', 
        valid: false, 
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
  componentWillMount() {
    console.log('ITEM CREATE HOURS CWM this.props.navigation.state.key', this.props.navigation.state.key);
    // this.props.itemUpdate('amount', '');
    // this.props.itemUpdate('date', moment().format()  )
    // this.props.itemUpdate('description', '');
    // this.props.itemUpdate('hours', '');
    // this.props.itemTotalUpdate('','', this.props.hourly)
    // this.props.utilsUpdate('goBackKey', this.props.navigation.state.key)
    // console.log('COMPONENTWILL this.props.navigation.state.key', this.props.navigation.state.key);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Item',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={40}
        onPress= {()=> navigation.goBack(null) }/>,
      tabBarLabel:"Hours",
      tabBarIcon: ({ tintColor }) => <Icon name="hourglass" size={20} color="#3498db" />
    }
  }
   
  onSubmit = async () => {
    const { amount, company, companyKey, date, description, fUserId,  hourly, hours, itemKey, items, name, total} = this.props
    item = {amount, company, companyKey, date, description, fUserId,  hourly, hours, itemKey, items, name, total}
    const data  = ( (hours - 0 ) * (hourly - 0)) + (amount - 0) ;
    await this.props.itemUpdate('total', data);
    await this.props.itemCreate(item)
    console.log('ITEM CREATE HOURS ONSUBMIT this.props.itemKey', this.props.itemKey);
    // let a = {[itemKey]: item}
    // await this.props.itemsUpdate( this.props.items, a );
    // const newCompany = await update(this.props.company,  {items: {[itemKey]:{$set: item }}});
    // await this.props.setCompany(newCompany);
    // // this.props.navigation.goBack(this.props.navigation.state.params.goBackKey);
    // this.props.navigation.goBack(null);
    this.props.navigation.goBack(null);
  }

  render() {
    const { amount, date, hourly, hours, description, name, total, itemUpdate, itemTotalUpdate, itemCreate } = this.props;
    return (
      <View
        onStartShouldSetResponder= {(evt) => true }
        onResponderMove= {(evt)=> Keyboard.dismiss()}
      >
        <FormLabel>Start Date</FormLabel>
        <MyDatePicker 
          date={ moment(this.props.date).format('MM/DD/YYYY') }
          onDateChange={(value) => {
            itemUpdate('date', moment(value).toDate().toUTCString() )
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
          onChangeText={(value) => itemUpdate('description', value)}
        />

        <Text style={Styles.totalLabel}>Total</Text>
        <Text style={Styles.totalValue}>$ {this.props.total}</Text>

        <Button
          title= "Submit"
          onPress =  {() => 
            ( this.state.controls.hours.valid )
             ? this.onSubmit() : null}
            
            backgroundColor={ 
              this.state.controls.hours.valid 
              ?'#bdc3c7':'#bdc3c745'}
        /> 
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const fUserId      = state.auth.fUserId || '';
  const company      = state.company || '';
  const companyKey   = state.company.companyKey || '';
  const hourly       = state.company.hourly || '';
  const name         = state.company.name || '';  

  const amount       = state.item.amount || '';
  const date         = state.item.date || moment().format(DATE_RFC2822);
  const description  = state.item.description || '';
  const hours        = state.item.hours || '';
  const item         = state.item || '';
  const itemKey      = state.item.itemKey || '';
  const total        = state.item.total || '';

  const items        = state.items
  
  return { amount, company, companyKey, date, description, fUserId, hourly, hours, item, items, itemKey, name, total, item };
}

export default connect(mapStateToProps, actions)(ItemCreateHoursScreen);