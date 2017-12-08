import React from 'react';
import { Button } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthScreen from '../screens/AuthScreen';
import { CompanyCreateScreen } from '../screens/CompanyCreateScreen';
import CompanyEditScreen from '../screens/CompanyEditScreen/CompanyEditScreen';
import CompaniesScreen from '../screens/CompaniesScreen';
import GooglePlacesInput from '../components/GooglePlacesInput';
import ItemCreateNav from './ItemCreateNav';
import ItemEditNav from './ItemEditNav';
import ItemsScreen from '../screens/ItemsScreen'
import InvoiceCreateScreen from '../screens/InvoiceCreateScreen';
import InvoiceEditScreen from '../screens/InvoiceEditScreen';
import InvoicesScreen from '../screens/InvoicesScreen';
import ListItem from '../components/ListItem';
import MyDatePicker from '../components/MyDatePicker';
import WVContainer from '../screens/WVContainer';


export default StackNavigator(
  {
    auth:              { screen: AuthScreen },
    companies:         { screen: CompaniesScreen },
    companyCreate:     { screen: CompanyCreateScreen },
    companyEdit:       { screen: CompanyEditScreen },
    items:             { screen: ItemsScreen },
    itemCreate:        { screen: ItemCreateNav },
    itemEdit:          { screen: ItemEditNav },
    invoices:          { screen: InvoicesScreen },
    invoiceCreate:     { screen: InvoiceCreateScreen },
    invoiceEdit:   { 
      screen: InvoiceEditScreen,
      navigationOptions: {
        title: `Edit Invoice`,
      },
    },
    datePicker:        { screen: MyDatePicker },
    googlePlacesInput: { screen: GooglePlacesInput },
    wvContainer:       { screen: WVContainer }
  },
  {
    headerMode: 'float'
  }
);



