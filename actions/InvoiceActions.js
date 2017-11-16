import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  INVOICE_UPDATE, 
  INVOICE_EDIT,
  INVOICE_CREATE, 
  SELECT_INVOICE
 } from './types';
import moment from 'moment';

// export const invoiceCreate = ({beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total}) =>async (dispatch)=> {
//   let payload = {beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, items, total} 

//   let newInvoiceKey =  await firebase.database().ref().child('companies').child('invoices').push().key;
//   payload.invoiceKey = newInvoiceKey;
//   console.log('Invoice ACTIONS INVOICE_CREATE payload', payload);
//   let updates = {};
//   updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
 
//   // await firebase.database().ref().update(updates);
//   console.log('THis is hererrrrrrrrrrrrrrrrrrrrrrrrrrr ');
//   return {type: INVOICE_CREATE}
  
//   // dispatch => {type: INVOICE_CREATE, description};
//   }
   

 


 // used upon Submit
export const invoiceEdit = ({beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}) => async dispatch => {
  
  let payload = { beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}
  payload.createdAt = moment(payload.createdAt).format();
  console.log('InvoiceActions invoiceEdit payload', payload);
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  await firebase.database().ref().update(updates);

  return dispatch => {type: INVOICE_EDIT, {invoice: payload}}
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
  console.log('InvoiceACTIONS selectInvoice invoice', invoice);
  return {
    type: SELECT_INVOICE,
    invoice
  }
} 

export const invoiceCreate = ({invoice})=> {
  let payload = {...invoice};
 console.log('INVOICEACTIONS INVOICECREATE payload', payload);
  return {
    type: INVOICE_CREATE,
    // payload: { }
  };
}
