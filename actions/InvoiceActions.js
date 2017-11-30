import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  INVOICE_UPDATE, 
  INVOICE_EDIT,
  INVOICE_CREATE, 
  SELECT_INVOICE,
  SET_INVOICES,
 } from './types';
import moment from 'moment';


 // used upon Submit
export const invoiceEdit = ({beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}) => async dispatch => {
  
  let payload = { beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}
  payload.createdAt = moment(payload.createdAt).format();
  // console.log('InvoiceActions invoiceEdit payload', payload);
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  await firebase.database().ref().update(updates);

  return dispatch => {type: INVOICE_EDIT, {invoice: payload}}
 }
export const setInvoices = (invoices) => {
  return {
    type: SET_INVOICES,
    invoices
  }
}
export const invoiceUpdate = (prop, value)=> {
  // console.log('invoiceActions 11111111invoiceUpdate prop, value:::::', prop, value);
  if (prop === 'createdAt' || prop === 'beginDate' || prop === 'endDate'){
     value = moment(value).format();
  }
  //  console.log('invoiceActions 22222222invoiceUpdate prop, value:::::', prop, value);

  return {
    type: INVOICE_UPDATE,
    payload: { prop, value}
  };
}

export const selectInvoice = (invoice) => {
  // console.log('InvoiceACTIONS selectInvoice invoice', invoice);
  return {
    type: SELECT_INVOICE,
    invoice
  }
} 

export const invoiceCreate = ({invoice})=> {
  let payload = {...invoice};
  // console.log('INVOICEACTIONS INVOICECREATE payload', payload);
 
  let newInvoiceKey =  firebase.database().ref().child('companies').child('invoices').push().key;
  payload.invoiceKey = newInvoiceKey
  // console.log('Invoice ACTIONS INVOICE_CREATE payload', payload);
  // console.log('xxxxxxxxxxxxxxxxxxxx'+'/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey);
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  firebase.database().ref().update(updates);
  
   return {
    type: INVOICE_CREATE,
    // payload: { }
  };
}
