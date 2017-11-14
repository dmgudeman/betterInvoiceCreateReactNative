import {
  INVOICE_CREATE, INVOICE_EDIT, INVOICE_UPDATE,   CHANGE_INVOICE_HOURS, SELECT_INVOICE
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICE_CREATE:  { // For updating invoice fields
      console.log('invoice REDUCERS INVOICE_CREATE action.invoice', action.invoice);
      return { ...state, invoice: action.invoice}
    }
    case INVOICE_UPDATE:  { // For updating invoice fields
      console.log('invoice REDUCERS  invoice UPDATE [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      return { ...state.invoice, [action.payload.prop]: action.payload.value}
    }
    case INVOICE_EDIT: { // For submitting an edited invoice
      console.log('invoice REDUCERS INVOICE_EDIT action.payload', action.invoice);
      return { ...state, invoice: action.invoice }
    }
    
    
    case SELECT_INVOICE: {
      console.log('invoiceREDUCER SELECT_INVOICE action.invoice', action.invoice);
     
      return Object.assign({}, state.invoice, action.invoice )
    }
    default:{
      return state;
    }
  }
}