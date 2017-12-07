
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

import MyDatePicker from '../../components/MyDatePicker';

class itemEditAmountScreen extends Component {
  componentWillMount(){
    this.props.itemUpdate('goBackKey', this.props.navigation.state.params.goBackKey)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Item',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={30}
        onPress= {()=> navigation.goBack(navigation.state.params.goBackKey)} 
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

        <Text style={Styles.totalLabel}>Total</Text>
        <Text style={Styles.totalValue}>$ {this.props.total}</Text>

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
  const hourly       = state.companies.company.hourly || '';

  const id           = state.item.id || '';
  const amount =      state.item.amount || '';
  const date =        state.item.date || '';
  const description = state.item.description || '';
  const goBackKey   = state.item.goBackKey || '';
  const hours =       state.item.hours || '';
  const total =       state.item.total || '';
  const item = { amount, companyKey, date, description, fUserId, hourly, hours, total}
  
  return { amount, companyKey, date, description, fUserId, goBackKey, hours, id, total, hourly };
}
export default connect(mapStateToProps, actions)(itemEditAmountScreen);