
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import {
  SELECT_ITEM,
  COMPANY_UPDATE,
  CLEAR_COMPANY,
  COMPANY_CREATE,
  COMPANY_EDIT_SUBMIT,
  SET_COMPANY,
  UPDATE_OBJECT_EDIT,
} from './types';
import DATE_RFC2822 from '../assets/Date';
import moment from 'moment';

export const companyCreate = (company) => {
  // console.log('COMPANYACTIONS COMPANYCREATE company', company);
  let payload = { ...company };
  // if(!payload.lastDate) { payload.lastDate = await moment().format(DATE_RFC2822)};
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
  // console.log('COMPANYACTIONS COMPANYEDITSUBMIT company', company);
  // console.log('COMPANYACTIONS COMPANYEDITSUBMIT payload', payload);
  let updates = {};
  updates['/users/'+ company.fUserId + '/companies/'+ company.companyKey] = company;
  firebase.database().ref().update(updates);
  return {
    type: COMPANY_EDIT_SUBMIT,
    payload
  }
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
  console.log( 'COMPANY ACTIONS setCompany company', company);
  return {
    type: SET_COMPANY,
    company
  }
}


// export const clearCompany = (fUserId) => {
  // company = {
  // address:'',
  // color: 'blue',
  // companyKey: '',
  // company: '',
  // fUserId: fUserId || '',
  // hex: '',
  // hourly: '',
  // invoices: '',
  // items: '',
  // location: null,
  // name: '',
  // paymentTerms: '30',
  // }
  export const clearCompany =() => { 
    console.log('ACTIONS CLEAR_COMPANY FIRED');
  return {
    type: CLEAR_COMPANY,
    // payload: company
  }
}

export const updateObjectEdit = (prop, value) => {
  return {
    type: UPDATE_OBJECT_EDIT,
    payload: {prop, value}
  }
}
  