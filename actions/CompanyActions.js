
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import {
  // FETCH_COMPANIES,
  FETCH_COMPANIES_SUCCESS
  
} from './types';


export const fetchCompanies = (fUserId) => async dispatch => {
   
   let companies = await firebase.database().ref('/users/' + fUserId + '/companies')
      .on('value', snapshot => {
        console.log('COMPANYACTIONS fetchCompanies action snapshot.val()', snapshot.val());
       if (snapshot.val()) {dispatch({type: FETCH_COMPANIES_SUCCESS, payload: snapshot.val()})}
      })
    
    return companies;
  } 

  