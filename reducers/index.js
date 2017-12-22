
import { combineReducers } from 'redux';
import auth from './auth_reducer';
import company from './CompanyReducer';
import companies from './CompaniesReducer';
import item from './ItemReducer';
import items from './ItemsReducer';
import invoice from './InvoiceReducer';
import invoices from './InvoicesReducer';
import utils from './UtilsReducer'

export default combineReducers({
  auth,
  company,
  companies,
  item,
  items,
  invoice,
  invoices,
  utils
});
