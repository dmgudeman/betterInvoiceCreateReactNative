import {
  COMPANY_UPDATE,
  COMPANY_CREATE,
  CLEAR_COMPANY,
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
      return { ...state, ...action.payload };
    }
    case CLEAR_COMPANY:{
      // return { state,  };
      let x ={'item':{}}
  
     return  Object.assign({}, ...state, ...x )
    }
    case COMPANY_EDIT_SUBMIT: {
    }
    case SET_COMPANY: {
      let x = {'invoice': {}}
      return { ...state, ...action.company, ...x };
    }
    case UPDATE_OBJECT_EDIT: {
      // return Object.assign({}, state, {[action.payload.prop]: action.payload.value})
      return {  ...state, [action.payload.prop]: action.payload.value };
    }
    default:
      return state
  }
}
