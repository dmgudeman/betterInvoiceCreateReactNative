import {
  INVOICES_UPDATE, 
  SET_INVOICES
} from '../actions/types';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
  let newInvoices;
    console.log('INVOICES REDUCER HAS BEEN CAALLED action.type', action.type);
  switch (action.type) {
    case INVOICES_UPDATE: {
      console.log('INVOICES REDUCER INVOICES UPDATEEEEEE', action.payload.invoice);
      let invoices = action.payload.invoices
      let invoice = action.payload.invoice
      if(invoices){
        Object.keys(invoices).forEach((k, i) => {
            if (k === Object.keys(invoice)[0]){
            
            newInvoices = Object.assign({}, {...invoices}, {...invoice}  )
            console.log('newInvoices', newInvoices);
           
            }
        });
      }
     return {...state, ...newInvoices}
    }
    case SET_INVOICES: {
      return { ...state, ...invoices }
    }
    default: {
      return state
    }
  }
}