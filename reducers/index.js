
import { combineReducers } from 'redux';
import auth from './auth_reducer';
import companies from './CompaniesReducer';
import item from './ItemReducer';

export default combineReducers({
  auth,
  companies,
  item
});