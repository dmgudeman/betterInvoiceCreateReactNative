import React, { Component } from 'react';
import { View, Text }       from 'react-native';
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
import * as actions from '../actions';
import Styles from './Styles';

import { resetAction } from '../config/ItemCreateNav'
import MyDatePicker from '../components/MyDatePicker';

// 

class ItemCreateAmountScreen extends Component {

  componentWillMount() {
    // console.log('ITEMSCREATESCREEN COMPONENTWILLMOUNT this.props', this.props);
    this.props.itemUpdate('amount', '');
    this.props.itemUpdate('date', moment().format()  )
    this.props.itemUpdate('description', '');
    this.props.itemUpdate('hours', '');
    this.props.itemTotalUpdate('','', this.props.hourly)
    // this.props.navigation.dispatch(resetAction);
    this.props.navigation.setParams(resetAction);
   
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Item',
      headerLeft: <Icon.Button 
        name="angle-left" 
        backgroundColor="transparent" 
        color="gray" 
        size={30}
        onPress= {()=> {

          console.log('OOOONNNNPRREESSSS',navigation);
          // navigation.dispatch(resetAction)
          
          resetAction2 = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'companies'}),
             
            ]
          });
          navigation.dispatch(resetAction2);
          // navigation.goBack();
        }
        }/>,
      tabBarLabel:"Amount",
      tabBarIcon: ({ tintColor }) => <Icon name="dollar" size={20} color="#3498db" />
    }
  }
  onSubmit = () => {
    const {amount, companyKey, date, description, fUserId, hourly, hours, total} = this.props
    const data  = ( (hours - 0 || 0 ) * (hourly - 0 || 0)) + (amount - 0 || 0);
    this.props.itemUpdate('total', data);

    this.props.itemCreate({amount, companyKey, date, description, fUserId, hourly, hours, total});
    this.props.navigation.goBack(null)
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
        
        <FormLabel>Amount</FormLabel>
        <FormInput 
          onChangeText={(value) => {
            this.props.itemUpdate('amount', value)
            this.props.itemTotalUpdate( this.props.hours, value, this.props.hourly)
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
  // const item = { amount, companyKey, date, description, fUserId, hourly, hours, total}

  // console.log('ITEMCREATESCREEN MAPSTATETOPROPS item', item);
  return { amount, companyKey, date, description, fUserId, hourly, hours, total};
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