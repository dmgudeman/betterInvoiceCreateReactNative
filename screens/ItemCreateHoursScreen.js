import React, { Component } from 'react';
import { View, Text, TextInput }       from 'react-native';
import { connect } from 'react-redux';
import { 
  Button,
  FormLabel, 
  FormInput, 
  FormValidationMessage, 
}                           from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import Moment from 'react-moment';
import moment from 'moment';
import * as actions from '../actions'
import CompaniesScreen from './CompaniesScreen';
import MyDatePicker from '../components/MyDatePicker';

const myIcon = (<Icon name="rocket" size={30} color="#900" />) 

class ItemCreateHoursScreen extends Component {

  componentWillMount() {
    // console.log('ITEMSCREATESCREEN COMPONENTWILLMOUNT this.props', this.props);
    this.props.itemUpdate('amount', '');
    this.props.itemUpdate('date', moment().format()  )
    this.props.itemUpdate('description', '');
    this.props.itemUpdate('hours', '');
    this.props.itemTotalUpdate('','', this.props.hourly)
    console.log('this.props.navigationnnnnnnnnnnn', this.props.navigation.state.params.goBackKey);
   
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
    // console.log('ITEMCREATESCREEN ONSUBMIT hours', hours);
    // console.log('ITEMCREATESCREEN ONSUBMIT hourly', hourly);
    // console.log('ITEMCREATESCREEN ONSUBMIT fUserId', fUserId);
    const data  = ( (hours - 0 || 0 ) * (hourly - 0 || 0)) + (amount - 0 || 0);
    // console.log('ITEMCREATESCREEN ONSUBMIT data', data);
    this.props.itemUpdate('total', data);
    console.log('ITEMCREATE ONSUBMIT this.props', this.props);
    // console.log('ITEMCREATESCREEN ONSUBMIT total', total);

    this.props.itemCreate({amount, companyKey, date, description, fUserId, hourly, hours, total});
    this.props.navigation.goBack(null);
  }

  render() {
    // console.log('ITEMCREATESCREEN RENDER this.prop', this.props);
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
          onChangeText={(value) => { 
            this.props.itemUpdate('hours', value) 
            this.props.itemTotalUpdate( value, this.props.amount, this.props.hourly)
            }
          }
        />
       
        <FormLabel>Description</FormLabel>
        <FormInput 
          onChangeText={(value) => this.props.itemUpdate('description', value)}
        />

        <Text style={Styles.totalLabel}>Total</Text>
        <Text style={Styles.totalValue}>$ {this.props.total}</Text>

        <Button
          title= "Submit"
          onPress =  {this.onSubmit }
          // buttonStyle={{backgroundColor:'#9b59b6'}}
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