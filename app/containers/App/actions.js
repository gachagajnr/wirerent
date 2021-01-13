import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './constants';

export function login(user) {
  return {
    type: LOGIN,
    user,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
export function logout() {
  return { type: LOGOUT };
}
