import {
  ITEM_CREATE, ITEM_EDIT, ITEM_UPDATE,   CHANGE_ITEM_HOURS, SELECT_ITEM
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_CREATE:  { // For updating item fields
      console.log('ITEM REDUCERS ITEM_CREATE action.item', action.item);
      return { ...state, item: action.item}
    }
    case ITEM_UPDATE:  { // For updating item fields
      // console.log('ITEM REDUCERS  ITEM UPDATE [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      return { ...state, [action.payload.prop]: action.payload.value}
    }
    case ITEM_EDIT: { // For submitting an edited item
      console.log('ITEM REDUCERS ITEM_EDIT action.payload', action.item);
      return { ...state, item: action.item }
    }
    
    // case CHANGE_ITEM_HOURS: {
    //   console.log(' ITEM REDUCER CHANGE_ITEMS_HOURS action.hours', action.hours);
    //   return  {...state, hours: action.hours} 
    // }

    case SELECT_ITEM: {
      // console.log('ITEMREDUCER SELECT_ITEM action.item', action.item);
      const {amount, companyKey, date, description, fUserId, hours, total, id}= action.item
      const data = {amount, companyKey, date, description, fUserId, hours, total, id} 
      // console.log('state', state);
      return Object.assign({}, state.item, data )
    }
    default:{
      return state;
    }
  }
}