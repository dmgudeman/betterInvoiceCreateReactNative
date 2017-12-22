import firebase from 'firebase';
import thunk from 'redux-thunk';
import moment from 'moment';
import {
  ITEMS_UPDATE,
  SET_ITEMS,
 } from './types';
import DATE_RFC2822 from '../assets/Date';

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items
  }
}

export const itemsUpdate = ( items, item ) => {
  return {
    type:  ITEMS_UPDATE,
    payload: {items, item}
  }
}