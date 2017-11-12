
import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  // GET_USER_ID
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state,  token: action.payload, fUserId: action.fUserId };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token:  null };
    // case GET_USER_ID:
    //   return { ...state, fUserId: auth.fUserId}
    default :
      return state;
  }
}