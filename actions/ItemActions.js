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

export const itemCreate = ({fUserId, coId, date, hours, amount, description, total}) => async dispatch => {
  
  let payload = {fUserId, coId, date, hours, amount, description, total}
  payload.date = moment(payload.date).format();
  let newItemKey = await firebase.database().ref().child('companies').child('items').push().key;
  payload.itemKey = newItemKey;

  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.coId + '/items/' + payload.itemKey] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: ITEM_CREATE, { item: payload }}
 }

 export const itemEdit = ({ id, fUserId, coId, date, hours, amount, description, total}) => async dispatch => {
  
  let payload = {id, fUserId, coId, date, hours, amount, description, total}
  payload.date = moment(payload.date).format();
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.coId + '/items/' + payload.id] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: ITEM_EDIT, {item: payload}}
 }

export const itemUpdate = (prop, value)=> {
  const prop2 = `item.${prop}`
  console.log('ITEMUPDATE ACTIONS prop, prop2, value', prop, prop2, value );
  if (prop === 'date'){
    value = moment(value).format();
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
