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

export const itemCreate = ({amount = 0, coId, date, description = '', fUserId, hourly = 0, hours = 0, total = 0}) => async dispatch => {
  
  let payload = { fUserId, coId, date, hours, amount, description, total }
  payload.date = moment(payload.date).format();

  let newItemKey = await firebase.database().ref().child('companies').child('items').push().key;
  payload.id = newItemKey;
  console.log('ITEM ACTIONS ITEMCREATE payload', payload);
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.coId + '/items/' + payload.id] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: ITEM_CREATE, { item: payload }}
 }

 // used upon Submit
export const itemEdit = ({amount = 0, coId, date, description = '', fUserId, hourly = 0, hours = 0, id, total = 0}) => async dispatch => {
  
  let payload = { amount, coId, date, description, fUserId, hours, id, total, hourly }
  payload.date = moment(payload.date).format();
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.coId + '/items/' + payload.id] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: ITEM_EDIT, {item: payload}}
 }

export const itemUpdate = (prop, value)=> {

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
// export const changeSelectedItem = (item2) => {
//   const item= {...item2}
//   console.log('ITEM ITEMACTIONS item ', item);
//   return {
//     type: CHANGE_SELECTED_ITEM,
//     payload: {item:item},
//   };
// }
export const selectItem = (item) => {
  console.log('ITEMACTIONS selectItem item', item);
  return {
    type: SELECT_ITEM,
    item
  }
} 
