import {
  FETCH_COMPANIES_SUCCESS,
  COMPANY_UPDATE,
  COMPANY_CREATE,
} from '../actions/types';

const INITIAL_STATE ={}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case FETCH_COMPANIES:
    //   console.log('FETCH_COMPANIESssssssss', action.payload);
    //   return { ...state, companies: action.payload };
    case FETCH_COMPANIES_SUCCESS:
      // console.log('CompaniesReducer FETCH_COMPANIES_SUCCESS action.payload', action.payload);
      return { ...state,  companies: action.payload}
    case COMPANY_UPDATE:{
      console.log('COMPANIESREDUCER COMPANY_UPDATE action', action);
      return Object.assign({}, state, {[action.payload.prop]: action.payload.value});
  }
    case COMPANY_CREATE:{
      console.log('COMPANIESREDUCER COMPANY CREATE', action.payload);
    }
    default:
      return state;
  }
}
