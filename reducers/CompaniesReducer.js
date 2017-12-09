import {
  FETCH_COMPANIES_SUCCESS,
  COMPANY_UPDATE,
  COMPANY_CREATE,
  COMPANY_EDIT_SUBMIT,
  SET_COMPANY,
} from '../actions/types';

const INITIAL_STATE ={}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_SUCCESS:
      return { ...state,  companies: action.payload}
    case COMPANY_UPDATE:{
      console.log('COMPANIESREDUCER COMPANY_UPDATE [action.payload.prop]: action.payload.value', [action.payload.prop], action.payload.value);
      console.log('COMPANIESREDUCER COMPANY_UPDATE state', state);
      return Object.assign({}, state, {[action.payload.prop]: action.payload.value});
  }
    case COMPANY_CREATE:{
      return { ...state, companies: action.payload }
    }
    case COMPANY_EDIT_SUBMIT: {
    }
    case SET_COMPANY: {
      return { ...state, company: action.company}
    }
    default:
      return state;
  }
}
