import {
  FETCH_COMPANIES_SUCCESS,
  SET_COMPANIES,
} from '../actions/types';

const INITIAL_STATE ={}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_COMPANIES_SUCCESS:
    return { ...state,  ...action.payload}
  case SET_COMPANIES: {
    console.log('COMPANY REDUCER action', action);
    return Object.assign({}, ...state, ...action.companies)
    // let x = action.companies
    // return { ...state, companies: action.companies}
  }
  default:
    return state
  }
}