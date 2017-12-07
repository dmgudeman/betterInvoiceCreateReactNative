
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import {
  FETCH_COMPANIES_SUCCESS,
  SELECT_ITEM,
  COMPANY_UPDATE,
  COMPANY_CREATE,
  COMPANY_EDIT_SUBMIT,
  SET_COMPANY
  
} from './types';
import DATE_RFC2822 from '../assets/Date';

export const companyCreate = (company) => {

  let payload = { ...company };
  let newCompanyKey =  firebase.database().ref().child('companies').push().key;
  payload.companyKey = newCompanyKey;
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey] = payload;
  firebase.database().ref().update(updates);
  
   return {
    type: COMPANY_CREATE,
   payload: { payload }
  };
 
 }

export const fetchCompanies = (fUserId) => async dispatch => {
  let companies = await firebase.database().ref('/users/' + fUserId + '/companies')
    .on('value', snapshot => {
      if (snapshot.val()) {
        dispatch({type: FETCH_COMPANIES_SUCCESS, payload:snapshot.val() })};
      }
    )
  return { }
} 

export const companyUpdate = (prop, value)=> {
  return {
    type: COMPANY_UPDATE,
    payload: { prop, value}
  };
}

export const companyEditSubmit = (company) => {
  let payload = { ...company };
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey] = payload;
  firebase.database().ref().update(updates);
  return {
    type: COMPANY_EDIT_SUBMIT,
    payload
  }
}

export const setCompany = (company) => {
  return {
    type: SET_COMPANY,
    company
  }
}
  