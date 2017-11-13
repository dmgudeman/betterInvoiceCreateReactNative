import {
  ITEM_CREATE, ITEM_SUBMIT, ITEM_UPDATE,   CHANGE_ITEM_HOURS, SELECT_ITEM
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_CREATE:  { // For updating item fields
      console.log('ITEM REDUCERS ITEM_CREATE action.item', action.item);
      return { ...state, item: action.item}
    }
    case ITEM_UPDATE:  { // For updating item fields
      console.log('ITEM REDUCERS  ITEM UPDATE [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      return { ...state, [action.payload.prop]: action.payload.value}
    }
    case ITEM_SUBMIT: { // For submitting an edited item
      // console.log('ITEMREDUCER ITEM_SUBMIT action.payload', action.item);
      return { ...state, item: action.item }
    }
    // case CHANGE_SELECTED_ITEM:{ // To identify the selected item in a list
    //   // console.log('ITEMREDUCER CHAMGE_SELECTED_ITEM action.payload', action.item);
    //   console.log('ITEMREDUCER CHAMGE_SELECTED_ITEM action.item', action.item);
    //   return { ...state, item: action.item }
    // }
    case CHANGE_ITEM_HOURS: {
      console.log(' ITEM REDUCER CHANGE_ITEMS_HOURS action.hours', action.hours);
      return  {...state, hours: action.hours} 
    }

    case SELECT_ITEM: {
      console.log('ITEMREDUCER SELECT_ITEM action.item', action.item);
      const {amount, coId, date, description, fUserId, hours, total, id}= action.item
      const data = {amount, coId, date, description, fUserId, hours, total, id} 
      return Object.assign({}, state.item, {amount, coId, date, description, fUserId, hours, total, id} )
    }
    default:{
      return state;
    }
  }
}