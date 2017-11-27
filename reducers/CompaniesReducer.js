import {
  FETCH_COMPANIES_SUCCESS,
  COMPANY_UPDATE,
  COMPANY_CREATE,
  COMPANY_EDIT_SUBMIT,
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
    case COMPANY_EDIT_SUBMIT: {
      console.log('COMPANIESREDUCER COMPANY_EDIT_SUBMIT fired');
    }
    default:
      return state;
  }
}
