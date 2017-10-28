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

export const Routes = { 
  auth:          { screen: AuthScreen },
  companies:     { screen: CompaniesScreen },
  companyCreate: { screen: CompanyCreateScreen },
  companyEdit:   { screen: CompanyEditScreen },
  items:         { screen: ItemsScreen },
  itemCreate:    { screen: ItemCreateScreen },
  itemEdit:      { screen: ItemEditScreen },
  ListItem:      { screen: ListItem },
  invoices:      { screen: InvoicesScreen },
  invoiceEdit:   { screen: InvoiceEditScreen },
  datePicker:    { screen: MyDatePicker },

}
export default Routes;