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
      console.log('ITEM REDUCERS [action.payload.prop]: action.payload.value', action.payload.prop, action.payload.value);
      const prop3 = `${action.payload.prop}`
      console.log('ITEM REDUCERS prop3', prop3);
      // return { ...state, [action.payload.prop2]: action.payload.value}
      return { ...state, [action.payload.prop]: action.payload.value}
    }
    case ITEM_EDIT: { // For submitting an edited item
      // console.log('ITEMREDUCER ITEM_EDIT action.payload', action.item);
      return { ...state, item: action.item }
    }
    // case CHANGE_SELECTED_ITEM:{ // To identify the selected item in a list
    //   // console.log('ITEMREDUCER CHAMGE_SELECTED_ITEM action.payload', action.item);
    //   console.log('ITEMREDUCER CHAMGE_SELECTED_ITEM action.item', action.item);
    //   return { ...state, item: action.item }
    // }
    case CHANGE_ITEM_HOURS: {
      return {...state, [action.payload.item]: action.payload.item}
    }

    case SELECT_ITEM: {
      console.log('ITEMREDUCER SELECT_ITEM action', action.payload);
      return {...state, item: action.item }
    }
    default:{
      return state;
    }
  }
}