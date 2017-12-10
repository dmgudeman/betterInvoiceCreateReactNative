import {
  FETCH_COMPANIES_SUCCESS,
  COMPANY_UPDATE,
  COMPANY_CREATE,
  COMPANY_EDIT_SUBMIT,
  SET_COMPANY,
  UPDATE_OBJECT_EDIT,
} from '../actions/types';

const INITIAL_STATE ={}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return { ...state,  companies: action.payload}
    case COMPANY_UPDATE:{
      return Object.assign({}, state, {[action.payload.prop]: action.payload.value});
  }
    case COMPANY_CREATE:{
      return { ...state, company: action.payload }
    }
    case COMPANY_EDIT_SUBMIT: {
    }
    case SET_COMPANY: {
      return { ...state, company: action.company}
    }
    case UPDATE_OBJECT_EDIT: {
      // return Object.assign({}, state, {[action.payload.prop]: action.payload.value});
      return {  ...state, [action.payload.prop]: action.payload.value};
    }
    default:
      return state
  }
}
