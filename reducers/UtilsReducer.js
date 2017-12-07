import {UTILS_UPDATE, SET_INVOICES} from '../actions/types';
const INITIAL_STATE ={  }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UTILS_UPDATE: {
      return { ...state, [action.payload.prop]: action.payload.value}
    }

    default:
      return state;
  }
  

}