import firebase from 'firebase';
import thunk from 'redux-thunk';
import {
  INVOICE_CREATE, 
  INVOICE_CREATE_CLEAR,
  INVOICE_EDIT,
  INVOICE_UPDATE, 
  INVOICE_UPDATE_2, 
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
 
export const invoiceCreateClear = (company )=>{
  let invoice = {
    beginDate: company.lastDate || moment().format(DATE_RFC2822), // 
    coItems: company.items || '', 
    companyKey: company.companyKey, 
    coName: company.name, 
    createdAt: moment().format(DATE_RFC2822),
    description: '',
    discount: '',
    dueDate: '',
    endDate: moment().format(DATE_RFC2822),
    fUserId: company.fUserId,
    invoiceKey: '',
    items: '',
    paymentTerms: company.paymentTerms,
    lastDate: '',
    total: ''
  }
  return {type: INVOICE_CREATE_CLEAR, invoice}
}
// export const invoiceCreateClear = (company )=>{
//   return { type: INVOICE_CREATE_CLEAR, invoice:{}}
// }
export const invoiceUpdate = (prop, value)=> {
  return {
    type: INVOICE_UPDATE,
    payload: { prop, value}
  };
}
export const invoiceUpdate2 = (prop, value)=> {
    console.log('INVOICE ACTIONS prop', prop);
    console.log('INVOICE ACTIONS value', value );
    // console.log('INVOICE ACTIONS invoice', invoice);
    // console.log('INVOICE ACTIONS invoice.invoice', invoice.invoice);
    // console.log('INVOICE ACTIONS ...invoice.invoice', {...invoice.invoice});
    // console.log('INVOICE ACTIONA invoice.invoice[prop]', invoice.invoice[prop]);
    // console.log('INVOICE ACTIONA (prop ==="endDate")', (prop === 'endDate'));
// let x =    Object.assign({}, {...invoice.invoice}, {[prop]: value})
    // console.log('INVOICE ACTIONS x', x);
  return {
    
    type: INVOICE_UPDATE_2,
    payload: { prop, value}
  };
}
export const invoiceUpdateDB = (invoice, route)=> {
  console.log('INVOICE ACTIONS INVOICEUPDATEDB value', invoice);
  console.log('INVOICE ACTIONS INVOICEUPDATEDB route', route);
  let updates = {};
  console.log('/users/'+ route.fUserId + '/companies/'+ route.companyKey + '/invoices/' + route.invoiceKey);
  updates['/users/'+ route.fUserId + '/companies/'+ route.companyKey + '/invoices/' + route.invoiceKey ] = invoice;
  firebase.database().ref().update(updates);

  return {
    type: INVOICE_UPDATE_DB,
    invoice
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

