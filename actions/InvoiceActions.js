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
 } from './types';
import moment from 'moment';
import DATE_RFC2822 from '../assets/Date';


export const invoiceCreate = ({invoice})=> {
  let payload = {...invoice};
  console.log('INVOICE ACTIONS CREATE payload', payload);
 
  let newInvoiceKey =  firebase.database().ref().child('companies').child('invoices').push().key;
  payload.invoiceKey = newInvoiceKey
  let updates = {};
  console.log('/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + newInvoiceKey);
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + newInvoiceKey] = payload;
  firebase.database().ref().update(updates);

  
   return {
    type: INVOICE_CREATE,
    invoice: payload
  };
}

 // used upon Submit
export const invoiceEdit = (invoice) => {
  console.log('INVOICE ACTIONS invoiceEdit invoice', invoice);
  let payload = {...invoice};
  console.log('INVOICE ACTIONS EDIT payload', payload);
 
  let updates = {};
  console.log('/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey);
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey] = payload;
  firebase.database().ref().update(updates);
    
  return { 
    type: INVOICE_EDIT, 
    invoice 
  } 
 }
 
export const invoiceCreateClear = (company)=>{
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
export const invoiceUpdateDB = ({invoice})=> {
  let payload = {...invoice}
  console.log('INVOICE ACTIONS INVOICEUPDATEDB route', payload);
  let updates = {};
  console.log('/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey);
  updates['/users/'+ payload.fUserId + '/companies/'+ payload.companyKey + '/invoices/' + payload.invoiceKey ] = invoice;
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




