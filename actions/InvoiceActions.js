import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  INVOICE_UPDATE, 
  INVOICE_EDIT,
  INVOICE_CREATE, 
  SELECT_INVOICE
 } from './types';
import moment from 'moment';

export const invoiceCreate = ({amount, coId, date, description, fUserId, hourly, hours, total}) => async dispatch => {
  console.log();
  let payload = { amount, beginDate, companyKey, coName, createdAt, description, discount,dueDate, endDate, invoiceKey, total} 
  payload.createdAt = moment(payload.date).format();
  payload.total = ( (hours - 0 || 0 ) * (hourly - 0 || 0)) + (amount - 0 || 0);

  let newInvoiceKey = await firebase.database().ref().child('companies').child('invoices').push().key;
  payload.id = newInvoiceKey;
  console.log('Invoice ACTIONS INVOICE_CREATE payload', payload);
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.coId + '/invoices/' + payload.id] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: INVOICE_CREATE, { invoice: payload }}
 }

 // used upon Submit
export const invoiceEdit = ({beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}) => async dispatch => {
  
  let payload = { beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}
  payload.createdAt = moment(payload.createdAt).format();
  console.log('InvoiceActions invoiceEdit payload', payload);
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  await firebase.database().ref().update(updates);

  dispatch => {type: INVOICE_EDIT, {invoice: payload}}
 }

export const invoiceUpdate = (prop, value)=> {
   console.log('invoiceActions invoiceUpdate prop, value:::::', prop, value);

  return {
    type: INVOICE_UPDATE,
    payload: { prop, value}
  };
}


export const selectInvoice = (invoice) => {
  console.log('InvoiceACTIONS selectInvoice invoice', invoice);
  return {
    type: SELECT_INVOICE,
    invoice
  }
} 
