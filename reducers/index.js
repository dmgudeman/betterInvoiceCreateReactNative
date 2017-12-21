
import { combineReducers } from 'redux';
import auth from './auth_reducer';
import companies from './CompaniesReducer';
import item from './ItemReducer';
import items from './ItemsReducer';
import invoice from './InvoiceReducer';
import invoices from './InvoicesReducer';
import utils from './UtilsReducer'

export default combineReducers({
  auth,
  companies,
  item,
  items,
  invoice,
  invoices,
  utils
});
