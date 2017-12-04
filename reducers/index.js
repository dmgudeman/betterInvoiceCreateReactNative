
import { combineReducers } from 'redux';
import auth from './auth_reducer';
import companies from './CompaniesReducer';
import item from './ItemReducer';
import invoice from './InvoiceReducer';
import utils from './UtilsReducer'

export default combineReducers({
  auth,
  companies,
  item,
  invoice,
  utils
});
