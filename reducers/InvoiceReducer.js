import {
  INVOICE_CREATE_CLEAR,
  INVOICE_CREATE, 
  INVOICE_EDIT, 
  INVOICE_INIT,
  INVOICE_UPDATE, 
  INVOICE_UPDATE_2, 
  INVOICE_UPDATE_DB, 
  INVOICE_UPDATE_DB_CREATE,
  SET_INVOICE,
} from '../actions/types';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICE_INIT: {
      return { ...state, invoice: action.invoice};
    }
    case INVOICE_CREATE_CLEAR: {
      // console.log('INVOICEREDUCERS INVOICE_CREATE_CLEAR action.invoice', action.invoice);
      return { ...state, ...action.invoice};
    }

    case INVOICE_CREATE:  { // For updating invoice fields
      // console.log('INVOICEREDUCERS INVOICE_CREATE action.payload', action.payload);
      return { ...state, invoice: action.item};
    }
    case INVOICE_UPDATE: { // For updating invoice fields
      // console.log('INVOICEREDUCERS  invoice UPDATE [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      return { ...state, [action.payload.prop]: action.payload.value};
    }
    case INVOICE_UPDATE_2: { // For updating invoice fields
      // console.log('2 INVOICE REDUCERS  invoice UPDATE [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      // return { ...state.invoice.invoice, [action.payload.prop]: action.payload.value};
      return Object.assign({},{...state.invoice},{[action.payload.prop]: action.payload.value} )
    }
    case INVOICE_UPDATE_DB: {
      // console.log('INVOICEREDUCERS  INVOICE_UPDATE_DB fired');
      return { ...state, invoice: action.invoice }
    }
    case INVOICE_UPDATE_DB_CREATE: {
      // console.log('INVOICEREDUCERS  INVOICE_UPDATE_DB_CREATE fired');
      return { ...state, invoice: action.invoice }
    }
    case INVOICE_EDIT: { // For submitting an edited invoice
      // console.log('INVOICEREDUCERS INVOICE_EDIT action.payload', action.invoice);
      return { ...state, ...action.invoice }
    }
    case SET_INVOICE: {
      // console.log('INVOICEREDUCERS SET_INVOICE action.invoice', action.invoice);
      return { ...state, ...action.invoice }
    }
    default:{
      return state;
    }
  }
}