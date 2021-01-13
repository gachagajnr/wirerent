/*
 *
 * RequestDetails actions
 *
 */

import {
  GET_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_ERROR,
} from './constants';

export function getRequest(id) {
  return {
    type: GET_REQUEST,
    id,
  };
}
export function getRequestSuccess(request) {
  return {
    type: GET_REQUEST_SUCCESS,
    request,
  };
}
export function getRequestError(error) {
  return {
    type: GET_REQUEST_ERROR,
    error,
  };
}
