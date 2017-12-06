import React from 'react';
import { Button } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import { CompanyCreateScreen } from '../screens/CompanyCreateScreen';
import CompanyEditScreen from '../screens/CompanyEditScreen/CompanyEditScreen';
import CompaniesScreen from '../screens/CompaniesScreen';
import ItemCreateScreen from '../screens/ItemCreateScreen';
import ItemCreateHoursScreen from '../screens/ItemCreateHoursScreen';
import ItemCreateAmountScreen from '../screens/ItemCreateAmountScreen';
import ItemEditScreen from '../screens/ItemEditScreen';
import ItemsScreen from '../screens/ItemsScreen'
import InvoiceCreateScreen from '../screens/InvoiceCreateScreen';
import InvoiceEditScreen from '../screens/InvoiceEditScreen';
import InvoicesScreen from '../screens/InvoicesScreen';
import ListItem from '../components/ListItem';
// import TestScreen from '../screens/TestScreen';
import WVContainer from '../screens/WVContainer';
// import MyWebView from '../screens/MyWebView';
import MyDatePicker from '../components/MyDatePicker';
// import MyPicker from '../components/MyPicker/MyPicker';
import GooglePlacesInput from '../components/GooglePlacesInput';
// import { TabNavigator } from '../../../../../Users/davidgudeman/Library/Caches/typescript/2.6/node_modules/@types/react-native-tab-navigator';

const ItemCreateNav = TabNavigator ({
  itemCreateHoursScreen: { 
    screen: ItemCreateHoursScreen,
    navigationOptions: {
      tabBarLabel:"Hours",
      // tabBarIcon: ({ tintColor }) => <Icon name={"glass"} size={30} color={tintColor} />
  }
  },
    itemCreateAmountscreen: { screen: ItemCreateAmountScreen }
  },
  {
    tabBarPosition: 'top'
  }
)

export default StackNavigator(
  {
    auth:              { screen: AuthScreen },
    companies:         { screen: CompaniesScreen },
    companyCreate:     { screen: CompanyCreateScreen },
    companyEdit:       { screen: CompanyEditScreen },
    items:             { screen: ItemsScreen },
    itemCreate:        { screen: ItemCreateNav },
    itemEdit:          { screen: ItemEditScreen },
    // ListItem:          { screen: ListItem },
    invoices:          { screen: InvoicesScreen },
    invoiceCreate:     { screen: InvoiceCreateScreen },
    invoiceEdit:   { 
      screen: InvoiceEditScreen,
      navigationOptions: {
        title: `Edit Invoice`,
      },
    },
    // myPicker:          { screen: MyPicker },
    datePicker:        { screen: MyDatePicker },
    googlePlacesInput: { screen: GooglePlacesInput },
    // myWebView:         { screen: MyWebView },
    wvContainer:       { screen: WVContainer }
  },
  // {
  //   headerMode: 'none'
  // }
);


