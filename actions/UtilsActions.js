import firebase from 'firebase';
import thunk from 'redux-thunk';
import { UTILS_UPDATE } from './types';


export const utilsUpdate = (prop, value)=> {
  return {
    type: UTILS_UPDATE,
    payload: { prop, value}
  };
}