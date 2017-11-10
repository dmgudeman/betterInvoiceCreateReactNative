import firebase from 'firebase';
import thunk from 'redux-thunk';
import {ITEM_UPDATE, ITEM_CREATE} from './types';
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

export const itemUpdate = (prop, value)=> {
  
  return {
    type: ITEM_UPDATE,
    payload: { prop, value}
  }
}
export const hoursUpdate = () => ({
   type: HOURS_UPDATE
});