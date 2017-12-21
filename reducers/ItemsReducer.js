import {
  SET_ITEMS
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ITEMS: {
      return {...state, ...action.items }
    }
    default:{
      return state;
    }
  }
}