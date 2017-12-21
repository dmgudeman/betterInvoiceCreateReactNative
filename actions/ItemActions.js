import firebase from 'firebase';
import thunk from 'redux-thunk';
import moment from 'moment';
import {
  ITEM_UPDATE,
  ITEM_TOTAL_UPDATE, 
  ITEM_EDIT,
  ITEM_CREATE, 
  CHANGE_SELECTED_ITEM,
  CHANGE_ITEM_HOURS,
  SELECT_ITEM,

 } from './types';
 import DATE_RFC2822 from '../assets/Date';

export const itemCreate = ({amount, companyKey, date, description, fUserId, hourly, hours, name, total}) => async dispatch => {
  let payload = { amount, companyKey, date, description, fUserId, hourly, hours, name, total} 

  let newItemKey = await firebase.database().ref().child('companies').child(companyKey).child('items').push().key;
  payload.itemKey = newItemKey;
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/items/' + payload.itemKey] = payload;
  console.log('ITEM ACTIONS ITEMCREATE update', updates);
  await firebase.database().ref().update(updates);
  dispatch => {type: ITEM_CREATE, { item: payload }}
 }

 // used upon Submit
export const itemEdit = ({amount, companyKey, date, description, fUserId, hourly, hours,itemKey, name, total}) => async dispatch => {
  
  let payload = { amount, companyKey, date, description, fUserId, hours, itemKey, name, total, hourly }
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/items/' + payload.itemKey] = payload;
  console.log('ITEM ACTIONS UPDATES ', updates);
  await firebase.database().ref().update(updates);
  dispatch => {type: ITEM_EDIT, { item: payload }}
 }

 export const itemTotalUpdate = (hours, amount, hourly)=> {
  let total = (hours * hourly) + (amount * 1);
  return {
    type: ITEM_TOTAL_UPDATE,
    total
  }
}

export const itemUpdate = (prop, value)=> {
  return {
    type: ITEM_UPDATE,
    payload: { prop, value}
  };
}

export const changeItemHours = (value) => {
  const prop = 'hours'
  return {
    type: CHANGE_ITEM_HOURS,
     hours: value
  }
}

export const selectItem = (item) => {
  return {
    type: SELECT_ITEM,
    item
  }
} 
