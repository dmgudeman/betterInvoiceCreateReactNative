
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import {
  // FETCH_COMPANIES,
  FETCH_COMPANIES_SUCCESS,
  SELECT_ITEM
  
} from './types';


export const commpanyCreate = () => async dispatch => {

  let companyKey = await firebase.database().ref().child('companies').push().key;

  dispatch => {type: COMPANY_CREATE, { companyKey: payload }}
 }

export const fetchCompanies = (fUserId) => async dispatch => {
   
   let companies = await firebase.database().ref('/users/' + fUserId + '/companies')
      .on('value', snapshot => {
          // console.log('COMPANYACTIONS fetchCompanies action snapshot.val()', snapshot.val());
        if (snapshot.val()) {
          // console.log('COMPANYACTIONS fetchCompanies companies', companies);
        dispatch({type: FETCH_COMPANIES_SUCCESS, payload:snapshot.val() })};
      })
      // console.log('COMPANYACTIONS fetchCompanies no snapshot sent');
    return { }
  } 

  