import firebase from 'firebase';
import thunk from 'redux-thunk';
import moment from 'moment';
import {
  COMPANY_UPDATE,
  ITEM_UPDATE,
  ITEM_TOTAL_UPDATE, 
  ITEM_EDIT,
  ITEM_CREATE, 
  SET_ITEM,
  SET_ITEMS,
 } from './types';
 import DATE_RFC2822 from '../assets/Date';

export const itemCreate = ({amount, company, companyKey, date, description, fUserId, hourly, hours, items, name, total}) => async dispatch => {
  let payload = { amount, companyKey, date, description, fUserId, hourly, hours, name, total} 
  let newItemKey = await firebase.database().ref().child('companies').child(companyKey).child('items').push().key;
  payload.itemKey = newItemKey;
  console.log('ITEM ACTIONS ITEMCREATE payload.itemKey', payload.itemKey);
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/items/' + payload.itemKey] = payload;
  console.log('ITEM ACTIONS ITEMCREATE update', updates);
  await firebase.database().ref().update(updates);
  console.log('ITEM ACTIONS ITEMCREATE payload', payload);
  console.log('ITEM ACTIONS ITEMCREATE items', items);
  // let item = payload
  let newItems = Object.assign({}, ...items, {[newItemKey]: payload} )
  console.log('ITEM ACTIONS ITEMCREATE newItems', newItems);
  dispatch({type: SET_ITEM, item:payload } )
  // dispatch({type: ITEM_CREATE, item: payload })
  dispatch({type: SET_ITEMS, items:newItems })
  let prop = 'items'
  dispatch({type: COMPANY_UPDATE, payload:{prop, newItems} })
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


export const setItem = (item) => {
  console.log('SSEEEEEEEETTTTTTTTTTTTTTT ITTTTTTTTTTTTTTTTTM fired', item);
  return {
    type: SET_ITEM,
    item
  }
} 

