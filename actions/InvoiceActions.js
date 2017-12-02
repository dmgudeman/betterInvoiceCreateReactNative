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

export const invoiceCreate = (data)=> async dispatch => {
  let x;
  let payload = {...data};
 
x.beginDate =payload.beginDate;
x.coName=payload.coName;
x.companyKey=payload.companyKey ; 
x.createdAt=payload.createdAt ;
x.description=payload.description ;
x.discount=payload.discount ;
x.dueDate=payload.dueDate ;
x.endDate=payload.endDate ;
x.fUserId=payload.fUserId ;
x.invoiceKey=payload.invoiceKey ; 
x.items=payload. items;
x.paymentTerms=payload.paymentTerms ; 
x.total=payload.total ;

  let newInvoiceKey =  firebase.database().ref().child('companies').child(x.companyKey).child('invoices').push().key;
  console.log('Invoice ACTIONS INVOICE_CREATE x', x);
  console.log('xxxxxxxxxxxxxxxxxxxx'+'/users/'+ x.fUserId + '/companies/'+x.companyKey + '/invoices/' + x.invoiceKey);
  let updates = {};
  let url = '/users/'+ x.fUserId + '/companies/'+ x.companyKey + '/invoices/' + x.invoiceKey
  console.log('INVOICEACTIONS INVOICECREATE x', x);
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = x;
  await firebase.database().ref().update(updates);

  return dispatch => {type: INVOICE_CREATE, {invoice: x}}
}
