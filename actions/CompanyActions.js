
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import {
  // FETCH_COMPANIES,
  FETCH_COMPANIES_SUCCESS,
  SELECT_ITEM,
  COMPANY_UPDATE,
  COMPANY_CREATE,
  
} from './types';


export const companyCreate = (props) => {
  // let companyKey = await firebase.database().ref().child('companies').push().key;
  // dispatch => {type: COMPANY_CREATE, { companyKey: payload }}
  let payload = {name, color, paymentTerms, hours, address} = props
  console.log('COMPANYACTIONS COMPANYCREATE payload', props);
  return { 
    type: COMPANY_CREATE,
    payload
  }
 }

export const fetchCompanies = (fUserId) => async dispatch => {
  let companies = await firebase.database().ref('/users/' + fUserId + '/companies')
    .on('value', snapshot => {
        // console.log('COMPANYACTIONS fetchCompanies action snapshot.val()', snapshot.val());
      if (snapshot.val()) {
        // console.log('COMPANYACTIONS fetchCompanies companies', companies);
        dispatch({type: FETCH_COMPANIES_SUCCESS, payload:snapshot.val() })};
      }
    )
    // console.log('COMPANYACTIONS fetchCompanies no snapshot sent');
  return { }
} 

export const companyUpdate = (prop, value)=> {
  console.log('companyActions 11111111companyUpdate prop, value:::::', prop, value);
  console.log(``);
  return {
    type: COMPANY_UPDATE,
    payload: { prop, value}
  };
}

  