import React from 'react';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import CompanyCreateScreen from '../screens/CompanyCreateScreen';
import CompanyEditScreen from '../screens/CompanyEditScreen';
import CompaniesScreen from '../screens/CompaniesScreen';
import ItemCreateScreen from '../screens/ItemCreateScreen';
import ItemEditScreen from '../screens/ItemEditScreen';
import ItemsScreen from '../screens/ItemsScreen';
import InvoiceEditScreen from '../screens/InvoiceEditScreen';
import InvoicesScreen from '../screens/InvoicesScreen';
import ListItem from '../components/ListItem';
import TestScreen from '../screens/TestScreen';
import MyDatePicker from '../components/MyDatePicker';


export default StackNavigator({
  auth:          { screen: AuthScreen },
  companies:     { 
    screen: CompaniesScreen,
    navigationOptions: ({ navigation }) => {
      return {
      title: 'Companies',
      headerRight:
          <Button
            title= "+Business"
            onPress={()=>{navigation.navigate('companyCreate')} 
            }
          />
      }
    }
  },
  companyCreate: { screen: CompanyCreateScreen },
  companyEdit:   { screen: CompanyEditScreen },
  items:         { screen: ItemsScreen },
  itemCreate:    { screen: ItemCreateScreen },
  itemEdit:      { screen: ItemEditScreen },
  ListItem:      { screen: ListItem },
  invoices:      { screen: InvoicesScreen },
  invoiceEdit:   { screen: InvoiceEditScreen },
  datePicker:    { screen: MyDatePicker },
  
});