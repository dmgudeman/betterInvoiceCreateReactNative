import React, { Component }           from 'react';
import { Keyboard, View, Text }       from 'react-native';
import { connect }                    from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                                     from 'react-native-elements';
import Icon                           from 'react-native-vector-icons/FontAwesome';
import update                         from 'immutability-helper';
import { NavigationActions }          from 'react-navigation';
import DatePicker                     from 'react-native-datepicker';
import Moment                         from 'react-moment';
import moment                         from 'moment';
import * as _                         from 'lodash';
import * as actions                   from '../actions';
import Styles                         from './Styles';

import MyDatePicker                   from '../components/MyDatePicker';
import { validate }                   from '../utility/Validation';


class ItemCreateAmountScreen extends Component {
   // Validation
   state = {
    controls: {
      amount: { 
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
    // console.log('ITEMSCREATESCREEN COMPONENTWILLMOUNT this.props', this.props);
    this.props.itemUpdate('amount', '');
    this.props.itemUpdate('date', moment().format()  )
    this.props.itemUpdate('description', '');
    this.props.itemUpdate('hours', '');
    this.props.itemTotalUpdate('','', this.props.hourly)
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Item',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={40}
        onPress= {()=> {
          resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'companies'}),
             
            ]
          });
          navigation.dispatch(resetAction);
        }
        }/>,
      tabBarLabel:"Amount",
      tabBarIcon: ({ tintColor }) => <Icon name="dollar" size={20} color="#3498db" />
    }
  }
  onSubmit = async () => {
    const { amount, companyKey, date, description, fUserId,  hourly, hours, itemKey, name, total} = this.props
    item = {amount, companyKey, date, description, fUserId,  hourly, hours, itemKey, name, total}
    const data  = ( (hours - 0 ) * (hourly - 0)) + (amount - 0) ;
    await this.props.itemUpdate('total', data);
    // console.log('ITEM EDIT HOURS onSubmit item', item);
    // console.log('ITEM EDIT HOURS onSubmit item', this.props.items);

    await this.props.itemEdit(item)
    let a = {[itemKey]: item}
    await this.props.itemsUpdate( this.props.items, a );
    const newCompany = await update(this.props.company,  {items: {[itemKey]:{$set: item }}});
    await this.props.setCompany(newCompany);
    // this.props.navigation.goBack(this.props.navigation.state.params.goBackKey);
    resetAction = await NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'companies'}), ]
    });
    await navigation.dispatch(resetAction);
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
           date={ moment(this.props.date).format('MM/DD/YYYY') }
           onDateChange={(value) => {
             this.props.itemUpdate('date', moment(value).toDate().toUTCString() )
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
          onChangeText={(value) => this.props.itemUpdate('description', value)}
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
  const fUserId      = state.auth.fUserId || '';
  const company      = state.companies.company || '';
  const companyKey   = state.companies.company.companyKey || '';
  const hourly       = state.companies.company.hourly || '';
  const name         = state.companies.company.name || '';  

  const amount       = state.item.amount || '';
  const date         = state.item.date || '';
  const description  = state.item.description || '';
  const hours        = state.item.hours || '';
  const item         = state.item || '';
  const itemKey      = state.item.itemKey || '';
  const total        = state.item.total || '';

  const items        = state.items
  
  return { amount, company, companyKey, date, description, fUserId, hourly, hours, item, items, itemKey, name, total, item };
}

// const Styles = {
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

export default connect(mapStateToProps, actions)(ItemCreateAmountScreen);