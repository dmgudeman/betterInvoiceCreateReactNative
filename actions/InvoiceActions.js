import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  INVOICE_CREATE, 
  INVOICE_CREATE_CLEAR,
  INVOICE_EDIT,
  INVOICE_UPDATE, 
  SELECT_INVOICE,
  SET_INVOICES,
 } from './types';
import moment from 'moment';

// THE OTHER WAY TO GET RFC_@*@@ compliance
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";
// use with
// moment().format(DATE_RFC2822);

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
export const invoiceCreateClear = ({ companyKey, coItems, coName,  fUserId, paymentTerms, })=>{
  let invoice = {
    // beginDate: moment().toDate().toUTCString(),
    beginDate: moment().format(DATE_RFC2822),
    coItems, 
    companyKey, 
    coName, 
    // createdAt: moment().toDate().toUTCString(),
    createdAt: moment().format(DATE_RFC2822),
    description: '',
    discount: '',
    dueDate: '',
    // endDate: moment().toDate().toUTCString(),
    endDate: moment().format(DATE_RFC2822),
    fUserId,
    invoiceKey: '',
    items: '',
    paymentTerms,
    total: ''
  }
 

  console.log('InvoiceActions invoiceCREATECLEAR payload', invoice);
  return {type: INVOICE_CREATE_CLEAR, invoice}

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
  // console.log(''+'/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey);
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  firebase.database().ref().update(updates);
  
   return {
    type: INVOICE_CREATE,
    // payload: { }
  };
}
