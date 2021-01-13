/*
 *
 * SignUpPage actions
 *
 */

import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';

export function signup(data) {
  return {
    type: SIGNUP,
    data,
  };
}
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error,
  };
}
