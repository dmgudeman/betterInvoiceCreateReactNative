import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  INVOICE_CREATE, 
  INVOICE_CREATE_CLEAR,
  INVOICE_EDIT,
  INVOICE_UPDATE, 
  INVOICE_UPDATE_DB, 
  SET_INVOICE,
  SET_INVOICES,
 } from './types';
import moment from 'moment';
import DATE_RFC2822 from '../assets/Date';


export const invoiceCreate = ({invoice})=> {
  let payload = {...invoice};
  console.log('INVOICE ACTIONS CREATE payload', payload);
 
  let newInvoiceKey =  firebase.database().ref().child('companies').child('invoices').push().key;
  payload.invoiceKey = newInvoiceKey
  
   return {
    type: INVOICE_CREATE,
    invoice: payload
  };
}

 // used upon Submit
export const invoiceEdit = ({
    beginDate, companyKey, coName, createdAt, description, discount, 
    dueDate, endDate, fUserId, invoiceKey, lastDate, total}) => async dispatch => {
  
  let payload = { 
    beginDate, companyKey, coName, createdAt, description, discount, 
    dueDate, endDate, fUserId, invoiceKey, lastDate, total}
    console.log('INVOICE ACTIONS INVOICE EDIT payload', payload);
  
    payload.createdAt = moment(createdAt).format(DATE_RFC2822);
    payload.lastDate = moment(endDate).format(DATE_RFC2822);
 

  return dispatch => {type: INVOICE_EDIT, {invoice: payload}}
 }
 
export const invoiceCreateClear = ({ companyKey, coItems, coName,  fUserId, lastDate, paymentTerms, })=>{
  let invoice = {
    beginDate: lastDate, // 
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
    lastDate,
    total: ''
  }
  return {type: INVOICE_CREATE_CLEAR, invoice}

}

export const invoiceUpdate = (prop, value)=> {
  if (prop === 'createdAt' || prop === 'beginDate' || prop === 'endDate'){
     value = moment(value).format(DATE_RFC2822);
  }
  return {
    type: INVOICE_UPDATE,
    payload: { prop, value}
  };
}

export const invoiceUpdateDB = (value, route)=> {
  console.log('INVOICE ACTIONS INVOICEUPDATEDB value', value);
  console.log('INVOICE ACTIONS INVOICEUPDATEDB route', route);
  let updates = {};
  console.log('/users/'+ route.fUserId + '/companies/'+ route.companyKey + '/invoices/' + route.invoiceKey);
  updates['/users/'+ route.fUserId + '/companies/'+ route.companyKey + '/invoices/' + route.invoiceKey ] = value;
  firebase.database().ref().update(updates);

  return {
    type: INVOICE_UPDATE_DB,
  };
}

export const setInvoice = (invoice) => {
  return {
    type: SET_INVOICE,
    invoice
  }
} 
export const setInvoices = (invoices) => {
  return {
    type: SET_INVOICES,
    invoices
  }
}

