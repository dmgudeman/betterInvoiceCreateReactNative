import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  ITEM_UPDATE, 
  ITEM_EDIT,
  ITEM_CREATE, 
  CHANGE_SELECTED_ITEM,
  CHANGE_ITEM_HOURS,
  SELECT_ITEM
 } from './types';
import moment from 'moment';

export const itemCreate = ({amount, companyKey, date, description, fUserId, hourly, hours, total}) => async dispatch => {
  let payload = { amount, companyKey, date, description, fUserId, hourly, hours, total} 
  console.log('ITEMSACTIONS ITEMCREATE payload', payload);
  payload.date = moment(payload.date).format();
  payload.total = ( (hours - 0 || 0 ) * (hourly - 0 || 0)) + (amount - 0 || 0);

  let newItemKey = await firebase.database().ref().child('companies').child(companyKey).child('items').push().key;
  payload.id = newItemKey;
  console.log('ITEM ACTIONS ITEMCREATE payload', payload);
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/items/' + payload.id] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: ITEM_CREATE, { item: payload }}
 }

 // used upon Submit
export const itemEdit = ({amount, companyKey, date, description, fUserId, hourly, hours, id, total}) => async dispatch => {
  
  let payload = { amount, companyKey, date, description, fUserId, hours, id, total, hourly }
  payload.date = moment(payload.date).format();
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/items/' + payload.id] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: ITEM_EDIT, {item: payload}}
 }

export const itemUpdate = (prop, value)=> {

  if (prop === 'hours') {

  }

  return {
    type: ITEM_UPDATE,
    payload: { prop, value}
  };
}

export const changeItemHours = (value) => {
  console.log( 'ITEMACTIONS changeItemHours value', value);
  const prop = 'hours'
  return {
    type: CHANGE_ITEM_HOURS,
     hours: value
  }
}

export const selectItem = (item) => {
  console.log('ITEMACTIONS selectItem item', item);
  return {
    type: SELECT_ITEM,
    item
  }
} 
