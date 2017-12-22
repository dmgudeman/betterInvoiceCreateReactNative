import {
  COMPANY_UPDATE,
  COMPANY_CREATE,
  COMPANY_CREATE_CLEAR,
  COMPANY_EDIT_SUBMIT,
  SET_COMPANY,
  UPDATE_OBJECT_EDIT,
} from '../actions/types';

const INITIAL_STATE ={}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPANY_UPDATE:{
      console.log('REDUCERS COMPANY_UPDATE [action.payload.prop]:action.payload.value', {[action.payload.prop]:action.payload.value});
      console.log('REDUCERS COMPANY_UPDATE action', action);
      // return Object.assign({}, state, {[action.payload.prop]: action.payload.value});
      return {...state, [action.payload.prop]:action.payload.value }
    }
    case COMPANY_CREATE:{
      return { ...state, company: action.payload };
    }
    case COMPANY_CREATE_CLEAR:{
      return { ...state, company: action.payload };
    }
    case COMPANY_EDIT_SUBMIT: {
    }
    case SET_COMPANY: {
      return { ...state, ...action.company };
    }
    case UPDATE_OBJECT_EDIT: {
      // return Object.assign({}, state, {[action.payload.prop]: action.payload.value})
      return {  ...state, [action.payload.prop]: action.payload.value };
    }
    default:
      return state
  }
}
