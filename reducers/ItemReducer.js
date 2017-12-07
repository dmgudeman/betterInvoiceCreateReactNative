import {
  ITEM_CREATE, 
  ITEM_EDIT, 
  ITEM_UPDATE,
  ITEM_TOTAL_UPDATE,   
  CHANGE_ITEM_HOURS, 
  SELECT_ITEM,
  UTILS_UPDATE
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_CREATE:  { // For updating item fields
      return { ...state, item: action.item}
    }
    case ITEM_UPDATE:  { // For updating item fields
      return { ...state, [action.payload.prop]: action.payload.value}
    }

    case ITEM_TOTAL_UPDATE: {
      return { ...state, total: action.total }
    }
    case ITEM_EDIT: { // For submitting an edited item
      return { ...state, item: action.item }
    }

    case SELECT_ITEM: {
      const {amount, companyKey, date, description, fUserId, hours, total, id}= action.item
      const data = {amount, companyKey, date, description, fUserId, hours, total, id} 
      return Object.assign({}, state.item, data )
    }
    default:{
      return state;
    }
  }
}