import React, { Component } from 'react';
import { 
  Keyboard,
  ScrollView,
  Text,
  TextInput, 
  TouchableWithoutFeedback,
  View,
}                 from 'react-native';
   
import { connect } from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                           from 'react-native-elements';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import moment from 'moment';
import * as actions from '../actions'
import CompaniesScreen from './CompaniesScreen';
import MyDatePicker from '../components/MyDatePicker';
import { validate }             from '../utility/Validation.js';

class ItemCreateHoursScreen extends Component {
  // Validation
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
  componentWillMount() {
    this.props.itemUpdate('amount', '');
    this.props.itemUpdate('date', moment().format()  )
    this.props.itemUpdate('description', '');
    this.props.itemUpdate('hours', '');
    this.props.itemTotalUpdate('','', this.props.hourly)
    console.log('COMPONENTWILL this.props.navigation.state.key', this.props.navigation.state.key);
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
   
  onSubmit = () => {
    const {amount, companyKey, date, description, fUserId, hourly, hours, total} = this.props
    const data  = ( (hours - 0 || 0 ) * (hourly - 0 || 0)) + (amount - 0 || 0);
    this.props.itemUpdate('total', data);

    this.props.itemCreate({amount, companyKey, date, description, fUserId, hourly, hours, total});
    this.props.navigation.goBack(null);
  }

  render() {
    const { amount, date, hourly, hours, description, total, itemUpdate, itemTotalUpdate, itemCreate } = this.props;
    return (
      <View
      onStartShouldSetResponder= {(evt) => true }
        onResponderMove= {(evt)=> Keyboard.dismiss()} >
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
          keyboardType= 'numeric'
          onChangeText={(value) => { 
            itemTotalUpdate( value, this.props.amount, this.props.hourly)
            this.updateInputState('hours', value)

            }
          
          }
        />
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

const mapStateToProps = state => {
  // console.log('ITEMCREATESCREEN MAPSTATETOPROPS state', state);
  const fUserId =     state.auth.fUserId || '';

  const companyKey =  state.companies.company.companyKey || '';
  const hourly =      state.companies.company.hourly || '';
  
  const amount =      state.item.amount      || '';
  const date =        state.item.date        || '';
  const description = state.item.description || '';
  const hours =       state.item.hours       || '';
  const total =       state.item.total       || '';

  return { amount, companyKey, date, description, fUserId, hourly, hours, total};
}

// const styles = {
//   datePicker: {
//     marginLeft: 10,
//     backgroundColor: 'blue'
//   },
//   totalLabel: {
//     marginTop: 15,
//     marginLeft: 20,
//     color: 'gray',
//     fontWeight: 'bold'


//   },
//   totalValue: {
//     fontSize: 18,
//     marginTop: 15,
//     marginBottom: 15,
//     marginLeft: 20,
//     color: 'gray'
//   }
// }


export default connect(mapStateToProps, actions)(ItemCreateHoursScreen);