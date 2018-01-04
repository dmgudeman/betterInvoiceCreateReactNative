
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import thunk from 'redux-thunk';

import {
  FETCH_COMPANIES_SUCCESS,
  SET_COMPANIES,
} from './types';
import DATE_RFC2822 from '../assets/Date';
import moment from 'moment';


export const fetchCompanies = (fUserId) => async dispatch => {
  const companies = await firebase.database().ref('/users/' + fUserId + '/companies')
    .on('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({ type: FETCH_COMPANIES_SUCCESS, payload: snapshot.val() });
      }
    });
  return { };
};

export const setCompanies = (companies) => {
  return {
    type: SET_COMPANIES,
    companies: companies || {},
  };
};
