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
import DATE_RFC2822 from '../assets/Date';

 // used upon Submit
export const invoiceEdit = ({beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}) => async dispatch => {
  
  let payload = { beginDate, companyKey, coName, createdAt, description, discount, dueDate, endDate, fUserId, invoiceKey, total}
  payload.createdAt = moment(payload.createdAt).format(DATE_RFC2822);
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  await firebase.database().ref().update(updates);

  return dispatch => {type: INVOICE_EDIT, {invoice: payload}}
 }
 
export const invoiceCreateClear = ({ companyKey, coItems, coName,  fUserId, paymentTerms, })=>{
  let invoice = {
    beginDate: moment().format(DATE_RFC2822),
    coItems, 
    companyKey, 
    coName, 
    createdAt: moment().format(DATE_RFC2822),
    description: '',
    discount: '',
    dueDate: '',
    endDate: moment().format(DATE_RFC2822),
    fUserId,
    invoiceKey: '',
    items: '',
    paymentTerms,
    total: ''
  }
  return {type: INVOICE_CREATE_CLEAR, invoice}

}
export const setInvoices = (invoices) => {
  return {
    type: SET_INVOICES,
    invoices
  }
}
export const invoiceUpdate = (prop, value)=> {
  console.log('invoiceUpdate action  prop, valueeeeee', prop, value);
  if (prop === 'createdAt' || prop === 'beginDate' || prop === 'endDate'){
     value = moment(value).format(DATE_RFC2822);
  }
  return {
    type: INVOICE_UPDATE,
    payload: { prop, value}
  };
}

export const selectInvoice = (invoice) => {
  return {
    type: SELECT_INVOICE,
    invoice
  }
} 

export const invoiceCreate = ({invoice})=> {
  let payload = {...invoice};
 
  let newInvoiceKey =  firebase.database().ref().child('companies').child('invoices').push().key;
  payload.invoiceKey = newInvoiceKey
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  firebase.database().ref().update(updates);
  
   return {
    type: INVOICE_CREATE,
  };
}
