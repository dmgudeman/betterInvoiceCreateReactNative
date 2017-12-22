import {
  ITEMS_UPDATE,
  SET_ITEMS,
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ITEMS: {
      console.log('REDUCER ITEMS_UPDATE ...state', ...state);
      console.log('REDUCER ITEMS_UPDATE ...action.items', action.items);
      return {...state=INITIAL_STATE, ...action.items=INITIAL_STATE }
    }
    case  ITEMS_UPDATE: {
      console.log('REDUCERS ITEMS_UPDATE FIRED');
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