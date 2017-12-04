import UTILS_UPDATE from '../actions/types';

const INITIAL_STATE ={ buttonDisabled: false }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UTILS_UPDATE:{
      return Object.assign({}, state, {[action.payload.prop]: action.payload.value});
    }
    default:
      return state;
  }
}
