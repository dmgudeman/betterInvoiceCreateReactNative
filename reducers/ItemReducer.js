import {
  ITEM_CREATE , ITEM_UPDATE,  CHANGE_SELECTED_ITEM
} from '../actions/types';

const INITIAL_STATE ={}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value}
    case CHANGE_SELECTED_ITEM:{
      console.log('ITEMREDUCER CHAMGE_SELECTED_ITEM action.payload', action.item);
      console.log('ITEMREDUCER CHAMGE_SELECTED_ITEM { ...state, item: action.item}', { ...state, selectedItem: action.item });
      
      return { ...state, selectedItem: action.item }
    }
    default:
      return state;
  }
}