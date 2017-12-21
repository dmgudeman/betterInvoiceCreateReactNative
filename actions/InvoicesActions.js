
import firebase from 'firebase';
// import thunk from 'redux-thunk';
import {
  INVOICES_UPDATE, 
  SET_INVOICES,
 } from './types';
import moment from 'moment';
import DATE_RFC2822 from '../assets/Date';


export const invoicesUpdate = (invoices, invoice)=> {
  console.log('INVOICE ACTIONS INVOICESUPDATE');
  return {
    type: INVOICES_UPDATE,
    payload: {invoices, invoice}
  };
}

export const setInvoices = (invoices ) => {
 
  return {
    type: SET_INVOICES,
    invoices
  }
}

