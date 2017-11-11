import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  ITEM_UPDATE, 
  ITEM_EDIT,
  ITEM_CREATE, 
  CHANGE_SELECTED_ITEM
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

  dispatch => {type: ITEM_CREATE}
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
  const prop2 = `item.selectedItem.${prop}`
  console.log('ITEMUPDATE ACTIONS prop, prop2, value', prop, prop2, value );
  if (prop === 'date'){
    value = moment(value).format();
  }
  return {
    type: ITEM_UPDATE,
    payload: { prop, value}
  };
}

export const changeSelectedItem = (item) => {
  return {
    type: CHANGE_SELECTED_ITEM,
    item,
  };
}

