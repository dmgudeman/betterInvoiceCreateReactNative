
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import {
  FETCH_COMPANIES_SUCCESS,
  SELECT_ITEM,
  COMPANY_UPDATE,
  COMPANY_CREATE,
  COMPANY_EDIT_SUBMIT,
  SET_COMPANY,
  UPDATE_OBJECT_EDIT,
} from './types';
import DATE_RFC2822 from '../assets/Date';

export const companyCreate = (company) => {
  console.log('COMPANYACTIONS COMPANYCREATE company', company);
  let payload = { ...company };
  let newCompanyKey =  firebase.database().ref().child('companies').push().key;
  payload.companyKey = newCompanyKey;
  let updates = {};
  console.log('COMPANYACTIONS COMPANYCREATE payload', payload);
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey] = payload;
  firebase.database().ref().update(updates);
   return {
    type: COMPANY_CREATE,
   payload
  };
 
 }

export const companyEditSubmit = (company) => {
  let payload = { company };
  console.log('COMPANYACTIONS COMPANYEDITSUBMIT company', company);
  console.log('COMPANYACTIONS COMPANYEDITSUBMIT payload', payload);
  let updates = {};
  updates['/users/'+ company.fUserId + '/companies/'+ company.companyKey] = company;
  firebase.database().ref().update(updates);
  return {
    type: COMPANY_EDIT_SUBMIT,
    payload
  }
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
  console.log( 'COMPANYACTIONS COMPANYUPDATE prop', prop);
  console.log( 'COMPANYACTIONS COMPANYUPDATE value', value);
  return {
    type: COMPANY_UPDATE,
    payload: { prop, value}
  };
}


export const setCompany = (company) => {
  return {
    type: SET_COMPANY,
    company
  }
}

export const updateObjectEdit = (prop, value) => {
  return {
    type: UPDATE_OBJECT_EDIT,
    payload: {prop, value}
  }
}
  