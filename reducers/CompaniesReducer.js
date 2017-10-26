import {
  FETCH_COMPANIES ,
  FETCH_COMPANIES_SUCCESS
} from '../actions/types';

const INITIAL_STATE ={ userId: '' }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case FETCH_COMPANIES:
    //   console.log('FETCH_COMPANIESssssssss', action.payload);
    //   return { ...state, companies: action.payload };
    case FETCH_COMPANIES_SUCCESS:
      console.log('CompaniesReducer FETCH_COMPANIES_SUCCESS action.payload', action.payload);
      return { ...state,  companies: action.payload}
    default:
      return state;
  }
}