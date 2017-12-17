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
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  firebase.database().ref().update(updates);

  // let x ={}
  // let y = payload.lastDate || ''
  console.log('INVOICE ACTIONS CREATE lastDate', payload.lastDate );

  // x['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey] = {'lastDate': y }
  firebase.database().ref('/users/'+ payload.fUserId + '/companies/'+ payload.companyKey+'/lastDate').update({lastDate:payload.lastDate})
  // firebase.database().ref('/users/'+ payload.fUserId + '/companies/'+ payload.companyKey).update({color: 'red'})
  
   return {
    type: INVOICE_CREATE,
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
 
  let updates = {};
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  await firebase.database().ref().update(updates);

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

export const invoiceUpdateDB = (prop, value, route)=> {
  console.log('INVOICE ACTIONS INVOICEUPDATEDB prop', prop);
  if (prop === 'createdAt' || prop === 'beginDate' || prop === 'endDate'){
     value = moment(value).format(DATE_RFC2822);
  }
  let updates = {};
  console.log('/users/'+ route.fUserId + '/companies/'+ route.companyKey + '/invoices/' + route.invoiceKey + '/' + prop);
  updates['/users/'+ route.fUserId + '/companies/'+ route.companyKey + '/invoices/' + route.invoiceKey + '/' + prop] = value;
  firebase.database().ref().update(updates);

  return {
    type: INVOICE_UPDATE_DB,
    payload: { prop, value}
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

