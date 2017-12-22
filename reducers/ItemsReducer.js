import {
  ITEMS_UPDATE,
  SET_ITEMS,
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ITEMS: {
      return {...state, ...action.items }
    }
    case  ITEMS_UPDATE: {
      let items = action.payload.items;
      let item = action.payload.item;
      let newItems;
      if(items){
        Object.keys(items).forEach((k, i) => {
            if (k === Object.keys(item)[0]){
            newItems = Object.assign({}, {...items}, {...item}  )
            }
        });
      }
     return {...state, ...newItems}
    }
    default:{
      return state;
    }
  }
}