import {
  ITEM_CREATE, 
  ITEM_EDIT, 
  ITEM_UPDATE,
  ITEM_TOTAL_UPDATE,  
  CLEAR_ITEM, 
  SET_ITEM,
  UTILS_UPDATE,
  SET_ITEMS
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_ITEM: {
      return{ ...state.item, ...{}}
    }
    case ITEM_CREATE:  { // For updating item fields
      return { ...state, item: action.item}
    }
    case ITEM_UPDATE:  { // For updating item fields
      console.log('REDUCERS ITEM_UPDATE FIRED');
      return { ...state, [action.payload.prop]: action.payload.value}
    }

    case ITEM_TOTAL_UPDATE: {
      return { ...state, total: action.total }
    }
    case ITEM_EDIT: { // For submitting an edited item
      return { ...state, item: action.item }
    }
  
    case SET_ITEM:{
      console.log('ITEM REDUCERS SET_ITEM action.item', action.item);
      // const {amount, companyKey, date, description, fUserId, hours, total, id}= action.item
      // const data = {amount, companyKey, date, descripton, fUserId, hours, total, id} 
      // return Object.assign({}, state.item, data )
      return {...state, ...action.item}
    }
  
    default:
      return state;
    
  }
}