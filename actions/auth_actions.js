import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';


import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GET_USER_ID
} from './types';

// asynchronous action creator
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  let fUserId = await AsyncStorage.getItem('fUserId')
  if (token && fUserId) {
  //   // Dispatch an action FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token, fUserId})
  } else {
    // Start up FB login process
    doFacebookLogin(dispatch);
  }
}

// helper function
const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('156776871536365',{
    permissions: ['public_profile', 'email']}
  );

  if (type === 'success'){
     const response = await fetch( `https://graph.facebook.com/me?access_token=${token}`);
     const fUserId = (await response.json()).id
    //  const email = await fetch( `https://graph.facebook.com/1929587090588927?access_token=${token}&fields=email`);
    //  const credential = firebase.auth.FacebookAuthProvider.credential(token);
     await AsyncStorage.setItem('fb_token', token);
     await AsyncStorage.setItem('fUserId', fUserId)
     dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token, fUserId: fUserId})
  }
  else if (type === 'cancel'){
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }
 
}

export const getUserId = () => async dispatch => {
     await console.log( "Hi ", state.fUserId);
  return dispatch({type: GET_USER_ID, fUserId: state.fUserId})

}