import {
  INVOICES_UPDATE, 
  SET_INVOICES
} from '../actions/types';

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICES_UPDATE: {
      console.log('INVOICES REDUCER INVOICES UPDATEEEEEE');
      if(invoices){
        Object.keys(invoices).forEach((k, i) => {
            if (k === Object.keys(invoice)[0]){
            
            let newInvoices = Object.assign({}, {...invoices}, {...invoice}  )
            console.log('newInvoices', newInvoices);
           
            }
        });
      }
     return {...state, ...invoices}
    }
    case SET_INVOICES: {
      return { ...state, ...invoices }
    }
    default: {
      return state
    }
  }
}