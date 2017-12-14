import {
  INVOICE_CREATE_CLEAR,
  INVOICE_CREATE, 
  INVOICE_EDIT, 
  INVOICE_UPDATE, 
  INVOICE_UPDATE_DB, 
  SELECT_INVOICE,
  SET_INVOICES
} from '../actions/types';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case INVOICE_CREATE_CLEAR: {
      // console.log('INVOICEREDUCERS INVOICE_CREATE_CLEAR action.invoice', action.invoice);
      return Object.assign({},  state, action.invoice)
    }

    case INVOICE_CREATE:  { // For updating invoice fields
      // console.log('INVOICEREDUCERS INVOICE_CREATE action.payload', action.payload);
      return { ...state, invoice: action.item};
    }
    case INVOICE_UPDATE: { // For updating invoice fields
      // console.log('INVOICEREDUCERS  invoice UPDATE [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      return Object.assign({},  state, {[action.payload.prop]: action.payload.value})
    }
    case INVOICE_UPDATE_DB: { // For updating invoice fields
      // console.log('INVOICEREDUCERS  invoice UPDATE [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      return Object.assign({},  state, {[action.payload.prop]: action.payload.value})
    }
   
    case INVOICE_EDIT: { // For submitting an edited invoice
      // console.log('INVOICEREDUCERS INVOICE_EDIT action.payload', action.invoice);
      return { ...state, invoice: action.invoice }
    }
    
    
    case SELECT_INVOICE: {
      // console.log('INVOICEREDUCERS SELECT_INVOICE action.invoice', action.invoice);
      return Object.assign({}, state.invoice, action.invoice )
    }

    case SET_INVOICES: {
      return { ...state, invoices:action.invoices}
    }
    default:{
      return state;
    }
  }
}